import User from '../models/user.js'
import Request from '../models/request.js'
import Friend from '../models/friend.js';

//working fine
const users = async (req,res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


//working fine
const register = async(req,res) => {
    const data = req.body

    try {
        if(!data) return res.status(404).json({message:'data not found'})
        const existingUser = await User.findOne({ email:data.email })
        if(existingUser) return res.status(400).json({message:'user already exit'})
        const newUser = await User.create(data)
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

//working fine
const login = async (req,res) => {
    const data = req.body

    try {
        if(!data) return res.status(404).json({message:'can not find user'})
        const user = await User.findOne({ email:data.email })
        if(!user) return res.status(200).json({message:'check your email'})
        if(user.password !== data.password) return res.status(200).json({message:'password is incorrect'})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
} 

const search = async (req,res) => {
    const data = req.body

    try {
        if(!data.name) return res.status(404).json({message:'can not find user'})
        let users = []
        let user = {
            userData:{},
            sent:false
        }
        const allUsers = await User.find()
        const loginUser = await User.findById(data.loginUserId)
        for(let i=0 ;i < allUsers.length ;i++){
            if(allUsers[i].email !== loginUser.email){
                if(allUsers[i].name === data.name) {
                    const requestDoc1 = await Request.find({from:loginUser._id,to:allUsers[i]._id})
                    if(requestDoc1.length){
                        user.userData = allUsers[i]
                        user.sent = true
                        users.push(user)
                        console.log(requestDoc1)
                        continue
                    }
                    const requestDoc2 = await Request.find({from:allUsers[i]._id,to:loginUser._id})
                    if(requestDoc2.length){
                        continue
                    }
                    user.userData = allUsers[i]
                    user.sent = false
                    users.push(user)
                }
            }
        }
        if(users.length === 0) return res.status(200).json({message:'no result',isAny:false})
        res.status(200).json({users:users,IsAny:true})
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export {users,register,login,search }
