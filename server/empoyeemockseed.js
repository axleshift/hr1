import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Employee from './models/employeeModel.js'
import fs from 'fs'

dotenv.config()

const seedEmployees = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)

    const employeesData = JSON.parse(fs.readFileSync('serverse/data/mock_employees.json', 'utf-8'))

    await Employee.deleteMany() // Optional: Clears existing records
    await Employee.insertMany(employeesData)

    console.log('Employee Data Seeded Successfully!')
    process.exit()
  } catch (error) {
    console.error('Seeding Failed:', error)
    process.exit(1)
  }
}

seedEmployees()
