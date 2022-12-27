import React, { useEffect, useState } from 'react'
import BookItem from './bookItem'

export default function BookLists() {
    const [data, setData] = useState()
    const booksRespons = () => {
        fetch("/api/books")
        .then((res) => res.json())
        .then((data) => setData(data.booksData) )
    }
    useEffect(() => {
        booksRespons()
    }, [])
  return (
    <div className="max-w-7xl mx-auto">        
    
    <div className="grid grid-cols-8  gap-4 py-5 ">
        {data && data.map((item, index) => {
            return  <BookItem id={item.id} name={item.name} description={item.description} imgUrl={item.imgUrl} />
            
        })}
        </div>
        </div>
  )
}
