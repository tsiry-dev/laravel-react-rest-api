import { CheckCircle, Pencil, Trash2, UserPlus, XIcon } from 'lucide-react';
import React, { useEffect, useState, type FormEvent } from 'react'
import LoaderRemove from '../components/loaders/LoaderRemove';
import Modal from '../components/Modal';
import Overlay from '../components/Overlay';
import axiosClient from '../services/apiClient';
import { useStateContext } from '../contexts/ContextProvider';
import rotate from '../assets/svg/rotate.svg';
import Swal from 'sweetalert2';

interface FormInterface {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
}

export default function Contact() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingStore, setIsLoadingStore] = useState<boolean>(false);
    const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);
    const [contactIdRemoves, setContactIdRemoves] = useState<number[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const [contactUpdateItem, setContactUpdateItem] = useState<FormInterface | null>(null);


    const { user } = useStateContext();



    const [contacts, setContacts] = useState<FormInterface[]>([]);

    const [form, setForm] = useState<FormInterface>({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
    });

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setIsSuccess(false);
            }, 2000);
        }
    }, [isSuccess]);

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


   const resetForm = () => {
     setForm({
       name: '',
       email: '',
       phone: '',
       address: '',
       city: '',
       country: '',
     });
   }


   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setErrors({});
    setIsLoadingStore(true);
    try {
      const response = await axiosClient.post('/contacts', form);
      setContacts([...contacts, response.data.data]);
      resetForm();
     setIsSuccess(true)


      console.log(response);

    } catch (error: any) {
        if (error.response && error.response.status === 422) {
            console.log("Validation errors:", error.response.data.errors); // <- Important
            setErrors(error.response.data.errors); // mettre les erreurs dans le state
        }
    }finally {
            setIsLoadingStore(false);
    }
  };



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
    setContactUpdateItem(null);
    resetForm();
    setErrors({});

  };

  const handleEditContact = (contactItem: FormInterface) => {
    console.log(contactItem);

    setContactUpdateItem(
        contactItem
    );

    setIsModalOpen(true);
    setForm({
        name: contactItem.name,
        email: contactItem.email,
        phone: contactItem.phone,
        address: contactItem.address,
        city:   contactItem.city,
        country: contactItem.country,
    });

  }
const handleUpdateContact = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingStore(true);
    setErrors({});

    const contactId: number = contactUpdateItem?.id;

    try {
        // Utiliser contactId au lieu de contactUpdateItem
        const response = await axiosClient.put(`/contacts/${contactId}`, form);

        setContacts(
            currentContact => currentContact.map((contact: any) => {
                if (contact.id === contactId) {
                    return response.data.data;
                }
                return contact;
            })
        );

        setIsSuccess(true);
        handleCloseModal();

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Modification réussie",
            showConfirmButton: false,
            timer: 1500
        });

        console.log(response);



    } catch (error: any) {
        if (error.response && error.response.status === 422) {
            console.log("Validation errors:", error.response.data.errors);
            setErrors(error.response.data.errors);
        }
    } finally {
        setIsLoadingStore(false);
    }
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
                            <button
                            onClick={() => handleEditContact(contact)}
                            className="text-blue-600 hover:text-blue-800">
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
                                <h2 className="text-xl font-semibold text-gray-700">
                                    {contactUpdateItem ? 'Modifier contact' : 'Nouveau contact'}
                                </h2>
                                <button onClick={handleCloseModal}>
                                    <XIcon size={18} />
                                </button>
                            </div>

                            <form onSubmit={contactUpdateItem ? handleUpdateContact : handleSubmit} className="flex flex-col gap-4">

                                {
                                    isSuccess &&
                                    <div className='flex justify-center items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-md transition'>
                                        <CheckCircle size={18} />
                                        <p>AJout avec succès</p>
                                    </div>
                                }

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Nom</label>
                                        <input
                                            value={form.name}
                                            onChange={(e) => setForm({...form, name: e.target.value})}
                                        type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Nom" />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}

                                    </div>

                                    <div>
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                                        <input
                                        value={form.email}
                                        onChange={(e) => setForm({...form, email: e.target.value})}
                                        type="email" id="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Email" />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}

                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Téléphone</label>
                                        <input
                                        value={form.phone}
                                        onChange={(e) => setForm({...form, phone: e.target.value})}
                                        type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Nom" />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone[0]}</p>}

                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Adresse</label>
                                        <input
                                        value={form.address}
                                        onChange={(e) => setForm({...form, address: e.target.value})}
                                        type="text" id="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Email" />
                                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address[0]}</p>}

                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Ville</label>
                                        <input
                                        value={form.city}
                                        onChange={(e) => setForm({...form, city: e.target.value})}
                                        type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Ville" />
                                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city[0]}</p>}

                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Pays</label>
                                        <input
                                        value={form.country}
                                        onChange={(e) => setForm({...form, country: e.target.value})}
                                        type="text" id="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Email" />
                                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country[0]}</p>}

                                    </div>
                                </div>

                            <div className="flex justify-end">
                                <button

                                className={`${isLoadingStore ? 'cursor-not-allowed bg-gray-400' : ''} bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md transition`}>
                                        {isLoadingStore ?
                                            <div className='flex gap-2 items-center justify-center'>
                                              <img src={rotate} alt="rotate" className="w-5 h-5" />
                                            </div>
                                        : 'Ajouter'}
                                </button>
                            </div>
                            </form>
                        </div>
                    </Modal >
                   <Overlay onClick={() => handleCloseModal()} />
                </div>

            )}
    </>
  );
}
