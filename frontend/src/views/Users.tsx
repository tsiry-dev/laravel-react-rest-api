import React, { use, useEffect, useState } from 'react';
import { Pencil, Trash2, UserPlus, XIcon } from 'lucide-react';
import axios from 'axios';
import axiosClient from '../services/apiClient';
import LoaderRemove from '../components/loaders/LoaderRemove';
import Modal from '../components/Modal';
import Overlay from '../components/Overlay';

interface UserInterface {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Users() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [userIdRemoves, setUserIdRemoves] = useState<number[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
     setIsLoading(true);
     axiosClient.get("/users")
      .then(({ data }) => {
        if (data) {
          setUsers(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, []);


  const handleRemove = async (id: number) => {
    setUserIdRemoves([...userIdRemoves, id]);
    setIsLoadingRemove(true);
    try {
      await axiosClient.delete(`/users/${id}`);
      setUsers(
        currentUsers => currentUsers.filter(user => user.id !== id)
      );
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }finally {
        setIsLoadingRemove(false);
    }
  };


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
        <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Liste des utilisateurs</h2>
            <button
            onClick={handleOpenModal}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md transition">
            <UserPlus size={18} />
            Ajouter
            </button>
        </div>

        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-purple-100 text-left">
                <tr>
                <th className="py-3 px-4">Nom</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Rôle</th>
                <th className="py-3 px-4 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {isLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <tr key={index} className="border-t animate-pulse">
                        <td className="py-3 px-4">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        </td>
                        <td className="py-3 px-4">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        </td>
                        <td className="py-3 px-4">
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </td>
                        <td className="py-3 px-4 text-center">
                        <div className="flex justify-center gap-3">
                            <div className="w-5 h-5 bg-gray-300 rounded"></div>
                            <div className="w-5 h-5 bg-gray-300 rounded"></div>
                        </div>
                        </td>
                    </tr>
                    ))
                : users.map((user) => (
                    <tr key={user.id} className={`border-t transition ${userIdRemoves.includes(user.id) ? 'bg-red-200' : ''}`}>
                        <td className="py-3 px-4 font-medium">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{user.role}</td>
                        <td className={`py-3 px-4`}>
                        <div className="flex justify-center gap-3">
                            <button className="text-blue-600 hover:text-blue-800">
                            <Pencil size={18} />
                            </button>
                            <button
                            disabled={userIdRemoves.includes(user.id)}
                            onClick={() => handleRemove(user.id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer">
                                {
                                    userIdRemoves.includes(user.id) ?
                                    <LoaderRemove />
                                    :
                                    <Trash2 size={18} />
                                }
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))}
            </tbody>
            </table>
        </div>
        </div>

            {isModalOpen && (
                <div>
                    <Modal >
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-gray-700">Ajouter un utilisateur</h2>
                                <button onClick={handleCloseModal}>
                                    <XIcon size={18} />
                                </button>
                            </div>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">Nom</label>
                                <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Nom" />
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Email" />
                                <label htmlFor="role" className="text-sm font-medium text-gray-700">Rôle</label>
                                <select id="role" className="w-full p-2 border border-gray-300 rounded-md">
                                    <option value="admin">Admin</option>
                                    <option value="user">Utilisateur</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md transition">
                                    Ajouter
                                </button>
                            </div>
                        </div>
                    </Modal >
                   <Overlay onClick={() => handleCloseModal()} />
                </div>

            )}
    </>
  );
}
