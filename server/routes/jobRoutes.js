// routes/jobRoutes.js
import express from 'express'
import Job from '../models/Job.js'
import verifyApiKey from '../middleware/verifyApiKey.js'

const router = express.Router()

router.post('/jobposting', verifyApiKey, async (req, res) => {
  try {
    const {
      title,
      responsibilities,
      requirements,
      qualifications,
      benefits,
      category,
      capacity
    } = req.body

    if (!title || !responsibilities || !requirements || !qualifications || !benefits || !category) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const newJob = new Job({
      title,
      responsibilities,
      requirements,
      qualifications,
      benefits,
      category,
      capacity
    })

    const savedJob = await newJob.save()

    res.status(201).json({
      message: 'New job created',
      data: savedJob
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// ✅ THIS LINE is what fixes your error
export default router
