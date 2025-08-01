import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <h2 className='text-xl uppercase text-gray-700 text-center'>Connexion</h2>

      <form action="#" className='mt-10 space-y-6'>
          <input type="text" className='w-full p-2 bg-white outline-none border-1 border-purple-400 rounded-md' placeholder="Votre email" />
          <input type="text" className='w-full p-2 bg-white outline-none border-1 border-purple-400 rounded-md' placeholder="Mot de passe" />

          <div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md">Connexion</button>
          </div>

          <div>
              <p className='text-center text-sm text-gray-500'>Vous n'avez pas de compte ? <Link to="/signup" className='text-purple-600 underline'>Inscrivez-vous</Link></p>
          </div>
      </form>
    </div>
  )
}
