import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export default function GuestLayouts() {

  const {token} = useStateContext();

  if(token) {
      return <Navigate to="/" />
  }

  return (
    <div className='bg-red-400 max-w-[40rem] mt-30 m-auto'>
       <Outlet />
    </div>
  )
}
