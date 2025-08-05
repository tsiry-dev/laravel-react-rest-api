import { Users, BarChart, Activity, Loader } from 'lucide-react';
import { use, useEffect, useState } from 'react';
import axiosClient from '../services/apiClient';

export default function Dashboard() {

    const [contactCount, setContactCount] = useState<number>(0);
    const [isCountLoading, setIsCountLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsCountLoading(true);

        axiosClient.get('/contacts/count')
            .then(({ data }) => {
                if (data) {
                    setContactCount(data.data);
                    console.log('Nombre de contacts:', data.data);
                }
            })
            .catch((error) => {
                console.log('Erreur lors du comptage:', error);
                setContactCount(0); // Valeur par défaut en cas d'erreur
            })
            .finally(() => {
                setIsCountLoading(false);
            });
    }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Carte 1 */}
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <Users className="text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Contacts</h3>
            <p className="text-2xl font-bold">{ isCountLoading ? <Loader className='animate-spin' /> : contactCount }</p>
          </div>
        </div>
      </div>

      {/* Carte 2 */}
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <BarChart className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Revenus</h3>
            <p className="text-2xl font-bold flex gap-2"><Loader className='animate-spin' /> <span>Ar</span></p>
          </div>
        </div>
      </div>

      {/* Carte 3 */}
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Activity className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Activité</h3>
            <p className="text-2xl font-bold flex gap-2"><Loader className='animate-spin' /> <span>%</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
