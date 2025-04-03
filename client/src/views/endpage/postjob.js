import React from 'react'
import {
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
} from '@coreui/react'

const jobposting = () => {
  return (
    <>
      <CFormLabel htmlFor="basic-url">Job TItle </CFormLabel>
      <CFormSelect size="sm" className="mb-3" aria-label="Small select example">
        <option></option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </CFormSelect>
      <CInputGroup className="mb-3">
        <CInputGroupText id="basic-addon1">Job responsibilities.</CInputGroupText>
        <CFormInput placeholder="" aria-label="responsibilities" aria-describedby="basic-addon1" />
      </CInputGroup>

      <CFormLabel htmlFor="basic-url">Job requirement & qualification </CFormLabel>
      <CInputGroup className="mb-3">
        <CInputGroupText id="basic-addon3">https://example.com/users/</CInputGroupText>
        <CFormInput id="basic-url" aria-describedby="basic-addon3" />
      </CInputGroup>

      <CInputGroup className="mb-3">
        <CInputGroupText>$</CInputGroupText>
        <CFormInput aria-label="Amount (to the nearest dollar)" />
        <CInputGroupText>.00</CInputGroupText>
      </CInputGroup>

      <CInputGroup className="mb-3">
        <CFormInput placeholder="Username" aria-label="Username" />
        <CInputGroupText>@</CInputGroupText>
        <CFormInput placeholder="Server" aria-label="Server" />
      </CInputGroup>

      <CInputGroup>
        <CInputGroupText>With textarea</CInputGroupText>
        <CFormTextarea aria-label="With textarea"></CFormTextarea>
      </CInputGroup>
    </>
  )
}
export default jobposting
