import { useState } from 'react';
import { Login } from './components/Login';
import { LoginSelector } from './components/LoginSelector';
import { LoginSUAP } from './components/LoginSUAP';
import { LoginEmail } from './components/LoginEmail';
import { Register } from './components/Register';
import { CoordinatorDashboard } from './components/CoordinatorDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { ParentDashboard } from './components/ParentDashboard';

export type UserType = 'coordenador' | 'professor' | 'aluno' | 'responsavel';

export type OccurrenceSeverity = 'leve' | 'mediana' | 'grave' | 'gravissima';

export interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: 'coordenador' | 'professor' | 'aluno' | 'responsavel';
  alunoId?: string; // Para responsáveis, ID do aluno vinculado
}

export interface Occurrence {
  id: string;
  alunoId: string;
  alunoNome: string;
  professorId: string;
  professorNome: string;
  categoria: OccurrenceSeverity;
  descricao: string;
  data: string;
  notificadoPai: boolean;
}

// Dados mockados
const mockUsers: User[] = [
  { id: '1', nome: 'João Silva', email: 'joao@escola.com', senha: '123456', tipo: 'coordenador' },
  { id: '2', nome: 'Maria Santos', email: 'maria@escola.com', senha: '123456', tipo: 'professor' },
  { id: '3', nome: 'Pedro Oliveira', email: 'pedro@aluno.com', senha: '123456', tipo: 'aluno' },
  { id: '4', nome: 'Ana Costa', email: 'ana@responsavel.com', senha: '123456', tipo: 'responsavel', alunoId: '3' },
];

const mockOccurrences: Occurrence[] = [
  {
    id: '1',
    alunoId: '3',
    alunoNome: 'Pedro Oliveira',
    professorId: '2',
    professorNome: 'Maria Santos',
    categoria: 'leve',
    descricao: 'Esqueceu o material de aula',
    data: '2025-12-08',
    notificadoPai: true,
  },
  {
    id: '2',
    alunoId: '3',
    alunoNome: 'Pedro Oliveira',
    professorId: '2',
    professorNome: 'Maria Santos',
    categoria: 'mediana',
    descricao: 'Conversando durante a aula',
    data: '2025-12-07',
    notificadoPai: true,
  },
];

export default function App() {
  const [view, setView] = useState<'selector' | 'login-suap' | 'login-email' | 'register'>('selector');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [occurrences, setOccurrences] = useState<Occurrence[]>(mockOccurrences);

  const handleLogin = (email: string, senha: string) => {
    const user = users.find(u => u.email === email && u.senha === senha);
    if (user) {
      setCurrentUser(user);
    } else {
      alert('Usuário não encontrado');
    }
  };

  const handleQuickLogin = (email: string) => {
    handleLogin(email, '123456');
  };

  const handleRegister = (nome: string, email: string, senha: string, tipo: UserType, alunoId?: string) => {
    const newUser: User = {
      id: String(users.length + 1),
      nome,
      email,
      senha,
      tipo,
      alunoId,
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('selector');
  };

  const handleAddOccurrence = (occurrence: Omit<Occurrence, 'id'>) => {
    const newOccurrence: Occurrence = {
      ...occurrence,
      id: String(occurrences.length + 1),
    };
    setOccurrences([...occurrences, newOccurrence]);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[rgba(16,24,40,0)] flex items-center justify-center">
        <div className="w-full max-w-[430px] min-h-[932px] bg-white shadow-2xl">
          {view === 'selector' ? (
            <LoginSelector 
              onSelectSUAP={() => setView('login-suap')} 
              onSelectEmail={() => setView('login-email')}
              onQuickLogin={handleQuickLogin}
            />
          ) : view === 'login-suap' ? (
            <LoginSUAP 
              onLogin={handleLogin} 
              onBack={() => setView('selector')}
              onSwitchToEmail={() => setView('login-email')}
            />
          ) : view === 'login-email' ? (
            <LoginEmail 
              onLogin={handleLogin} 
              onBack={() => setView('selector')}
              onSwitchToSUAP={() => setView('login-suap')}
              onForgotPassword={() => alert('Funcionalidade em desenvolvimento')}
            />
          ) : (
            <Register 
              onRegister={handleRegister} 
              onSwitchToLogin={() => setView('selector')}
              students={users.filter(u => u.tipo === 'aluno')}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-[932px] bg-white shadow-2xl overflow-hidden">
        {currentUser.tipo === 'coordenador' && (
          <CoordinatorDashboard 
            user={currentUser} 
            occurrences={occurrences}
            students={users.filter(u => u.tipo === 'aluno')}
            teachers={users.filter(u => u.tipo === 'professor')}
            onLogout={handleLogout}
            onAddOccurrence={handleAddOccurrence}
          />
        )}
        {currentUser.tipo === 'professor' && (
          <TeacherDashboard 
            user={currentUser} 
            occurrences={occurrences}
            students={users.filter(u => u.tipo === 'aluno')}
            onLogout={handleLogout}
            onAddOccurrence={handleAddOccurrence}
          />
        )}
        {currentUser.tipo === 'aluno' && (
          <StudentDashboard 
            user={currentUser} 
            occurrences={occurrences.filter(o => o.alunoId === currentUser.id)}
            onLogout={handleLogout}
          />
        )}
        {currentUser.tipo === 'responsavel' && (
          <ParentDashboard 
            user={currentUser} 
            occurrences={occurrences.filter(o => o.alunoId === currentUser.alunoId)}
            studentName={users.find(u => u.id === currentUser.alunoId)?.nome || ''}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
}