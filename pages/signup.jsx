import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useState } from 'react'
import baseUrl from '../helper/baseUrl'

export default function Signup() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [alert, setAlert] = useState("")

  const userSubmit = async (e) => {
    e.preventDefault()
   const res = await fetch(`${baseUrl}/api/signup`, {
      method : "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        name,
        email,
        password
      })
    })
    const res2 = await res.json()
    if(res2.error){
      setAlert(res2.error)
    }else{
      setAlert(res2.message)
     router.push('/login')
    }
  }
  return (
    <div className="max-w-lg mx-auto py-5">
      <h3 className="text-5xl text-center uppercase">Sign Up</h3>
      <form className="shadow mt-5" onSubmit={userSubmit}>
            <input className='w-full border outline-none p-1' type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input className='w-full border outline-none p-1 mt-5' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='w-full border outline-none p-1 mt-5' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            {alert ? <p className="bg-orange-600 text-lg text-gray-300 p-2 rounded capitalize shadow">{alert}</p> : ""}
            <div className="py-5 flex flex-col mx-auto text-center space-y-5 items-center">
            <button type='submit' className="px-5 text-lg py-1 w-full bg-gray-800 text-white rounded">Signup</button>
            <Link href="/login" className="text-xl text-gray-700 capitalize font-medium">All ready I have a account</Link>
            </div>

      </form>
     
    </div>
  )
}
