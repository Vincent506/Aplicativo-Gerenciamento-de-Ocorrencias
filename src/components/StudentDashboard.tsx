import { LogOut, AlertCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { User, Occurrence } from '../App';
import { OccurrenceCard } from './OccurrenceCard';

interface StudentDashboardProps {
  user: User;
  occurrences: Occurrence[];
  onLogout: () => void;
}

export function StudentDashboard({ user, occurrences, onLogout }: StudentDashboardProps) {
  const [showMenu, setShowMenu] = useState(false);
  
  const leves = occurrences.filter(o => o.categoria === 'leve').length;
  const medianas = occurrences.filter(o => o.categoria === 'mediana').length;
  const graves = occurrences.filter(o => o.categoria === 'grave').length;
  const gravissimas = occurrences.filter(o => o.categoria === 'gravissima').length;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header Mobile - Fixed */}
      <header className="bg-green-700 text-white shadow-lg relative z-30">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex-1 min-w-0">
              <h1 className="text-white text-lg truncate">Minhas Ocorrências</h1>
              <p className="text-green-50 text-xs truncate mt-0.5">Olá, {user.nome}</p>
            </div>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-green-600 rounded-lg transition-colors flex-shrink-0"
            >
              {showMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu Dropdown */}
        {showMenu && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200">
            <button
              onClick={() => {
                onLogout();
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-4 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <LogOut size={20} />
              <span className="text-sm">Sair da conta</span>
            </button>
          </div>
        )}
      </header>

      {/* Conteúdo - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Resumo */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-green-700" size={24} />
              <h2 className="text-gray-900 text-sm">Resumo de Ocorrências</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 text-center">
                <p className="text-green-800 text-xs">Leves</p>
                <p className="text-green-900 text-2xl mt-1">{leves}</p>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 text-center">
                <p className="text-yellow-800 text-xs">Medianas</p>
                <p className="text-yellow-900 text-2xl mt-1">{medianas}</p>
              </div>
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 text-center">
                <p className="text-red-800 text-xs">Graves</p>
                <p className="text-red-900 text-2xl mt-1">{graves}</p>
              </div>
              <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-3 text-center">
                <p className="text-purple-800 text-xs">Gravíssimas</p>
                <p className="text-purple-900 text-2xl mt-1">{gravissimas}</p>
              </div>
            </div>
          </div>

          {/* Lista de Ocorrências */}
          <div className="space-y-3">
            <h2 className="text-gray-900 text-sm">Histórico ({occurrences.length})</h2>
            {occurrences.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-gray-500 text-sm">Você não tem ocorrências registradas</p>
                <p className="text-green-600 mt-2 text-sm">Continue assim! 🎉</p>
              </div>
            ) : (
              occurrences.map((occurrence) => (
                <OccurrenceCard key={occurrence.id} occurrence={occurrence} hideStudentName />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}