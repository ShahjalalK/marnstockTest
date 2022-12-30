import Link from 'next/link'
import React from 'react'

export default function Home({products}) {
  console.log(products)
  return (
    <div className="grid grid-cols-5 gap-3 mx-auto max-w-7xl py-5">     
      {products.map((item, index) => {
        return(
          <div className="border rounded overflow-hidden shadow">
            <div className="relative">
              <img src={item.mediaUrl} alt="media" className="w-full h-full" />
              <h1 className="absolute bottom-5 left-[50%] -translate-x-9 text-lg text-white">{item.name}</h1>
            </div>
            <div className="text-lg p-5 border-b">
              TK.{item.price}
            </div>
            <div className="text-lg p-5 text-orange-500">
              <Link href="/">Product All Details</Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}


export async function getStaticProps(context) {
  const rs = await fetch("http://localhost:3000/api/store")
  const data = await rs.json()
  return {
    props: {
      products: data
    }, // will be passed to the page component as props
  }
}