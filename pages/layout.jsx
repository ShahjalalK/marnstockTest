import React from 'react'
import Navbar from './navbar/navbar'

export default function Layout({children}) {
  return (
    <>
    <Navbar />
     {children} 
    </>
  )
}
