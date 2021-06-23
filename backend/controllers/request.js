import User from '../models/user.js' 
import Request from '../models/request.js' 
import Friend from '../models/friend.js' 

const send = async (req,res) => {
    const data = req.body
    
    try {
        if(!data) return res.status(404).json({message:'could not find resourse'})
        const requestDoc = await Request.create(data)
        const from = await User.findById(data.from)
        const to = await User.findById(data.to)
        from.requestDocIdList.push(requestDoc._id)
        from.save()
        to.requestDocIdList.push(requestDoc._id)
        to.save()
        res.status(201).send(requestDoc)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const cancel = async (req,res) => {
    const data = req.body
    
    try {
        if(!data) return res.status(404).json({message:'could not find resourse'})
        const requestDoc = await Request.findById(data.requestDocId)
        const loginUser = await User.findById(requestDoc.from)
        const reciever = await User.findById(requestDoc.to)

        await User.findOneAndUpdate({email:loginUser.email},{$pull:{requestDocIdList:requestDoc._id}})
        loginUser.save()

        await User.findOneAndUpdate({email:reciever.email},{$pull:{requestDocIdList:requestDoc._id}})
        reciever.save()
        
        await Request.findByIdAndDelete(requestDoc._id)
        res.status(201).send("rejected succesfully")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const accept = async (req,res) => {
    const data = req.body

    try {
        if(!data) return res.status(404).json({message:'could not find resourse'})
        const requestDoc = await Request.findById(data.requestDocId)
        const friendDoc = await Friend.create({user1:requestDoc.from,user2:requestDoc.to})
        const loginUser = await User.findById(requestDoc.to)
        const friend = await User.findById(requestDoc.from)

        loginUser.friendsDocIdList.push(friendDoc._id)
        await User.findOneAndUpdate({email:loginUser.email},{$pull:{requestDocIdList:requestDoc._id}})
        loginUser.save()

        friend.friendsDocIdList.push(friendDoc._id)
        await User.findOneAndUpdate({email:friend.email},{$pull:{requestDocIdList:requestDoc._id}})
        friend.save()

        await Request.findByIdAndDelete(requestDoc._id)
        res.status(201).send(friendDoc)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const reject = async (req,res) =>{
    const data = req.body

    try {
        if(!data) return res.status(404).json({message:'could not find resourse'})
        const requestDoc = await Request.findById(data.requestDocId)
        const loginUser = await User.findById(requestDoc.to)
        const sender = await User.findById(requestDoc.from)

        await User.findOneAndUpdate({email:loginUser.email},{$pull:{requestDocIdList:requestDoc._id}})
        loginUser.save()

        await User.findOneAndUpdate({email:sender.email},{$pull:{requestDocIdList:requestDoc._id}})
        sender.save()
        
        await Request.findByIdAndDelete(requestDoc._id)
        res.status(201).send("rejected succesfully")
       
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


//working fine
const list = async (req,res) =>{
    const data = req.body
    try {
        if(!data) return res.status(404).json({message:'can not find source'})
        let requestSenderUsers = []
        const loginUser = await User.findById(data.loginUserId)
        for(let i=0; i < loginUser.requestDocIdList.length; i++){
            const requestDoc = await Request.findById(loginUser.requestDocIdList[i])
            if(JSON.stringify(loginUser._id)  == JSON.stringify(requestDoc.to) )  {
                requestSenderUsers.push(requestDoc)
            }
        }
        res.status(201).json({list:requestSenderUsers})
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export {accept,reject,send,cancel,list} 
