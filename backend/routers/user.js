import express from 'express'
import {register,login,search } from '../controllers/user.js' 

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/search',search)

export default router