import User from '../models/user.js'  
import Friend from '../models/friend.js' 
import Message from '../models/message.js'

const list = async (req,res) => {
    const data = req.body

    try {
        if(!data) return res.status(404).json({message:'can not find source'})
        const loginUser = await User.findById(data.loginUserId)
        const friend = await User.findById(data.friendId)
        const friendDoc = await Friend.findById(data.friendDocId)
        let messageList = []
        for(let k=0; k < friendDoc.messagesDocIdList.length; k++){
            const messageDoc = await Message.findById(friendDoc.messagesDocIdList[k])
            messageList.push(messageDoc)
        }
        return res.status(201).json({list:messageList,friendDocId:friendDoc._id})
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const create = async (req,res) => {
    const data = req.body

    try {
        if(!data) return res.status(404).json({message:'can not find source'})
        const messageDoc = await Message.create({from:data.loginUserId,to:data.friendId,text:data.message,timestamp:data.timestamp})
        const friendDoc = await Friend.findById(data.friendDocId)
        friendDoc.messagesDocIdList.push(messageDoc._id)
        friendDoc.save()
        res.status(201).send(messageDoc)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export{list,create}