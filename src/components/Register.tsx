import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { UserType, User } from '../App';

interface RegisterProps {
  onRegister: (nome: string, email: string, senha: string, tipo: UserType, alunoId?: string) => void;
  onSwitchToLogin: () => void;
  students: User[];
}

export function Register({ onRegister, onSwitchToLogin, students }: RegisterProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState<UserType>('aluno');
  const [alunoId, setAlunoId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(nome, email, senha, tipo, tipo === 'responsavel' ? alunoId : undefined);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 to-green-900 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="text-white" size={32} />
          </div>
          <h1 className="text-gray-900 text-center">Criar Nova Conta</h1>
          <p className="text-gray-600 text-center mt-2">Preencha os dados abaixo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="nome" className="block text-gray-700 mb-2">
              Nome Completo
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
              placeholder="Seu nome"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-gray-700 mb-2">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label htmlFor="tipo" className="block text-gray-700 mb-2">
              Tipo de Usuário
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as UserType)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
              required
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
              <option value="coordenador">Coordenador</option>
              <option value="responsavel">Pai/Responsável</option>
            </select>
          </div>

          {tipo === 'responsavel' && (
            <div>
              <label htmlFor="alunoId" className="block text-gray-700 mb-2">
                Selecione o Aluno
              </label>
              <select
                id="alunoId"
                value={alunoId}
                onChange={(e) => setAlunoId(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
                required
              >
                <option value="">Selecione um aluno</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.nome}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg transition-colors"
          >
            Cadastrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-green-700 hover:text-green-800"
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
