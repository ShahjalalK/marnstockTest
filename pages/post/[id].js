function findPost({singleData}) {
    return (
        <div key={singleData.id} className="max-w-5xl mx-auto border p-3 h-screen">
            <div className="text-3xl capitalize font-bold ">
           <span className="text-7xl text-gray-400">{singleData.id}.</span> {singleData.title}
            </div>
            <div className="mt-3">
            {singleData.body}
            </div>
        </div>
    );
}

export async function getStaticProps(ctx){
    const {params} = ctx
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const data = await res.json()

    return {
        props:{
            singleData: data
        }
    }
}


export async function getStaticPaths() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const data = await res.json()
    const paths = data.map((post) => {
        return {
            params : {id: `${post.id}`}
        }
    })
    return {
        paths,
      fallback: true
    }
  }

export default findPost;