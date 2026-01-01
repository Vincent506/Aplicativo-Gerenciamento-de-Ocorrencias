import { GraduationCap, Mail, Shield, Beaker } from 'lucide-react';
import { useState } from 'react';

interface LoginSelectorProps {
  onSelectSUAP: () => void;
  onSelectEmail: () => void;
  onQuickLogin?: (email: string) => void;
}

export function LoginSelector({ onSelectSUAP, onSelectEmail, onQuickLogin }: LoginSelectorProps) {
  const [showTestMode, setShowTestMode] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-600 via-green-700 to-green-800 p-6">
      <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full">
        
        {/* Card principal */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full">
          
          {/* Logo e título */}
          <div className="flex flex-col items-center mb-10">
            <div className="text-center mb-2">
              <h1 className="text-gray-900 mb-1">Ocorrências IF</h1>
              <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-green-700 rounded-full mx-auto"></div>
            </div>
            <p className="text-gray-600 text-center text-sm mt-4">
              Escolha o tipo de acesso
            </p>
          </div>

          {/* Botões de seleção */}
          <div className="space-y-4">
            <button
              onClick={onSelectSUAP}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-2xl p-5 transition-all hover:shadow-xl group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="text-white" size={26} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white mb-0.5">Login com SUAP</h3>
                  <p className="text-white/80 text-sm">
                    Professores, coordenadores e alunos
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={onSelectEmail}
              className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-600 rounded-2xl p-5 transition-all hover:shadow-lg group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 group-hover:bg-green-600 rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
                  <Mail className="text-green-600 group-hover:text-white transition-colors" size={26} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-gray-900 mb-0.5">Login com E-mail</h3>
                  <p className="text-gray-600 text-sm">
                    Pais e responsáveis
                  </p>
                </div>
              </div>
            </button>

            {onQuickLogin && (
              <button
                onClick={() => setShowTestMode(!showTestMode)}
                className="w-full bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-2xl p-5 transition-all hover:shadow-lg group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 group-hover:bg-gray-400 rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
                    <Beaker className="text-gray-500 group-hover:text-white transition-colors" size={26} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-gray-900 mb-0.5">Modo de Teste</h3>
                    <p className="text-gray-600 text-sm">
                      Acesse rapidamente com e-mail de teste
                    </p>
                  </div>
                </div>
              </button>
            )}

            {showTestMode && onQuickLogin && (
              <div className="space-y-2">
                <button
                  onClick={() => onQuickLogin('joao@escola.com')}
                  className="w-full text-left px-3 py-2.5 bg-white hover:bg-green-50 border border-gray-200 rounded-lg transition-colors"
                >
                  <p className="text-xs text-gray-800">👨‍💼 Coordenador - João Silva</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">joao@escola.com</p>
                </button>

                <button
                  onClick={() => onQuickLogin('maria@escola.com')}
                  className="w-full text-left px-3 py-2.5 bg-white hover:bg-green-50 border border-gray-200 rounded-lg transition-colors"
                >
                  <p className="text-xs text-gray-800">👩‍🏫 Professor - Maria Santos</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">maria@escola.com</p>
                </button>

                <button
                  onClick={() => onQuickLogin('pedro@aluno.com')}
                  className="w-full text-left px-3 py-2.5 bg-white hover:bg-green-50 border border-gray-200 rounded-lg transition-colors"
                >
                  <p className="text-xs text-gray-800">🎒 Aluno - Pedro Oliveira</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">pedro@aluno.com</p>
                </button>

                <button
                  onClick={() => onQuickLogin('ana@responsavel.com')}
                  className="w-full text-left px-3 py-2.5 bg-white hover:bg-green-50 border border-gray-200 rounded-lg transition-colors"
                >
                  <p className="text-xs text-gray-800">👪 Responsável - Ana Costa</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">ana@responsavel.com</p>
                </button>
              </div>
            )}
          </div>

          {/* Versão */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-xs">
              Versão 1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}