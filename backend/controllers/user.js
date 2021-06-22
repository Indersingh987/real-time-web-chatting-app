import User from '../models/user.js'
import Request from '../models/request.js'
import Friend from '../models/friend.js';

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
    const search = req.body

    try {
        if(!search.name) return res.status(404).json({message:'can not find user'})
        let users = []
        const allUsers = await User.find()
        allUsers.map(u=>{
            if(u.email !== search.loginUser){
                if(u.name === search.name) users.push(u)
            }
        })
        if(users.length === 0) return res.status(200).json({message:'no result',IsAny:false})
        res.status(200).json({users:users,IsAny:true})
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export {register,login,search }