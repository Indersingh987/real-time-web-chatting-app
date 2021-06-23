import express from 'express'
import {users,register,login,search } from '../controllers/user.js' 

const router = express.Router()

//for debuging
router.get('/',users)

router.post('/register',register)
router.post('/login',login)
router.post('/search',search)

export default router