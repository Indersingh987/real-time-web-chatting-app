import express from 'express'
import { accept,reject,send,cancel,list } from '../controllers/request.js' 

const router = express.Router()

router.post('/accept',accept)
router.post('/reject',reject)
router.post('/send',send)
router.post('/send',cancel)
router.post('/list',list)


export default router