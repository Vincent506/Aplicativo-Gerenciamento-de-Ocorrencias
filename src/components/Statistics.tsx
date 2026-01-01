import { BarChart3, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { Occurrence } from '../App';

interface StatisticsProps {
  occurrences: Occurrence[];
}

export function Statistics({ occurrences }: StatisticsProps) {
  const total = occurrences.length;
  const leves = occurrences.filter(o => o.categoria === 'leve').length;
  const medianas = occurrences.filter(o => o.categoria === 'mediana').length;
  const graves = occurrences.filter(o => o.categoria === 'grave').length;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="text-green-700" size={28} />
        <h2 className="text-gray-900">Estatísticas</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-gray-600" size={24} />
            <p className="text-gray-600">Total</p>
          </div>
          <p className="text-gray-900">{total}</p>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="text-green-600" size={24} />
            <p className="text-green-700">Leves</p>
          </div>
          <p className="text-green-900">{leves}</p>
          {total > 0 && (
            <p className="text-green-600 text-sm mt-1">{Math.round((leves / total) * 100)}%</p>
          )}
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-yellow-600" size={24} />
            <p className="text-yellow-700">Medianas</p>
          </div>
          <p className="text-yellow-900">{medianas}</p>
          {total > 0 && (
            <p className="text-yellow-600 text-sm mt-1">{Math.round((medianas / total) * 100)}%</p>
          )}
        </div>

        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-red-600" size={24} />
            <p className="text-red-700">Graves</p>
          </div>
          <p className="text-red-900">{graves}</p>
          {total > 0 && (
            <p className="text-red-600 text-sm mt-1">{Math.round((graves / total) * 100)}%</p>
          )}
        </div>
      </div>
    </div>
  );
}
