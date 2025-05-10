import Attendance from '../models/attendanceModel.js'

// ✅ Fetch attendance for a specific employee
export const getEmployeeAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params
    console.log('Looking for attendance of:', employeeId)

    const records = await Attendance.find({ employeeId })
    res.json(records)
  } catch (error) {
    console.error('Error fetching attendance:', error)
    res.status(500).json({ message: 'Server error fetching attendance' })
  }
}

// ✅ Fetch all attendance records (for HR analytics)
export const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({})
    res.json(records)
  } catch (error) {
    console.error('Error fetching all attendance:', error)
    res.status(500).json({ message: 'Server error fetching all attendance' })
  }
}

// ✅ Fetch today's attendance (for dashboard present widget)
export const getTodayAttendance = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]
    const records = await Attendance.find({ date: today })
    res.json(records)
  } catch (error) {
    console.error("Error fetching today's attendance:", error)
    res.status(500).json({ message: "Server error fetching today's attendance" })
  }
}
