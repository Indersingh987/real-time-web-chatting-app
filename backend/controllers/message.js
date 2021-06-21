import User from '../models/userModel.js'  
import Friend from '../models/friendModel.js' 
import Message from '../models/messageModel.js'

const newMessage = async (req,res) =>{
    const messageData = req.body

    try {
        if(!messageData) return res.status(404).send('Source does not exit!')
        const friend = await User.findById(messageData.to)
        for(let i=0;i<friend.friends.length;i++){
            const firendDoc = await Friend.findById(friend.friends[i])
            if(firendDoc.user1 || firendDoc.user2 == messageData.from){
                const message = await Message.create(messageData)
                firendDoc.messages.push(message._id)
                firendDoc.save()
                return res.status(200).send(message)
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getAllMessages = async (req,res)=>{

    try {
        const messages = await Message.find({})
        return res.status(200).send(messages)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

export{newMessage, getAllMessages}