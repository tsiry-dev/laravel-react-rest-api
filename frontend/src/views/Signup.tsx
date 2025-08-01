import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div>
      <h2 className='text-xl uppercase text-gray-700 text-center'>Inscription</h2>

      <form action="#" className='mt-10 space-y-6'>
          <input type="text" className='w-full p-2 bg-white outline-none border-1 border-purple-400 rounded-md' placeholder="Votre Nom" />
          <input type="text" className='w-full p-2 bg-white outline-none border-1 border-purple-400 rounded-md' placeholder="Votre email" />
          <input type="text" className='w-full p-2 bg-white outline-none border-1 border-purple-400 rounded-md' placeholder="Mot de passe" />
          <input type="text" className='w-full p-2 bg-white outline-none border-1 border-purple-400 rounded-md' placeholder="Confirmez votre mot de passe" />

          <div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md">Inscription</button>
          </div>

          <div>
              <p className='text-center text-sm text-gray-500'>Vous avez déja un compte ? <Link to="/login" className='text-purple-600 underline'>Connectez-vous</Link></p>
          </div>
      </form>
    </div>
  )
}
