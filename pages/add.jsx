import React, { useState } from 'react'

export default function AddBooks() {
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    imgUrl: ''
  })
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const postRequest = () => {
    fetch("/api/books", {
      method: "POST",
      body: JSON.stringify({
        name: inputs.name,
        description: inputs.description,
        imgUrl: inputs.imgUrl
      }),
      headers: {"Content-Type" : "application/json"}
      
    }).then((res) => res.json()).then((data) => console.log(data))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!inputs.name && !inputs.description && !inputs.imgUrl){
      return
    }else{
      postRequest()
    }
  }
  return (
    <div className="max-w-xl mx-auto py-5">
      <form action="" method="post" className="flex flex-col space-y-3 " onSubmit={handleSubmit}>
        <div className="flex items-center gap-1">
        <label htmlFor="name" className="text-red-400">Name:</label>
        <input className="w-full border outline-none bg-red-200 rounded p-1 focus:bg-red-100" type="text" id='name' name='name' value={inputs.name} onChange={handleChange} />
        </div>
        <div className="flex items-center gap-1">
          <label htmlFor="description" className="text-red-400">Description:</label>
          <input type="text" id='description' className="w-full border outline-none bg-red-200 rounded p-1 focus:bg-red-100" name='description' value={inputs.description} onChange={handleChange} />
        </div>
        <div className="flex items-center gap-1">
          <label htmlFor="imgUrl" className="text-red-400">ImgUrl:</label>
          <input type="text" id='imgUrl' className="w-full border outline-none bg-red-200 rounded p-1 focus:bg-red-100" name='imgUrl' value={inputs.imgUrl} onChange={handleChange} />
        </div>
        <button type='submit' className="bg-red-200 p-1 font-bold rounded text-red-400">Submit</button>
      </form>
    </div>
  )
}
