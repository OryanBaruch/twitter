const mongoose=require('mongoose')
const project=`Tweeter`

const connect_mongoose=async()=>{
    try {
        await mongoose.connect(`mongodb://localhost/${project}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log(`${project} is on the GO.`)
    } catch (error) {
        console.log(`Im a little disfunctional dont you know...`, error)
    }
}

module.exports=connect_mongoose