import mongoose from 'mongoose'

const friendSchema = new mongoose.Schema({
    user1:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    user2:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    messagesDocIdList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    }]
})

export default mongoose.model('Friend',friendSchema)