import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CRow,
  CCol,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CAlert,
  CSpinner,
} from '@coreui/react'
import axios from 'axios'

const DocumentManagement = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [documents, setDocuments] = useState([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('document', selectedFile)

    try {
      setUploading(true)
      setError(null)
      setMessage(null)

      const response = await axios.post(
        'https://backend-hr1.axleshift.com/api/documents/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )

      if (response.data.success) {
        setMessage('Document uploaded successfully!')
        fetchDocuments()
      } else {
        setError(response.data.message || 'Upload failed.')
      }
    } catch (err) {
      setError('Server error during upload.')
    } finally {
      setUploading(false)
    }
  }

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('https://backend-hr1.axleshift.com/api/documents', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setDocuments(response.data.documents || [])
    } catch (err) {
      console.error('Failed to fetch documents')
    }
  }

  React.useEffect(() => {
    fetchDocuments()
  }, [])

  return (
    <CContainer className="mt-5">
      <CRow>
        <CCol md={8} className="mx-auto">
          <CCard>
            <CCardHeader>Document Management</CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleUpload}>
                <CFormLabel htmlFor="document">Upload Document</CFormLabel>
                <CFormInput type="file" id="document" onChange={handleFileChange} />
                <CButton type="submit" color="primary" className="mt-3" disabled={uploading}>
                  {uploading ? <CSpinner size="sm" /> : 'Upload'}
                </CButton>
              </CForm>
              {message && (
                <CAlert color="success" className="mt-3">
                  {message}
                </CAlert>
              )}
              {error && (
                <CAlert color="danger" className="mt-3">
                  {error}
                </CAlert>
              )}
              <h5 className="mt-4">Uploaded Documents</h5>
              <CTable bordered>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Filename</CTableHeaderCell>
                    <CTableHeaderCell>Uploaded At</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {documents.map((doc) => (
                    <CTableRow key={doc._id}>
                      <CTableDataCell>{doc.filename}</CTableDataCell>
                      <CTableDataCell>{new Date(doc.createdAt).toLocaleString()}</CTableDataCell>
                      <CTableDataCell>
                        <a
                          href={`https://backend-hr1.axleshift.com/uploads/${doc.filename}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          View
                        </a>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default DocumentManagement
