import baseUrl from "../../confic/baseUrl"
import {IoMdAdd} from "react-icons/io"
import {MdDelete} from "react-icons/md"
import { useRef, useState } from "react"
import { useRouter } from "next/router"

export default function ProductId({product}) {
  const router = useRouter()
  const [model, setModel] = useState(false)
  const deleteProduct = async (id) => {
    // const res = await fetch(`${baseUrl}/api/product/${id}`, {
    //   method : "DELETE"
    // })
    // await res.json()

    console.log(id)
    
    // router.push("/")


    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      method : "DELETE"
    })
    await res.json()
    router.push("/")
     }
  
  return (
    <div>
    {/* {product && product.map((item, index) => {
      return(
        <h1>{item.name}</h1>
      )
    })} */}
    
    {product ? <div>
      {product.map((item, index) => {
      return(
        <>
        <div className="max-w-full md:max-w-3xl mx-auto py-5">
          <div className="text-center md:max-w-xl mx-auto mb-5">
            <h1 className="text-5xl mb-2 text-orange-500">{item.name}</h1>
           <img src={item.mediaUrl} alt="media" className="text-center mx-auto w-[60%]" />
           <h2 className="text-2xl p-3 text-orange-500">TK.{item.price}</h2>
           <div className="flex items-center gap-1">
           <input type="number" min="1" className="w-[400px] border-b-[#034352] text-left my-3 px-1 py-2 outline-none" placeholder="Quantity" />
           
           <button className="uppercase px-2 py-1 flex items-center gap-3 rounded bg-[#0c9bbb] text-white ">Add <IoMdAdd className="text-white" /></button>
          
    
           </div>
          </div>
          <p className="mb-5">{item.description}</p>
          
          <button onClick={() => setModel(!model)} className="uppercase px-3 py-1 flex items-center gap-3 rounded bg-red-500 text-white mx-auto "><MdDelete className="text-white " /> Delete</button>


          {/* <button className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="defaultModal">
          Toggle modal
        </button> */}

        </div>

       <div className={model ? "model active" : "model"} >
        <div className="bg-white p-10 flex flex-col text-center space-y-3 rounded-md">
          <h1 className="text-2xl text-black">{item.name}</h1>
          <p className="text-lg">Are you sure you want to delete this product?</p>
          <div className="flex items-center pt-5">

          <button onClick={() => deleteProduct(item._id)} className="uppercase px-3 py-1 flex items-center gap-3 rounded bg-red-500 text-white mx-auto "><MdDelete className="text-white" /> Delete</button>

          <button onClick={() => setModel(!model)} className="uppercase px-3 py-1 flex items-center gap-3 rounded border text-gray-500 mx-auto "> No, cancel </button>
          </div>
        </div>
       </div>

        </>
      )
    })}
      
    </div> : <div>
    <h1 className="text-red-500 text-5xl">Looding...</h1>
    </div>}
      
    </div>
  )
}


// export async function getServerSideProps({params:{id}}) {
//     const rs = await fetch(`http://localhost:3000/api/products/${id}`)
//     const data = await rs.json()
//      return {
//        props: {product:data}, // will be passed to the page component as props
//      }
//   }


export async function getStaticProps({params:{id}}) {
  const rs = await fetch(`${baseUrl}/api/products/${id}`)
      const data = await rs.json()
       return {
         props: {product:data}, // will be passed to the page component as props
       }
}


export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '63ae777855988286fff31538' } }],
    fallback: true, // can also be true or 'blocking'
  }
}

