import express from 'express'
import { getUsers,register,login,search,request,getRequestUserById,getFriendById } from '../controllers/user.js' 

const router = express.Router()

router.get('/',getUsers)
router.post('/register',register)
router.post('/login',login)
router.post('/search',search)
router.post('/request',request)
router.post('/findById',getRequestUserById)
router.post('/findFriendById',getFriendById)


export default router