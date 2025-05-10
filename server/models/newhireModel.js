import mongoose from 'mongoose'

const newHireSchema = new mongoose.Schema({
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
})

export default mongoose.model('NewHire', newHireSchema, 'newhire_temp')
//                           ^                 ^
//       modelName        schema         actual collection name
