import jwt from 'jsonwebtoken'
import cartModel from '../../model/cartModel'



export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await fetchUserCart(req, res)
            break;
        case "PUT":
        await addUserCart(req, res)
        break;
        case "DELETE":
            await removeProduct(req, res)
            break;
    }
}

function Authenticated(iComponents) {
    return (req, res) => {
        const {authorization} = req.headers
        if(!authorization){
            res.status(201).json({error: 'You must login'})
        }
        try{
            const {userId} = jwt.verify(authorization, process.env.JWT_SECRET)  
            req.userId = userId
            return iComponents(req, res)        
        }
        catch(error){
            res.status(201).json({error: 'You must login'})
        }
    }
}

const fetchUserCart = Authenticated (async (req, res) => {    
    const cart = await cartModel.findOne({user : req.userId}).populate("products.product")
    res.status(200).json(cart.products)
    
})

const addUserCart = Authenticated (async (req, res) => {
    const {quantity, productId} = req.body
   const cart = await cartModel.findOne({ user: req.userId })
  const pExisits = cart.products.some(pdoc => productId === pdoc.product.toString() )
  if(pExisits){
    await cartModel.findOneAndUpdate({_id: cart._id, "products.product" : productId}, {
        $inc : {
            "products.$.quantity" : quantity
        }
    })
  }else{
    const newProducts = {quantity, product: productId}
    await cartModel.findOneAndUpdate({_id: cart._id}, {
        $push : {
            products : newProducts
        }
    })
  }
  res.status(200).json({message: 'Product add to cart'})
})


const removeProduct = Authenticated (async (req, res) => {    
    const {productId} = req.body
   const cart = await cartModel.findOneAndUpdate({user: req.userId}, {
        $pull : { products : { product : productId}}},
        {new : true})
        .populate("products.product")
    res.status(200).json(cart.products)
})