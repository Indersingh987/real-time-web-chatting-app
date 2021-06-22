import express from 'express'
import { list,create } from '../controllers/message.js' 

const router = express.Router()

router.post('/list',list)
router.post('/create',create)

export default router