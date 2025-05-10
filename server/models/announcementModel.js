import mongoose from 'mongoose'

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: { type: String, default: 'Admin' },
  },
  { timestamps: true }
)

export default mongoose.model('Announcement', announcementSchema)
