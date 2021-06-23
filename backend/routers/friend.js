import express from 'express'
import { list } from '../controllers/friend.js' 

const router = express.Router()

router.post('/list',list)

export default router