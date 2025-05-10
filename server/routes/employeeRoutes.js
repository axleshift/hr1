import express from 'express'
import { createEmployee, getAllEmployees, getEmployeeCount } from '../controller/employeeController.js'
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

// ✅ POST: Create new employee
router.post('/', upload.single('photo'), createEmployee)

// ✅ GET: List all employees
router.get('/', getAllEmployees)

// ✅ NEW: Get total employee count
router.get('/count', getEmployeeCount)

export default router
