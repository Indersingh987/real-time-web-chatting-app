import User from '../models/user.js'
import Request from '../models/request.js'
import Friend from '../models/friend.js'


const list = async (req,res) => {
    const data = req.body

    try {
        if(!data) return res.status(404).json({message:'can not find source'})
        const loginUser = await User.findById(data.loginUserId)
        let friendList = []
        for(let i=0; i < loginUser.friendsDocIdList.length ; i++){
            const friendDoc = await Friend.findById(loginUser.friendsDocIdList[i])
            if(friendDoc.user1 == loginUser._id) {
                const friend = await User.findById(friendDoc.user2)
                friendList.push(friend)
            }else{
                const friend = await User.findById(friendDoc.user1)
                friendList.push(friend)
            }
        }
        res.status(201).json({list:friendList})
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export {list}