import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../services/apiClient';
import { useEffect, useState } from 'react';
import rotate from './../assets/svg/rotate.svg';
import { LogOut, LayoutDashboard, Users } from 'lucide-react';
import Swal from 'sweetalert2';

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
      await axiosClient.post('/logout')
                .then((response) => {
                    console.log(response);
                });

      // Nettoyer le contexte
      setToken(null);
      setUser(null);

    } catch (error: any) {
        if(error?.response?.status === 403) {
            Swal.fire({
                icon: "error",
                title: "Vous n'êtes pas autorisé à faire cette action",
                footer: '<a href="#">Merci de retourner à la page d\'accueil</a>',
                confirmButtonText: 'Ok, je comprends',
            });
        }
      console.error('Erreur lors de la déconnexion :', error.response.status);
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
            {user?.role === 'admin' &&
                <Link
                to="/users"
                className="flex items-center gap-2 hover:text-purple-300 transition"
                >
                <Users size={20} />
                Utilisateurs
                </Link>
            }
            <Link
              to="/contacts"
              className="flex items-center gap-2 hover:text-purple-300 transition"
            >
              <Users size={20} />
              Contacts
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
          {
            !user ?
            <div className="text-right">
                <p className="bg-gray-400 animate-pulse p-2 w-12 ml-auto rounded-lg mb-1"></p>
                <p className="bg-gray-400 p-2 w-20 animate-pulse rounded-lg"></p>
            </div>
            :
            <div className="text-right">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          }

        </header>

        <Outlet />
      </main>
    </div>
  )
}
