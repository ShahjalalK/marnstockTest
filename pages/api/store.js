import mongoDbConnect from "../../helper/mongoDbConnect"
import productModel from "../../model/productModel"


mongoDbConnect()


export default async function handler(req, res) {
    try{
        if(req.method === "POST"){
            const newProduct = new productModel({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                mediaUrl: req.body.mediaUrl
            })
            await newProduct.save()
            res.status(200).json({message: "Product Save"})
        }else{
          const product =  await productModel.find().sort({"name": 1})
            res.status(200).json(product)
        }   
       
    }
    catch(error){
        console.log(error)
        console.log("product Post error")
        process.exit(1)
    }
    
  }