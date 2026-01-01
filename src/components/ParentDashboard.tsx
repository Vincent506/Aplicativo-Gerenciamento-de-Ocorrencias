import { LogOut, Bell, User as UserIcon, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { User, Occurrence } from '../App';
import { OccurrenceCard } from './OccurrenceCard';

interface ParentDashboardProps {
  user: User;
  occurrences: Occurrence[];
  studentName: string;
  onLogout: () => void;
}

export function ParentDashboard({ user, occurrences, studentName, onLogout }: ParentDashboardProps) {
  const [showMenu, setShowMenu] = useState(false);
  
  const leves = occurrences.filter(o => o.categoria === 'leve').length;
  const medianas = occurrences.filter(o => o.categoria === 'mediana').length;
  const graves = occurrences.filter(o => o.categoria === 'grave').length;
  const gravissimas = occurrences.filter(o => o.categoria === 'gravissima').length;
  const notificacoes = occurrences.filter(o => o.notificadoPai).length;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header Mobile - Fixed */}
      <header className="bg-green-800 text-white shadow-lg relative z-30">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex-1 min-w-0">
              <h1 className="text-white text-lg truncate">Responsável</h1>
              <p className="text-green-100 text-xs truncate mt-0.5">{user.nome}</p>
            </div>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-green-700 rounded-lg transition-colors flex-shrink-0"
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
          {/* Informações do Aluno */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center gap-3 mb-2">
              <UserIcon className="text-green-700" size={24} />
              <h2 className="text-gray-900 text-sm">Aluno Vinculado</h2>
            </div>
            <p className="text-gray-700">{studentName}</p>
          </div>

          {/* Notificações */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Bell className="text-green-700 flex-shrink-0" size={24} />
              <div className="flex-1 min-w-0">
                <h3 className="text-green-900 text-sm">Notificações</h3>
                <p className="text-green-700 text-xs mt-1 truncate">
                  Você tem {notificacoes} notificação{notificacoes !== 1 ? 'ões' : ''} de ocorrências
                </p>
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className="text-gray-900 text-sm mb-4">Resumo de Ocorrências</h2>
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
            <h2 className="text-gray-900 text-sm">Histórico de Ocorrências ({occurrences.length})</h2>
            {occurrences.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-gray-500 text-sm">Nenhuma ocorrência registrada</p>
                <p className="text-green-600 mt-2 text-sm">Seu filho está indo muito bem! 🎉</p>
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