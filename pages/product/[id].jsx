import React, { useState } from 'react'
import baseUrl from '../../helper/baseUrl'
import {MdDelete} from 'react-icons/md'
import { useRouter } from 'next/router'
import {parseCookies} from 'nookies'
import {AiOutlinePlusCircle} from 'react-icons/ai'

export default function productId({product}) {
    const [model, setModel] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const router = useRouter()
    const deleteProduct = async (id) => {
        const res = await fetch(`${baseUrl}/api/product/${id}`, {
            method : "DELETE"
        })
        await res.json()
        router.push("/")
    }
    
    const cookie = parseCookies()
    const user = cookie.user ? JSON.parse(cookie.user) : ""

    const addToCart = async (id) => {
      const res = await fetch(`${baseUrl}/api/cart`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : cookie.token
        },
        body : JSON.stringify({
          quantity,
          productId : id
        })
      })
      const res2 = await res.json()
      console.log(res2)
    }

  return (
    <div>
        {product ?
         <>
         {product.map((item, index) => {
            return(
                <>
                    <div className="max-w-3xl mx-auto py-5">
                <div className="max-w-lg mx-auto">
                    <h1 className="text-3xl mb-3">-{item.name}</h1>
                    <img src={item.mediaUrl} alt="media" className="w-[60%]" />
                    <input type="number" min="1" placeholder='Quantity' className="border rounded p-1 w-sm mx-auto my-3 outline-none" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                    {user ? 
                      <button><AiOutlinePlusCircle className="text-xl text-gray-500" onClick={() => addToCart(item._id)}  /></button>
                    :
                    <button onClick={() => {
                      router.push("/login")
                    }}>Login</button>
                  }
                    
                </div>
                
                <p className="mt-5">{item.description}</p>

                {user.role == 'admin' && user.role == 'root' 
               &&  <button onClick={() => setModel(!model)} className="flex items-center gap-2 mx-auto my-5 bg-red-500 px-3 py-1 text-lg text-white rounded uppercase"><MdDelete className="text-xl " /> Delete</button> }

             </div>

             <div className={model ? "model active" : "model"} >
                <div className="bg-white p-10 rounded-md flex flex-col text-center space-y-4">
                <h1 className="text-5xl text-black">{item.name}</h1>
                <h2 className="text-lg capitalize">Are you sure you wont to delete product</h2>
                
                <div className="flex items-center gap-1">

                
               <button onClick={() => deleteProduct(item._id)} className="flex items-center gap-2 mx-auto my-5 bg-red-500 px-3 py-1 text-lg text-white rounded uppercase"><MdDelete className="text-xl " /> Delete</button>

                <button onClick={() => setModel(!model)} className="flex items-center gap-2 mx-auto my-5 border text-gray-600 px-3 py-1 text-lg rounded uppercase">Close</button>
                </div>
                </div>
             </div>
                
                </>
            )
         })}
        
         </>
          : 
         <>
         <div className="flex items-center justify-center h-screen">
         <h1 className="text-red-600 text-3xl">Looding....</h1>
         </div>
         </>}
        </div>
  )
}


// export async function getServerSideProps({params:{id}}) {
//     const res = await fetch(`${baseUrl}/api/product/${id}`)
//     const data = await res.json()
//     return {
//       props: {
//         product : data
//       },
//     }
//   }


export async function getStaticProps({params:{id}}) {
    const res = await fetch(`${baseUrl}/api/product/${id}`)
    const data = await res.json()
    return {
      props: {
        product : data
      },
    }
  }

  export async function getStaticPaths() {
    return {
      paths: [{ params: { id: '63afc580e48bca2dcc413ed2' } }],
      fallback: true, // can also be true or 'blocking'
    }
  }