import baseUrl from "../helper/baseUrl"
import {parseCookies} from 'nookies'
import Cookies from "js-cookie"
import { useRouter } from "next/router"

export default function Cart({error}) {
  const router = useRouter()
  if(error){    
    Cookies.remove('user')
    Cookies.remove('token')
    router.push('/login')
  }
  return (
    <div className="text-red-300 bg-blue">Cart</div>
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
      "Authorization" : token + "123" 
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


