import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../services/apiClient';
import { useState } from 'react';
import rotate from './../assets/svg/rotate.svg';
import { LogOut, LayoutDashboard, Users } from 'lucide-react';

export default function AppLayout() {

  const { user, token , setToken, setUser} = useStateContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if(!token) {
      return <Navigate to="/login" replace/>
  }

  const handleLogout = async () => {

    console.log("logout");
    setIsLoading(true);

    try {
      await axiosClient.post('/logout');

      // Nettoyer le contexte
      setToken(null);
      setUser(null);

    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen text-gray-800 bg-gray-100">
      {/* Sidebar */}
      <aside className="w-[250px] bg-purple-700 text-white flex flex-col justify-between p-5">
        <div>
          <h1 className="text-2xl font-bold mb-10">NeoTech</h1>
          <nav className="space-y-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 hover:text-purple-300 transition"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
            <Link
              to="/users"
              className="flex items-center gap-2 hover:text-purple-300 transition"
            >
              <Users size={20} />
              Utilisateurs
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded-md"
        >
          {isLoading ? (
            <img src={rotate} alt="loading" className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <LogOut size={18} />
              <span>Déconnexion</span>
            </>
          )}
        </button>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Bienvenue 👋</h2>
            <p className="text-sm text-gray-500">Panneau d’administration</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  )
}
