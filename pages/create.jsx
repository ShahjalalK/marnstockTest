import React, { useState } from 'react'
import {RiSendPlaneFill} from 'react-icons/ri'
import baseUrl from '../helper/baseUrl'

export default function Create() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [media, setMedia] = useState("")
  const [description, setDescription] = useState("")

  const [alert, setAlert] = useState("")

  const handelSubmit = async (e) => {
    e.preventDefault()
   const mediaUrl = await imageUpload()
   const res = await fetch(`${baseUrl}/api/store`, {
      method : "POST",
      headers : {
        "Content-Type":"application/json"
      },
      body : JSON.stringify({
        name,
        price,
        mediaUrl,
        description
      })
    })
  const res2 = await res.json()

  if(res2.error){
    setAlert(res2.error)
  }else{
    setAlert("Product Save")
  }
    
  }

  const imageUpload = async () => {
    const data = new FormData()
    data.append('file', media);
    data.append('upload_preset', 'mystore')
    data.append('cloud_name', 'dfgnwxo3b')
   const res = await fetch('https://api.cloudinary.com/v1_1/dfgnwxo3b/image/upload', {
      method : "POST",
      body : data
    })
    const res2 = await res.json()
    return res2.url

  }

  return (
    <div className="max-w-xl mx-auto py-5">      
    <form onSubmit={handelSubmit}>
     {alert ? <p className="bg-orange-600 text-lg text-gray-300 p-2 rounded capitalize shadow">{alert}</p> : ""} 
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
        <img className="w-full mt-3" src={media ? URL.createObjectURL(media) : ""} alt="meida" />
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
