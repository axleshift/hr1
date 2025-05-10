import mongoose from 'mongoose'

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: String, required: true }, // make sure it's STRING!
  date: { type: Date, required: true },
  checkIn: { type: String },
  checkOut: { type: String },
  hoursWorked: { type: Number },
})

const Attendance = mongoose.model('Attendance', attendanceSchema)

export default Attendance
