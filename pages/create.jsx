import React, { useState } from 'react'
import {RiSendPlaneFill} from 'react-icons/ri'

export default function Create() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [media, setMedia] = useState("")
  const [description, setDescription] = useState("")

  const handelSubmit = (e) => {
    e.preventDefault()
    console.log(name, price, media, description)
  }

  return (
    <div className="max-w-xl mx-auto py-5">      
    <form onSubmit={handelSubmit}>
        <input type="text" placeholder="Name" className="w-full border-b p-1 mt-3 outline-none" 
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <input type="text" placeholder="Price" className="w-full border-b p-1 mt-3 outline-none"
        name="price" 
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        />
        <div className="w-full mt-3 cursor-pointer">          
          <input type="file" accept='image/*' onChange={(e) => setMedia(e.target.files[0])} />
        </div>
        <img className="w-full" src={media ? URL.createObjectURL(media) : ""} alt="meida" />
        <textarea className="border outline-none w-full mt-5 p-1"
         name="description"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        id="" cols="30" rows="10"></textarea>
        <button type='submit' name='action' className="flex items-center gap-1 px-3 py-1 bg-gray-800 text-white rounded">          
          Send
          <RiSendPlaneFill />
        </button>
    </form>
    </div>
  )
}
