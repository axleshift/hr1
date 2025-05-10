import NewHire from '../models/newhireModel.js'
import Employee from '../models/employeeModel.js'

// 📥 Receive new hire and save in `newhire_temp`
export const receiveNewHire = async (req, res) => {
  try {
    const newHire = new NewHire(req.body)
    await newHire.save()
    res.status(201).json({ message: 'New hire received and stored in temp collection' })
  } catch (err) {
    res.status(500).json({ message: 'Error saving new hire', error: err.message })
  }
}

// 📊 Get all new hires (from `newhire_temp`) for dashboard
export const getNewHires = async (req, res) => {
  try {
    const hires = await NewHire.find()
    res.json(hires)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching new hires' })
  }
}

// 🔁 Transfer to main employee collection and delete from temp
export const transferToEmployee = async (req, res) => {
  const { type } = req.params
  const hireData = req.body

  try {
    const employee = new Employee({
      ...hireData,
      employmentStatus: type || 'Active',
      status: 'Active',
    })
    await employee.save()
    await NewHire.findByIdAndDelete(hireData._id)

    res.status(200).json({ message: `New hire moved to employees under ${type}` })
  } catch (err) {
    res.status(500).json({ message: 'Transfer failed', error: err.message })
  }
}

// ✅ PATCH: Update employment status of a new hire (used by toggle)
export const updateNewHireStatus = async (req, res) => {
  const { id } = req.params
  const { employmentStatus } = req.body

  try {
    const updated = await NewHire.findByIdAndUpdate(
      id,
      { employmentStatus },
      { new: true }
    )
    res.status(200).json({ message: 'Employment status updated', data: updated })
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status', error: err.message })
  }
}

// 🔢 GET: Count of new hires with status 'New Hire'
export const getNewHireCount = async (req, res) => {
  try {
    const count = await NewHire.countDocuments({ employmentStatus: 'New Hire' })
    res.json({ count })
  } catch (err) {
    res.status(500).json({ message: 'Error fetching new hire count', error: err.message })
  }
}
