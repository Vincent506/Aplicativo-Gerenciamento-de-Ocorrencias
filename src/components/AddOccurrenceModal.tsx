import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { User, Occurrence, OccurrenceSeverity } from '../App';

interface AddOccurrenceModalProps {
  students: User[];
  teachers: User[];
  currentUserId: string;
  currentUserName: string;
  onClose: () => void;
  onAdd: (occurrence: Omit<Occurrence, 'id'>) => void;
}

export function AddOccurrenceModal({ 
  students, 
  teachers, 
  currentUserId, 
  currentUserName,
  onClose, 
  onAdd 
}: AddOccurrenceModalProps) {
  const [alunoId, setAlunoId] = useState('');
  const [categoria, setCategoria] = useState<OccurrenceSeverity>('leve');
  const [descricao, setDescricao] = useState('');
  const [notificarPai, setNotificarPai] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const aluno = students.find(s => s.id === alunoId);
    if (!aluno) return;

    const occurrence: Omit<Occurrence, 'id'> = {
      alunoId,
      alunoNome: aluno.nome,
      professorId: currentUserId,
      professorNome: currentUserName,
      categoria,
      descricao,
      data: new Date().toISOString().split('T')[0],
      notificadoPai: notificarPai,
    };

    onAdd(occurrence);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl shadow-2xl w-full max-w-[414px] max-h-[85vh] overflow-y-auto">
        <div className="bg-green-700 text-white p-4 rounded-t-3xl flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-white text-base">Registrar Ocorrência</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-green-600 p-1.5 rounded-lg transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="aluno" className="block text-gray-700 mb-2 text-sm">
              Selecione o Aluno *
            </label>
            <select
              id="aluno"
              value={alunoId}
              onChange={(e) => setAlunoId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none text-base"
              required
            >
              <option value="">Escolha um aluno</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm">
              Categoria da Ocorrência *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCategoria('leve')}
                className={`px-3 py-3 rounded-lg border-2 transition-colors text-sm ${
                  categoria === 'leve'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                Leve
              </button>
              <button
                type="button"
                onClick={() => setCategoria('mediana')}
                className={`px-3 py-3 rounded-lg border-2 transition-colors text-sm ${
                  categoria === 'mediana'
                    ? 'bg-yellow-600 text-white border-yellow-600'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                Mediana
              </button>
              <button
                type="button"
                onClick={() => setCategoria('grave')}
                className={`px-3 py-3 rounded-lg border-2 transition-colors text-sm ${
                  categoria === 'grave'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                Grave
              </button>
              <button
                type="button"
                onClick={() => setCategoria('gravissima')}
                className={`px-3 py-3 rounded-lg border-2 transition-colors text-sm ${
                  categoria === 'gravissima'
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                Gravíssima
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="descricao" className="block text-gray-700 mb-2 text-sm">
              Descrição da Ocorrência *
            </label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none min-h-[100px] text-base resize-none"
              placeholder="Descreva o que aconteceu..."
              required
            />
          </div>

          <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
            <input
              type="checkbox"
              id="notificarPai"
              checked={notificarPai}
              onChange={(e) => setNotificarPai(e.target.checked)}
              className="w-5 h-5 mt-0.5 text-green-700 border-2 border-gray-300 rounded focus:ring-green-700 flex-shrink-0"
            />
            <label htmlFor="notificarPai" className="text-gray-700 flex-1 text-sm">
              Notificar o responsável sobre esta ocorrência
            </label>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white px-6 py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-base"
            >
              <Send size={18} />
              Registrar Ocorrência
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full px-6 py-3.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-base"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}