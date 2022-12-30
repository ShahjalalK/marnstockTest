import baseUrl from "../../confic/baseUrl"

export default function ProductId({product}) {
  console.log(product)
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
        <div className="ax-w-full md:max-w-3xl mx-auto py-5">
          <div className="text-center md:max-w-xl mx-auto">
            <h1 className="text-5xl mb-2 text-orange-500">{item.name}</h1>
           <img src={item.mediaUrl} alt="media" className="text-center mx-auto w-full" />
           <h2 className="text-left text-2xl p-3 text-orange-500">TK.{item.price}</h2>
          </div>
          <p>{item.description}</p>
        </div>
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

