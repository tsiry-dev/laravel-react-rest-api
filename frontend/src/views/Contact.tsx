import { Pencil, Trash2, UserPlus, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import LoaderRemove from '../components/loaders/LoaderRemove';
import Modal from '../components/Modal';
import Overlay from '../components/Overlay';
import axiosClient from '../services/apiClient';
import { useStateContext } from '../contexts/ContextProvider';

interface FormInterface {

    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    role: string;
}

export default function Contact() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);
    const [contactIdRemoves, setContactIdRemoves] = useState<number[]>([]);

    const { user } = useStateContext();



    const [contacts, setContacts] = useState<FormInterface[]>([]);

    const [form, setForm] = useState<FormInterface>({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        role: '',
    });

   useEffect(() => {

        if (!user || !user.id) {
           return;
        }

       setIsLoading(true);

      axiosClient.get(`/contacts/${user?.id}`)
        .then(({ data }) => {
          if (data) {
            setContacts(data.data);
            console.log(data.data);

          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });

   }, [user]);



  const handleRemove = async (id: number) => {
    setContactIdRemoves([...contactIdRemoves, id]);
    setIsLoadingRemove(true);
    try {
      await axiosClient.delete(`/contacts/remove/${id}`);
      setContacts(
        currentContact => currentContact.filter((contact: any) => contact?.id !== id)
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
            <h2 className="text-xl font-semibold text-gray-700">Mes contacts</h2>
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
                <th className="py-3 px-4">Téléphone</th>
                <th className="py-3 px-4">Adresse</th>
                <th className="py-3 px-4">Ville</th>
                <th className="py-3 px-4">Pays</th>
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
                        <td className="py-3 px-4">
                           <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </td>
                        <td className="py-3 px-4">
                           <div className="h-4 bg-gray-300 rounded w-1/2"></div>
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
                : contacts.map((contact: any) => (
                    <tr key={contact.id} className={`border-t transition ${contactIdRemoves.includes(contact.id) ? 'bg-red-200' : ''}`}>
                        <td className="py-3 px-4 font-medium">{contact.name}</td>
                        <td className="py-3 px-4">{contact.email}</td>
                        <td className="py-3 px-4">{contact.phone}</td>
                        <td className="py-3 px-4">{contact.address}</td>
                        <td className="py-3 px-4">{contact.city}</td>
                        <td className="py-3 px-4">{contact.country}</td>
                        <td className={`py-3 px-4`}>
                        <div className="flex justify-center gap-3">
                            <button className="text-blue-600 hover:text-blue-800">
                            <Pencil size={18} />
                            </button>
                            <button
                            disabled={contactIdRemoves.includes(contact.id)}
                            onClick={() => handleRemove(contact.id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer">
                                {
                                    contactIdRemoves.includes(contact.id) ?
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
                                <h2 className="text-xl font-semibold text-gray-700">Nouveau contact</h2>
                                <button onClick={handleCloseModal}>
                                    <XIcon size={18} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Nom</label>
                                        <input
                                            value={form.name}
                                            onChange={(e) => setForm({...form, name: e.target.value})}
                                        type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Nom" />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                                        <input
                                        value={form.email}
                                        onChange={(e) => setForm({...form, email: e.target.value})}
                                        type="email" id="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Email" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Téléphone</label>
                                        <input
                                        onChange={(e) => setForm({...form, phone: e.target.value})}
                                        type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Nom" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Adresse</label>
                                        <input
                                        value={form.address}
                                        onChange={(e) => setForm({...form, address: e.target.value})}
                                        type="text" id="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Email" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Ville</label>
                                        <input
                                        value={form.city}
                                        onChange={(e) => setForm({...form, city: e.target.value})}
                                        type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Ville" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Pays</label>
                                        <input
                                        value={form.country}
                                        onChange={(e) => setForm({...form, country: e.target.value})}
                                        type="text" id="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Email" />
                                    </div>
                                </div>

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
