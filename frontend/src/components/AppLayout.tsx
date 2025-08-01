import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export default function AppLayout() {

  const { user, token } = useStateContext();

  if(!token) {
      return <Navigate to="/login" />
  }

  return (
    <div className='flex h-[100vh]'>
        <aside className='w-[20%] bg-purple-700 p-4'>
            <h1 className='text-white text-xl font-bold mb-5'>Laravel React Rest Api</h1>
            <ul>
                <li>
                    <Link to="/dashboard" className='text-white text-xl font-bold'>Dashboard</Link>
                </li>
                <li>
                    <Link to="/users" className='text-white text-xl font-bold'>Utilisateurs</Link>
                </li>
            </ul>
        </aside>

        <main className='flex-1 bg-gray-200 p-4'>
            <header className='flex justify-between items-center mb-5'>
               <div>Bonjour!!</div>
               <div className='flex gap-5 items-center'>
                   <h2>{user?.name}</h2>
                   <button className='bg-red-600 text-white px-4 py-2 rounded-md'>Logout</button>
               </div>
            </header>
            <div>
                <Outlet />
            </div>
        </main>
    </div>
  )
}
