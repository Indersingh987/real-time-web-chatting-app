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
    friendsDocIdList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Friend'
    }],
    requestDocIdList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Request'
    }]
})

const User =  mongoose.model('User',userSchema)
export default User