import baseUrl from "../helper/baseUrl"
import {parseCookies} from 'nookies'
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import Link from "next/link"
import { useState } from "react"

export default function Cart({error, products}) {
  const [cProducts, setCProducts] = useState(products)
  let price = 0
  const {token} = parseCookies()
  const router = useRouter()
  const removeHandler = async (pid) => {   
    const res = await fetch(`${baseUrl}/api/cart`, {
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : token
      },
      body : JSON.stringify({
        productId: pid 
      })
    })
    const res2 = await res.json()
    setCProducts(res2)
    
  }



  if(error){    
    Cookies.remove('user')
    Cookies.remove('token')
    router.push('/login')
  }

  if(!token){
    return (
      <div className="text-center py-5 h-screen flex items-center justify-center flex-col space-y-4">
          <div className="text-3xl bg-blue">Please Login to view your cart</div>
          <Link href="/login" className="bg-gray-500 text-gray-50 text-lg px-5 py-1 font-medium">Login</Link>
      </div>
           
    )
  }

  
  return(
    <>
    {cProducts.map((item, index) => {
      price = price + item.quantity * item.product.price
       return(
         <div key={index} className="flex items-center gap-2 max-w-5xl mx-auto py-5">
           <img src={item.product.mediaUrl} alt="" className=" w-16 " />
           <div className="flex flex-col space-y-1">
             <h6 className="text-lg">{item.product.name}</h6>
             <h6 className="text-lg">{item.quantity} X ৳{item.product.price}</h6>
             <button className="px-5 py-1 bg-gray-500 text-gray-50 text-sm" onClick={() => removeHandler(item.product._id)}>Remove</button>
           </div>
         </div>
       )
     })}
     <div className="max-w-5xl mx-auto py-5">
        <hr />
      </div>
     <div className="flex items-center justify-between max-w-5xl mx-auto">
        <h5 className="text-xl capitalize"> total = ৳{price}</h5>
        <button className="px-5 py-1 bg-gray-500 text-gray-50 text-sm">Checkout</button>
      </div>
      
    </>
    
  )
}


export async function getServerSideProps(ctx) {
  const {token} = parseCookies(ctx)
  if(!token){
    return {
      props: {products: []}, 
    }
  }
  const res = await fetch(`${baseUrl}/api/cart`, {    
    headers : {
      "Authorization" : token 
    }
  })
  const products = await res.json() 
  if(products.error){
    return {
      props: {error : products.error}, 
    }
  }
  return {
    props: {products}, 
  }
}


