import { useState } from 'react';
import { LogOut, Plus, BarChart3, FileText, Bell, Menu, X } from 'lucide-react';
import { User, Occurrence, OccurrenceSeverity } from '../App';
import { OccurrenceCard } from './OccurrenceCard';
import { AddOccurrenceModal } from './AddOccurrenceModal';

interface CoordinatorDashboardProps {
  user: User;
  occurrences: Occurrence[];
  students: User[];
  teachers: User[];
  onLogout: () => void;
  onAddOccurrence: (occurrence: Omit<Occurrence, 'id'>) => void;
}

type TabType = 'estatisticas' | 'ocorrencias' | 'notificacoes';

export function CoordinatorDashboard({ 
  user, 
  occurrences, 
  students, 
  teachers,
  onLogout,
  onAddOccurrence 
}: CoordinatorDashboardProps) {
  const [showModal, setShowModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<OccurrenceSeverity | 'todas'>('todas');
  const [activeTab, setActiveTab] = useState<TabType>('estatisticas');
  const [showMenu, setShowMenu] = useState(false);

  const filteredOccurrences = filterCategory === 'todas' 
    ? occurrences 
    : occurrences.filter(o => o.categoria === filterCategory);

  const notificacoesPendentes = occurrences.filter(o => !o.notificadoPai).length;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header Mobile - Fixed */}
      <header className="bg-green-800 text-white shadow-lg relative z-30">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex-1 min-w-0">
              <h1 className="text-white text-lg truncate">Coordenador</h1>
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
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-4">
          {/* Tab: Estatísticas */}
          {activeTab === 'estatisticas' && (
            <>
              {/* Header com Botão */}
              <div className="flex justify-between items-center">
                <h2 className="text-gray-900 text-base">Visão Geral</h2>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-full shadow-lg transition-colors text-sm"
                >
                  <Plus size={18} />
                  <span>Nova</span>
                </button>
              </div>

              {/* Cards de Estatísticas */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl shadow-md p-4">
                  <p className="text-gray-600 text-xs">Total</p>
                  <p className="text-gray-900 text-3xl mt-2">{occurrences.length}</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
                  <p className="text-green-700 text-xs">Leves</p>
                  <p className="text-green-900 text-3xl mt-2">
                    {occurrences.filter(o => o.categoria === 'leve').length}
                  </p>
                </div>
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
                  <p className="text-yellow-700 text-xs">Medianas</p>
                  <p className="text-yellow-900 text-3xl mt-2">
                    {occurrences.filter(o => o.categoria === 'mediana').length}
                  </p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
                  <p className="text-red-700 text-xs">Graves</p>
                  <p className="text-red-900 text-3xl mt-2">
                    {occurrences.filter(o => o.categoria === 'grave').length}
                  </p>
                </div>
              </div>

              {/* Card Gravíssimas */}
              <div className="bg-purple-50 border-2 border-purple-400 rounded-xl p-4">
                <p className="text-purple-700 text-xs">Gravíssimas</p>
                <p className="text-purple-900 text-3xl mt-2">
                  {occurrences.filter(o => o.categoria === 'gravissima').length}
                </p>
              </div>

              {/* Informações Rápidas */}
              <div className="bg-white rounded-xl shadow-md p-4 space-y-1">
                <h3 className="text-gray-900 text-sm mb-3">Resumo Rápido</h3>
                <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Total de Alunos</span>
                  <span className="text-gray-900">{students.length}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Total de Professores</span>
                  <span className="text-gray-900">{teachers.length}</span>
                </div>
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-gray-600 text-sm">Ocorrências Hoje</span>
                  <span className="text-gray-900">
                    {occurrences.filter(o => o.data === new Date().toISOString().split('T')[0]).length}
                  </span>
                </div>
              </div>

              {/* Últimas Ocorrências */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-900 text-sm">Últimas Ocorrências</h3>
                  <button
                    onClick={() => setActiveTab('ocorrencias')}
                    className="text-green-700 text-xs"
                  >
                    Ver todas
                  </button>
                </div>
                {occurrences.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <p className="text-gray-500 text-sm">Nenhuma ocorrência registrada</p>
                  </div>
                ) : (
                  occurrences.slice(0, 3).map((occurrence) => (
                    <OccurrenceCard key={occurrence.id} occurrence={occurrence} />
                  ))
                )}
              </div>
            </>
          )}

          {/* Tab: Ocorrências */}
          {activeTab === 'ocorrencias' && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-gray-900 text-base">Todas as Ocorrências</h2>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center justify-center w-10 h-10 bg-green-700 hover:bg-green-800 text-white rounded-full shadow-lg transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Filtro Mobile */}
              <div className="bg-white rounded-xl shadow-md p-3">
                <label className="block text-gray-700 text-xs mb-2">Filtrar por:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFilterCategory('todas')}
                    className={`px-3 py-2.5 rounded-lg border-2 transition-colors text-sm ${
                      filterCategory === 'todas' 
                        ? 'bg-green-700 text-white border-green-700' 
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setFilterCategory('leve')}
                    className={`px-3 py-2.5 rounded-lg border-2 transition-colors text-sm ${
                      filterCategory === 'leve' 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    Leve
                  </button>
                  <button
                    onClick={() => setFilterCategory('mediana')}
                    className={`px-3 py-2.5 rounded-lg border-2 transition-colors text-sm ${
                      filterCategory === 'mediana' 
                        ? 'bg-yellow-600 text-white border-yellow-600' 
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    Mediana
                  </button>
                  <button
                    onClick={() => setFilterCategory('grave')}
                    className={`px-3 py-2.5 rounded-lg border-2 transition-colors text-sm ${
                      filterCategory === 'grave' 
                        ? 'bg-red-600 text-white border-red-600' 
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    Grave
                  </button>
                  <button
                    onClick={() => setFilterCategory('gravissima')}
                    className={`px-3 py-2.5 rounded-lg border-2 transition-colors text-sm col-span-2 ${
                      filterCategory === 'gravissima' 
                        ? 'bg-purple-600 text-white border-purple-600' 
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    Gravíssima
                  </button>
                </div>
              </div>

              {/* Lista de Ocorrências */}
              <div className="space-y-3">
                <p className="text-gray-600 text-xs">{filteredOccurrences.length} ocorrências encontradas</p>
                {filteredOccurrences.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <p className="text-gray-500 text-sm">Nenhuma ocorrência encontrada</p>
                  </div>
                ) : (
                  filteredOccurrences.map((occurrence) => (
                    <OccurrenceCard key={occurrence.id} occurrence={occurrence} />
                  ))
                )}
              </div>
            </>
          )}

          {/* Tab: Notificações */}
          {activeTab === 'notificacoes' && (
            <>
              <h2 className="text-gray-900 text-base">Central de Notificações</h2>

              {/* Status de Notificações */}
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Bell className="text-green-700 flex-shrink-0" size={24} />
                  <div className="flex-1 min-w-0">
                    <p className="text-green-900 text-sm">Sistema de Notificações</p>
                    <p className="text-green-700 text-xs mt-1 truncate">
                      {notificacoesPendentes} notificações pendentes
                    </p>
                  </div>
                </div>
              </div>

              {/* Ocorrências que notificaram pais */}
              <div className="space-y-3">
                <h3 className="text-gray-900 text-sm">Notificações Enviadas</h3>
                {occurrences.filter(o => o.notificadoPai).length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <p className="text-gray-500 text-sm">Nenhuma notificação enviada ainda</p>
                  </div>
                ) : (
                  occurrences.filter(o => o.notificadoPai).map((occurrence) => (
                    <OccurrenceCard key={occurrence.id} occurrence={occurrence} />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 max-w-[414px] mx-auto">
        <div className="grid grid-cols-3">
          <button
            onClick={() => setActiveTab('estatisticas')}
            className={`flex flex-col items-center justify-center py-2 transition-colors ${
              activeTab === 'estatisticas' 
                ? 'text-green-700 bg-green-50' 
                : 'text-gray-500'
            }`}
          >
            <BarChart3 size={22} />
            <span className="text-[10px] mt-1">Estatísticas</span>
          </button>
          <button
            onClick={() => setActiveTab('ocorrencias')}
            className={`flex flex-col items-center justify-center py-2 transition-colors ${
              activeTab === 'ocorrencias' 
                ? 'text-green-700 bg-green-50' 
                : 'text-gray-500'
            }`}
          >
            <FileText size={22} />
            <span className="text-[10px] mt-1">Ocorrências</span>
          </button>
          <button
            onClick={() => setActiveTab('notificacoes')}
            className={`flex flex-col items-center justify-center py-2 transition-colors relative ${
              activeTab === 'notificacoes' 
                ? 'text-green-700 bg-green-50' 
                : 'text-gray-500'
            }`}
          >
            <Bell size={22} />
            <span className="text-[10px] mt-1">Notificações</span>
            {notificacoesPendentes > 0 && (
              <span className="absolute top-0.5 right-1/4 bg-red-600 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                {notificacoesPendentes}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Modal para adicionar ocorrência */}
      {showModal && (
        <AddOccurrenceModal
          students={students}
          teachers={teachers}
          currentUserId={user.id}
          currentUserName={user.nome}
          onClose={() => setShowModal(false)}
          onAdd={onAddOccurrence}
        />
      )}
    </div>
  );
}