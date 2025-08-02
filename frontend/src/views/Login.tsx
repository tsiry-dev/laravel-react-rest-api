import {  useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../services/apiClient";
import rotate from './../assets/svg/rotate.svg';

export default function Login() {
  const navigate = useNavigate();
  const { setToken, setUser } = useStateContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    setIsLoading(true);

    try {
      const response = await axiosClient.post('/login', {
        email,
        password,
      });

      setUser(response.data.user);
      setToken(response.data.token);

      if(response.data.token) {
          navigate('/dashboard');
      }

    } catch (error: any) {
        if (error.response?.status === 422) {
            setErrors(error.response.data.errors || {});
        } else if (error.response?.status === 401) {
            // Erreur d'identifiants incorrects
            setErrors({ message: [error.response.data.message] });
        } else {
            console.error("Erreur inattendue :", error);
        }
    }finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="">
      <h2 className='text-xl uppercase text-gray-700 text-center'>Connexion</h2>

      <form className='mt-10 space-y-6' onSubmit={handleSubmit} noValidate>
        {errors.message && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                {errors.message[0]}
            </div>
        )}
        <div>
          <input
            type="email"
            className='w-full p-2 bg-white outline-none border border-purple-400 rounded-md'
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
        </div>

        <div>
          <input
            type="password"
            className='w-full p-2 bg-white outline-none border border-purple-400 rounded-md'
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
        </div>

        <div>
          <button
             disabled={isLoading}
             className={`${isLoading ? 'cursor-not-allowed' : ''} bg-purple-600 text-white px-4 py-2 rounded-md w-full`}>
            {isLoading ?
                <div className='flex gap-2 items-center justify-center'>
                    {/* <span>Processing...</span> */}
                    <img src={rotate} alt="rotate" className="w-5 h-5" />
                </div>
            : 'Se connecter'
            }
          </button>
        </div>

        <div>
          <p className='text-center text-sm text-gray-500'>
            Vous n'avez pas de compte ? <Link to="/signup" className='text-purple-600 underline'>Inscrivez-vous</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
