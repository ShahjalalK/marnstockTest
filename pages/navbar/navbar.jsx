import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'

export default function Navbar() {
  const router = useRouter()

  const cookies = parseCookies()

  const user = cookies.user ? JSON.parse(cookies.user) : ""

 
  
  return (
    <header className="bg-[#161616] py-3 sticky w-full h-full">
        <nav className="container flex items-center justify-between">
            <Link href="/" className="text-3xl text-white">MyStore</Link>
            <div className="flex items-center gap-5 text-lg font-medium">
           
            <Link href="/cart" className={router.pathname == '/cart' ? "text-white" : "text-[#ddd]"}>Cart</Link>
               
               {user.role == 'admin' && user.role == 'root' &&  <Link href="/create" className={router.pathname == '/create' ? "text-white" : "text-[#ddd]"}>Create</Link>}  
                {user ? 
                <>
                  <Link href="/account" className={router.pathname == '/account' ? "text-white" : "text-[#ddd]"} >Account</Link>
                 
                  <button className="px-5 py-1 bg-gray-400 shadow rounded up" 
                    onClick={() => {
                      cookie.remove('token')
                      cookie.remove('user')
                      router.push("/login")
                    }}
                  >Logout</button>

                </>
                :
                <>
                  <Link href="/login" className={router.pathname == '/login' ? "text-white" : "text-[#ddd]"} >Login</Link>
                  <Link href="/signup" className={router.pathname == '/signup' ? "text-white" : "text-[#ddd]"}>Signup</Link>
                </> 
                
                }
                
               
            </div>
        </nav>
       
    </header>
  )
}



