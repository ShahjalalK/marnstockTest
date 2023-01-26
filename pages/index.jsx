import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import baseUrl from '../helper/baseUrl'

export default function Home({products}) {
  
  return (
    <div className="container grid grid-cols-4 gap-5 py-5">      
      {products ? <>
        {products.map((item, index) => {
          return(
            <div key={index} className="border shadow-lg">
              <div className="relative">
                <img src={item.mediaUrl} alt="media" className="object-contain"  />
                <h1 className="absolute bottom-5 left-[50%] -translate-x-16 shadow-md text-lime-50 text-3xl">{item.name}</h1>
              </div>
              <div className="p-5 uppercase text-xl border-b font-bold">
             <span className="text-3xl"> ৳</span>{item.price}
              </div>
              <div className="p-5">
                <Link href="/product/[id]" as={`/product/${item._id}`} className="text-red-500 text-xl">Product All Details</Link>
              </div>
            </div>
          )
        })}
      
      </> : <>
      <h1>Product Not Found</h1>
      </>}
      
      </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`${baseUrl}/api/store`)
  const data = await res.json()
  return {
    props: {
      products: data
    }, // will be passed to the page component as props
  }
}