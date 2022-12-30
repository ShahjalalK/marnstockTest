import productModel from '../../../model/productModel'

import mongoDbConnect from '../../../confic/mongoDbConnect'

mongoDbConnect()

export default async (req, res) => {    
    try{
        const {pid} = req.query
        await productModel.find({_id : pid}).then((product) => {
            res.status(200).json(product)
        })
        
    }
    catch(error){
        console.log(error)
        console.log("data not found error")
        process.exit(1)
    }
    
}


