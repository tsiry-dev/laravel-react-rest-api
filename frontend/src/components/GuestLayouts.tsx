import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export default function GuestLayouts() {

  const {token} = useStateContext();

  if(token) {
      return <Navigate to="/" />
  }

  return (
    <div className=' max-w-[40rem] mt-30 p-5 shadow-lg m-auto rounded-2xl border-1 border-purple-400'>
       <Outlet />
    </div>
  )
}
