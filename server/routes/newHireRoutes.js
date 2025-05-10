import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import {
  getNewHires,
  receiveNewHire,
  transferToEmployee,
  updateNewHireStatus,
  getNewHireCount, // ✅ Count controller
} from '../controller/newHireController.js'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads'
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage })

router.get('/', getNewHires)
router.get('/count', getNewHireCount) // ✅ Count endpoint
router.post('/receive', upload.single('photo'), receiveNewHire)
router.post('/receive/data', receiveNewHire)
router.post('/send/:type', transferToEmployee)
router.patch('/status/:id', updateNewHireStatus)

export default router
