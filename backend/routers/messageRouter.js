import express from 'express'
import { newMessage,getAllMessages } from '../controllers/message.js' 

const router = express.Router()

router.get('/',getAllMessages)
router.post('/new',newMessage)


export default router