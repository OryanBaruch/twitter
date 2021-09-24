const express=require('express')
const cors=require('cors')
const port=process.env.port || 5000
const connect_mongoose=require('./mongoDb/DBcongif')
const {initUsers }=require('./Models/user.model')


const initDB=async()=>{
    await initUsers()
}
// initDB()
connect_mongoose()
const app=express()
app.use(express.json())
app.use(cors())

app.use('/auth', require('./Routes/auth.routes'))
app.use('/tweet', require('./Routes/tweets.routes'))
app.use('/comment', require('./Routes/comments.routes'))

app.listen(port, console.log(`Go on ${port}, Enjoy.`))