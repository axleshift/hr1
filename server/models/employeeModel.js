import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  department: String,
  role: String,
  email: String,
  phone: String,
  address: String,
  dateHired: String,
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  photo: String // store image filename or full URL
})

const Employee = mongoose.model('Employee', EmployeeSchema)
export default Employee
