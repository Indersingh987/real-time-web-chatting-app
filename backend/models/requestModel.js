import mongoose from 'mongoose'

const requestSchema = new mongoose.Schema({
    
        name:String,
        email:String
    
})

export default mongoose.model('Request',requestSchema)