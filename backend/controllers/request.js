import User from '../models/userModel.js' 
import Request from '../models/requestModel.js' 
import RequestSend from '../models/requestSendModel.js' 
import Friend from '../models/friendModel.js' 

const accept = async (req,res) => {
    const data = req.body

    try {
        if(!data) return res.status(404)
        const loginUser = await User.findOne({email:data.loginUser})
        const requestUser = await User.findOne({email:data.requestUser})
        const friendDoc = await Friend.create({user1:loginUser._id,user2:requestUser._id})


        for(let i=0;i<loginUser.requestList.length;i++){
            if(loginUser.requestList[i] == data.id) {
                await User.findOneAndUpdate({_id:loginUser._id},{$pull:{
                    requestList:loginUser.requestList[i]
                }},{useFindAndModify: false})
                await Request.deleteOne({_id:data.id})
                loginUser.friends.push(friendDoc._id)
                loginUser.save()
                break
            }
        }
        for(let i=0;i<requestUser.requestSendList.length;i++){
            const requestSendDoc =  await RequestSend.findById(requestUser.requestSendList[i])
            if(loginUser.email == requestSendDoc.to.email) {
                await User.findOneAndUpdate({_id:requestUser._id},{$pull:{
                    requestSendList:requestUser.requestSendList[i]
                }},{useFindAndModify: false})
                await RequestSend.deleteOne({_id:requestUser.requestSendList[i]})
                requestUser.friends.push(friendDoc._id)
                requestUser.save()
                break
            }
        }
        res.status(200).send(friendDoc)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const reject = async (req,res) =>{

}

export {accept,reject} 
