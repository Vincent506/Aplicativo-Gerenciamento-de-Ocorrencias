import { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

interface LoginEmailProps {
  onLogin: (email: string, senha: string) => void;
  onBack: () => void;
  onSwitchToSUAP?: () => void;
  onForgotPassword?: () => void;
}

export function LoginEmail({ onLogin, onBack, onSwitchToSUAP, onForgotPassword }: LoginEmailProps) {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-600 via-green-700 to-green-800 p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        <span className="text-sm">Voltar</span>
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="text-center mb-6">
              <h1 className="text-gray-900 mb-1">Ocorrências IF</h1>
              <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-green-700 rounded-full mx-auto"></div>
            </div>
            <p className="text-gray-600 text-center text-sm">
              Login de Pais e Responsáveis
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2 text-sm">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none transition-all text-base"
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
                className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none transition-all text-base"
                placeholder="Digite sua senha"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-green-700 hover:text-green-800 transition-colors"
              >
                Esqueci minha senha
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-xl transition-all shadow-md hover:shadow-lg text-base"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onSwitchToSUAP}
              className="text-sm text-green-700 hover:text-green-800 transition-colors"
            >
              Voltar para login SUAP
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">
              Versão 1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}