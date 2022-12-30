import productModel from '../../../model/productModel'

import mongoDbConnect from '../../../confic/mongoDbConnect'

mongoDbConnect()

export default async (req, res) => {    
    try{
        switch (req.method) {
            case "GET":
                await getProduct(req, res)                
                break;
                
                case "DELETE":
                    await deleteProduct(req, res)
                    break;            
        }
       
        
    }
    catch(error){
        console.log(error)
        console.log("switch not found error")
        process.exit(1)
    }
    
}


const getProduct = async (req, res) =>{
    try{
        const {pid} = req.query
    await productModel.find({_id : pid}).then((product) => {
        res.status(200).json(product)
    })
    }
    catch(error){
        console.log(error)       
        console.log("Product Find Error")
        process.exit(1)
    }
    
}

const deleteProduct = async (req, res) => {
    try{
        const {pid} = req.query
    await productModel.findByIdAndDelete({_id : pid})
        res.status(200).json({})
    }
    catch(error){
        console.log(error)       
        console.log("Product Delete Error")
        process.exit(1)
    }
}


