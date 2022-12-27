import React from 'react'

export default function BookItem({name, id, description, imgUrl,}) {
  return (
    <div key={id} className="border overflow-hidden">
        <img src={imgUrl} alt="name" className="w-full h-auto" />
       <div className="p-1">
       <h1 className="text-red-400">{name}</h1>
        <p>{description}</p>
       </div>
  </div>
  )
}
