import express from 'express'
import Employee from '../models/employeeModel.js'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = express.Router()

// Setup multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads'
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage })

// POST: Create new employee
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const data = req.body
    const newEmployee = new Employee({
      ...data,
      photo: req.file ? `/uploads/${req.file.filename}` : null,
    })
    await newEmployee.save()
    res.status(201).json({ message: 'Employee created', data: newEmployee })
  } catch (err) {
    res.status(500).json({ message: 'Error creating employee', error: err.message })
  }
})

// GET: List all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find()
    res.json(employees)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees' })
  }
})

export default router
