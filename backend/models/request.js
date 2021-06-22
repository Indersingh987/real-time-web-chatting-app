import mongoose from 'mongoose'

const requestSchema = new mongoose.Schema({
    from:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    },
    to:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }
})

export default mongoose.model('Request',requestSchema)