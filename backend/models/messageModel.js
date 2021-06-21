import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    text:{
        type:String
    },
    timestamp:String
})

const Message = mongoose.model('Message',messageSchema)
export default Message