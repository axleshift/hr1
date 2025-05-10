import express from 'express'
import Announcement from '../models/announcementModel.js'

const router = express.Router()

// POST announcement
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body
    const newAnn = await Announcement.create({ title, description })
    res.status(201).json(newAnn)
  } catch (err) {
    res.status(500).json({ message: 'Error posting announcement' })
  }
})

// GET all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 })
    res.json(announcements)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching announcements' })
  }
})

export default router
