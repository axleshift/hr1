import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  employeeId: String,
  firstName: String,
  lastName: String,
  middleName: String,
  position: String,
  department: String,
  employmentStatus: String,
  dateHired: String,
  email: String,
  phoneNumber: String,
  address: String,
  birthdate: String,
  gender: String,
  civilStatus: String,
  governmentIds: {
    sss: String,
    philhealth: String,
    pagibig: String,
    tin: String,
  },
  emergencyContact: {
    name: String,
    phone: String,
  },
  profilePhoto: String,
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
