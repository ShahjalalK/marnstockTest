import MongoDbConnect from "../../confic/mongoDbConnect"
import productModel from '../../model/productModel'

MongoDbConnect()

export default async function handler(req, res) {
    try{
        if (req.method === 'POST') {
            let {name, price, description, mediaUrl} = req.body
            const newProduct = new productModel({
                name,
                price,
                description,
                mediaUrl
            })
                 await newProduct.save()
            return res.status(200).json({message: "Product add"})
          } else {
            await productModel.find().then(products => {
                return  res.status(200).json(products)
              })
          }       
    }
    catch(error){
        console.log(error)
        console.log('server error')
        process.exit(1)
    }
    
  }