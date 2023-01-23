import mongoDbConnect from "../../helper/mongoDbConnect"; 
import userModel from "../../model/userModel";
import cartModel from "../../model/cartModel";
import bcrypt from 'bcrypt'

mongoDbConnect()

export default async (req, res) => {    
    try{
        const {name, email, password} = req.body
        if(!name || !email || !password){
          return  res.status(422).json({error : "please as all the fields"})
        }
        const user = await userModel.findOne({email})
        if(user){
            return  res.status(422).json({error : "User already exists with the email"})
        }
        const hashPassword = await bcrypt.hash(password, 12)

        const newUser = new userModel({
            name,
            email,
            password : hashPassword
        })
                
        await newUser.save()
        await new cartModel({user : newUser._id}).save()
    

       res.status(201).json({message: "signup access"})

    }
    catch(error){
        console.log(error)
        console.log('signup error')
        process.exit(1)
    }
}