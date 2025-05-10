import Employee from '../models/employeeModel.js'

// Create a new employee with optional photo
export const createEmployee = async (req, res) => {
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
}

// Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
    res.json(employees)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees' })
  }
}

// ✅ Get total number of employees
export const getEmployeeCount = async (req, res) => {
  try {
    const count = await Employee.countDocuments()
    res.json({ totalEmployees: count })
  } catch (err) {
    res.status(500).json({ message: 'Error counting employees', error: err.message })
  }
}
