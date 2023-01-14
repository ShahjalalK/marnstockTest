import Link from 'next/link'
import React, { useState } from 'react'
import baseUrl from '../helper/baseUrl'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

export default function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
   const router  = useRouter()

   const [alert, setAlert] = useState("")
  const userLogin = async (e)=>{
    e.preventDefault()
    const res =  await fetch(`${baseUrl}/api/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    })

    const res2 = await res.json()
    if(res2.error){
      setAlert(res2.error)
    }else{      
       cookie.set('token',res2.token)
       cookie.set('user', JSON.stringify(res2.user))
       router.push('/account')
    }

  }
  return (
    <div className="max-w-lg mx-auto py-5">
      <h3 className="text-5xl text-center uppercase">Login</h3>
      <form className='shadow mt-5' onSubmit={userLogin}>
        <input className='w-full border outline-none p-1' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='w-full border outline-none p-1 mt-5' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        {alert ? <p className="bg-orange-600 text-lg text-gray-300 p-2 rounded capitalize shadow">{alert}</p> : ""}
        <div className="py-5 flex flex-col mx-auto text-center space-y-5 items-center">
        <button type='submit' className="px-5 text-lg w-full py-1 bg-gray-800 text-white rounded">Login</button>
        <Link href="/signup" className="text-xl text-gray-700 capitalize font-medium">Dont have account</Link>
        </div>
      </form>
      
    </div>
  )
}
