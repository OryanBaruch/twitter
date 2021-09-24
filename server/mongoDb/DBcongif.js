const mongoose=require('mongoose')
require("dotenv").config();
const project=process.env.project || 'Tweeter'

const connect_mongoose=async()=>{
    try {
        await mongoose.connect(`mongodb://localhost/${project}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }),
        console.log(`Connected to mongoose- PROJECT ${project}.`)
    } catch (error) {
        console.log(`Error with connect_mongoose , ${error}`)
    }
}

module.exports=connect_mongoose;