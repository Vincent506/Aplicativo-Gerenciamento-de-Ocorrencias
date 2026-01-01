import { useState } from 'react';
import { LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, senha: string) => void;
  onSwitchToRegister: () => void;
}

export function Login({ onLogin, onSwitchToRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, senha);
  };

  const handleQuickLogin = (testEmail: string) => {
    setEmail(testEmail);
    setSenha('123456');
    onLogin(testEmail, '123456');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-green-700 rounded-full flex items-center justify-center mb-3">
            <LogIn className="text-white" size={28} />
          </div>
          <h1 className="text-gray-900 text-center text-xl">Sistema de Ocorrências</h1>
          <p className="text-gray-600 text-center mt-2 text-sm">Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2 text-sm">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-base"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-gray-700 mb-2 text-sm">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-base"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg transition-colors text-base"
          >
            Entrar
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-gray-600 text-sm">
            Não tem uma conta?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-green-700 hover:text-green-800"
            >
              Cadastre-se
            </button>
          </p>
        </div>

        <div className="mt-6 p-3 bg-green-50 rounded-lg">
          <p className="text-green-800 text-xs mb-2">Usuários de teste (senha: 123456):</p>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('joao@escola.com')}
              className="w-full text-left px-3 py-2 bg-white hover:bg-green-100 border border-green-200 rounded-lg transition-colors"
            >
              <p className="text-xs text-gray-700">• Coordenador</p>
              <p className="text-[10px] text-gray-500">joao@escola.com</p>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('maria@escola.com')}
              className="w-full text-left px-3 py-2 bg-white hover:bg-green-100 border border-green-200 rounded-lg transition-colors"
            >
              <p className="text-xs text-gray-700">• Professor</p>
              <p className="text-[10px] text-gray-500">maria@escola.com</p>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('pedro@aluno.com')}
              className="w-full text-left px-3 py-2 bg-white hover:bg-green-100 border border-green-200 rounded-lg transition-colors"
            >
              <p className="text-xs text-gray-700">• Aluno</p>
              <p className="text-[10px] text-gray-500">pedro@aluno.com</p>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('ana@responsavel.com')}
              className="w-full text-left px-3 py-2 bg-white hover:bg-green-100 border border-green-200 rounded-lg transition-colors"
            >
              <p className="text-xs text-gray-700">• Responsável</p>
              <p className="text-[10px] text-gray-500">ana@responsavel.com</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}