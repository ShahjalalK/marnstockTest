import mongoDbConnect from "../../helper/mongoDbConnect"
import productModel from "../../model/productModel"


mongoDbConnect()


export default async function handler(req, res) {
    try{

        switch (req.method) {
            case "GET":
                await getAllProduct(req, res)
                break;
            case "POST":
                await postAllProduct(req, res)
                break;
        }
               
    }
    catch(error){
        console.log(error)
        console.log("product error")
        process.exit(1)
    }
    
  }


  const getAllProduct = async (req, res) =>{
    try{
        const product =  await productModel.find().sort({"price":1})
        res.status(200).json(product)
    }
    catch(error){
        console.log(error)
        console.log("product All Get Error")
        process.exit(1)
    }
  }

  const postAllProduct = async (req, res) => {
    try{
        const {name, price, description, mediaUrl} = req.body
        if(!name || !price || !description || !mediaUrl){
           return res.status(422).json({error: "Please all the fields"})
        }
        const newProduct = new productModel({
            name,
            price,
            description,
            mediaUrl
        })
        await newProduct.save()
        res.status(200).json(newProduct)
    }
    catch(error){
        console.log(error)
        console.log("Product Post Error")
        process.exit(1)
    }
  }