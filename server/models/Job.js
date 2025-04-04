import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  responsibilities: { type: String, required: true },
  requirements: { type: String, required: true },
  qualifications: { type: String, required: true },
  benefits: { type: String, required: true },
  category: {
    type: String,
    enum: ['internship', 'full-time', 'part-time', 'contract', 'temporary', 'freelance'],
    required: true
  },
  capacity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
})

// ✅ This line fixes the error!
const Job = mongoose.model('Job', JobSchema)
export default Job
