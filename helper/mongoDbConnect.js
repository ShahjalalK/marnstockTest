import mongoose from "mongoose"

const mongoDbConnect = async () => {
    try{
       await mongoose.connect(process.env.MONGO_URL)
        console.log("MonoDb is connect")

    }
    catch(error){
        console.log(error)
        console.log("MonoDb is not connect")
        process.exit(1)
    }
}

export default mongoDbConnect