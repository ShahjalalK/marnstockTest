import React, { useState } from 'react'
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
    <form onSubmit={handelSubmit} className="shadow">     
        <input type="text" placeholder="Name" className="w-full border p-1 mt-5 outline-none" 
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <input type="text" placeholder="Price" className="w-full border p-1 mt-5 outline-none"
        name="price" 
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        />          
          <input className="w-full border p-1 mt-5 outline-none" type="file" accept='image/*' onChange={(e) => setMedia(e.target.files[0])} />
        <img src={media ? URL.createObjectURL(media) : ""} />
        <textarea className="w-full border p-1 mt-5 outline-none"
         name="description"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        id="" cols="30" rows="10"></textarea>
         {alert ? <p className="bg-orange-600 text-lg text-gray-300 p-2 rounded capitalize shadow">{alert}</p> : ""}
        <div className="py-5">
        <button type='submit' name='action' className="flex text-lg items-center gap-1 px-5 py-1 mx-auto bg-gray-800 text-white rounded">          
          Add Product         
        </button>
        </div>
    </form>
    </div>
  )
}
