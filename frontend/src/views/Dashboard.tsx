import { Users, BarChart, Activity } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Carte 1 */}
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <Users className="text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Utilisateurs</h3>
            <p className="text-2xl font-bold">1,245</p>
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
            <p className="text-2xl font-bold">750 000 Ar</p>
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
            <p className="text-2xl font-bold">89%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
