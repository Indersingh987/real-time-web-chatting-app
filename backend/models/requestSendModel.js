import mongoose from 'mongoose'

const requestSendSchema = new mongoose.Schema({
    to: {
        name:String,
        email:String
    },
    from:{
        name:String,
        email:String
    }
})

export default mongoose.model('RequestSend',requestSendSchema)