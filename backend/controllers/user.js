import User from '../models/userModel.js'
import RequestSend from '../models/requestSendModel.js'
import Request from '../models/requestModel.js'
import Friend from '../models/friendModel.js';

const getUsers = async(req,res) =>{
    try {
        const users = await User.find({});
        return res.status(200).send(users)

    } catch (error) {
        return res.status(500).send(error)
    }
    
}

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
        if(!user) return res.status(200).json({message:'check your email',IsLogin:false})
        if(user.password !== data.password) return res.status(200).json({message:'password is incorrect',IsLogin:false})
        res.status(200).json({userData:user,IsLogin:true})
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

const request = async (req,res) => {
    const request = req.body

    try {
        if(!request.to.email) return res.status(404).json({message:'no request found'})
        const requestSendData = await RequestSend.create(request)
        const loginUser = await User.findOne({email:request.from.email})
        const requestUser = await User.findOne({email:request.to.email})
        loginUser.requestSendList.push(requestSendData._id)
        loginUser.save()
        const requestData = await Request.create(request.from)
        requestUser.requestList.push(requestData._id)
        requestUser.save()
        res.status(200).send(requestUser)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

const getRequestUserById = async (req,res) => {
    const userIds = req.body
    const users = []

    try {
        if(!userIds.ids.length) return res.status(404).json({message:'source not found'})
        for(let i=0; i<userIds.ids.length; i++){
            const user = await Request.findById(userIds.ids[i])
            users.push(user)
        };
        res.status(200).send(users)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getFriendById = async (req,res) =>{
    const friendData = req.body
    // console.log(friendData)
    
    try {
        if(!friendData) return res.status(404)
        if(!friendData.friendDoc) return res.status(200).json({message:'no friend found'})

        const friendDoc = await Friend.findById(friendData.friendDoc)

        if(friendDoc.user1 == friendData.loginUser) {
            const friend = await User.findById(friendDoc.user2)
            return res.status(200).send(friend)
        }

        const friend = await User.findById(friendDoc.user1)
        return res.status(200).send(friend)
        
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

export { getUsers, register,login,search,request,getRequestUserById,getFriendById }