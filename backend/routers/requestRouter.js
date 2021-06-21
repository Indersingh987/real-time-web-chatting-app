import express from 'express'
import { accept,reject } from '../controllers/request.js' 

const router = express.Router()

router.post('/accept',accept)
router.post('/reject',reject)


export default router