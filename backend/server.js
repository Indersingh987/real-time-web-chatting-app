import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import  userRouter  from './routers/user.js'
import  requestRouter  from './routers/request.js'
import  messageRouter  from './routers/message.js'
import  friendRouter  from './routers/friend.js'

//config app
const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(express.json())
app.use(cors())

//connecting db
mongoose.connect('mongodb://localhost:27017/test1', {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
mongoose.set('useFindAndModify', false);

//route
app.get('/',(req,res)=>{
    res.send('API is working... ')
})

app.use('/api/users',userRouter)
app.use('/api/request',requestRouter)
app.use('/api/messages',messageRouter)
app.use('/api/friends',friendRouter)


//app port
app.listen(port,console.log(`app is running at ${port}`));