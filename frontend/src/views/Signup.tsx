import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../services/apiClient';
import { useStateContext } from '../contexts/ContextProvider';
import rotate from './../assets/svg/rotate.svg';

interface FormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface ValidationErrors {
  [key: string]: string[];
}

export default function Signup() {
  const navigate = useNavigate();
  const { setUser, setToken } = useStateContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: [] })); // Effacer les erreurs du champ modifié
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
    }

    try {
        setIsLoading(true);
      const response = await axiosClient.post('/signup', payload);

      const { user, token } = response.data;
      setUser(user);
      setToken(token);
      navigate('/dashboard');

    } catch (error: any) {
        if (error.response && error.response.status === 422) {
            console.log("Validation errors:", error.response.data.errors); // <- Important
            setErrors(error.response.data.errors); // mettre les erreurs dans le state
        }
    }finally {
        setIsLoading(false);
    }
  };


  return (
    <div className="">
      <h2 className="text-xl uppercase text-gray-700 text-center mb-6">Inscription</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom */}
        <div>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="w-full p-2 bg-white outline-none border border-purple-400 rounded-md"
            placeholder="Votre Nom"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full p-2 bg-white outline-none border border-purple-400 rounded-md"
            placeholder="Votre Email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
        </div>

        {/* Mot de passe */}
        <div>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="w-full p-2 bg-white outline-none border border-purple-400 rounded-md"
            placeholder="Mot de passe"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
        </div>

        {/* Confirmation */}
        <div>
          <input
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            type="password"
            className="w-full p-2 bg-white outline-none border border-purple-400 rounded-md"
            placeholder="Confirmez votre mot de passe"
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm mt-1">{errors.password_confirmation[0]}</p>
          )}
        </div>

        {/* Bouton */}
        <div>
          <button
            disabled={isLoading}
            type="submit"
            className={`${isLoading ? 'cursor-not-allowed bg-gray-400' : ''} w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition`}
          >
            {isLoading ?
            <div className='flex gap-2 items-center justify-center'>
               {/* <span>Processing...</span> */}
               <img src={rotate} alt="rotate" className="w-5 h-5" />
            </div>
            : 'S\'inscrire'}
          </button>
        </div>

        {/* Lien login */}
        <div>
          <p className="text-center text-sm text-gray-500">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="text-purple-600 underline">
              Connectez-vous
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
