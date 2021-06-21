import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import  userRouter  from './routers/userRouter.js'
import  requestRouter  from './routers/requestRouter.js'
import  messageRouter  from './routers/messageRouter.js'

//config app
const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(express.json())
app.use(cors())

//connecting db
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});

//route
app.get('/',(req,res)=>{
    res.send('API is working... ')
})

app.use('/api/users',userRouter)
app.use('/api/request',requestRouter)
app.use('/api/messages',messageRouter)

//app port
app.listen(port,console.log(`app is running at ${port}`));