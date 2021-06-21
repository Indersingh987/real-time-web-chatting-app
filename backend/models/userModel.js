import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    rooms:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }],
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Friend'
    }],
    requestList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Request'
    }],
    requestSendList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'RequestSend'
    }]
})

const User =  mongoose.model('User',userSchema)
export default User