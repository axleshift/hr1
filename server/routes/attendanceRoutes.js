import express from 'express'
import {
  getEmployeeAttendance,
  getAllAttendance,
  getTodayAttendance,
} from '../controller/attendanceController.js'

const router = express.Router()

// ✅ Get all attendance records (for HR Analytics or admin views)
router.get('/all', getAllAttendance)

// ✅ Get today's attendance only (for showing who is present today)
router.get('/today', getTodayAttendance)

// ✅ Get specific employee's attendance history
router.get('/:employeeId', getEmployeeAttendance)

export default router
