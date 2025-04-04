// seedEmployees.js
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Employee from './models/Employee.js'

dotenv.config()

const mockEmployees = [
  {
    id: 'EMP001',
    name: 'John Doe',
    department: 'Logistics',
    role: 'Dispatcher',
    email: 'john.doe@company.com',
    phone: '09171234567',
    address: '123 Cargo St, Pasig City',
    dateHired: '2021-03-15',
    status: 'Active',
    photo: '/uploads/sample1.jpg',
  },
  {
    id: 'EMP002',
    name: 'Jane Smith',
    department: 'IT',
    role: 'Full Stack Developer',
    email: 'jane.smith@company.com',
    phone: '09998887777',
    address: '456 Dev Lane, Makati City',
    dateHired: '2022-06-01',
    status: 'Active',
    photo: '/uploads/sample2.jpg',
  },
  {
    id: 'EMP003',
    name: 'Carlos Reyes',
    department: 'HR',
    role: 'Recruiter',
    email: 'carlos.reyes@company.com',
    phone: '09181234567',
    address: '789 People St, Quezon City',
    dateHired: '2020-01-10',
    status: 'Inactive',
    photo: '/uploads/sample3.jpg',
  },
  {
    id: 'EMP004',
    name: 'Emily Tan',
    department: 'IT',
    role: 'System Administrator',
    email: 'emily.tan@company.com',
    phone: '09173456789',
    address: '102 Infra Rd, Taguig',
    dateHired: '2021-11-20',
    status: 'Active',
    photo: '/uploads/sample4.jpg',
  },
  {
    id: 'EMP005',
    name: 'Mike Dela Cruz',
    department: 'Logistics',
    role: 'Warehouse Supervisor',
    email: 'mike.dc@company.com',
    phone: '09203456789',
    address: '25 Bodega Blvd, Caloocan',
    dateHired: '2019-08-12',
    status: 'Inactive',
    photo: '/uploads/sample5.jpg',
  },
]

const seedEmployees = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB connected')

    await Employee.deleteMany()
    console.log('🧹 Old employees cleared')

    await Employee.insertMany(mockEmployees)
    console.log('🌱 Mock employees inserted')

    process.exit()
  } catch (err) {
    console.error('❌ Error seeding employees:', err)
    process.exit(1)
  }
}

seedEmployees()
