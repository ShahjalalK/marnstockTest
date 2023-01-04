import React from 'react'
import {parseCookies} from 'nookies'

export default function account() {
  return (
    <div>My Account</div>
  )
}


export async function getServerSideProps(ctx) {
  const {token} = parseCookies(ctx)
  if(!token){
    const {res} = ctx
    res.writeHead(302, {location: "/login"})
    res.end()
  }
  return {
    props: {}
  }
}
