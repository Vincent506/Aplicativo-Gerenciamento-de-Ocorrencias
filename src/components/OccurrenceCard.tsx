import { Calendar, User, BookOpen, AlertCircle } from 'lucide-react';
import { Occurrence } from '../App';

interface OccurrenceCardProps {
  occurrence: Occurrence;
  hideStudentName?: boolean;
}

export function OccurrenceCard({ occurrence, hideStudentName }: OccurrenceCardProps) {
  const categoryColors = {
    leve: 'bg-green-50 border-green-300 text-green-800',
    mediana: 'bg-yellow-50 border-yellow-300 text-yellow-800',
    grave: 'bg-red-50 border-red-300 text-red-800',
    gravissima: 'bg-purple-50 border-purple-400 text-purple-900',
  };

  const categoryLabels = {
    leve: 'Leve',
    mediana: 'Mediana',
    grave: 'Grave',
    gravissima: 'Gravíssima',
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start gap-3 mb-3">
        <span className={`inline-block px-3 py-1 rounded-full border-2 text-sm ${categoryColors[occurrence.categoria]}`}>
          {categoryLabels[occurrence.categoria]}
        </span>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Calendar size={16} />
          <span>{formatDate(occurrence.data)}</span>
        </div>
      </div>

      {!hideStudentName && (
        <div className="flex items-center gap-2 text-gray-700 mb-2 text-sm">
          <User size={16} />
          <span className="truncate">{occurrence.alunoNome}</span>
        </div>
      )}

      <div className="flex items-center gap-2 text-gray-700 mb-3 text-sm">
        <BookOpen size={16} />
        <span className="truncate">{occurrence.professorNome}</span>
      </div>

      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-gray-700 text-sm line-clamp-3 bg-transparent">{occurrence.descricao}</p>
      </div>

      {occurrence.notificadoPai && (
        <div className="mt-3 flex items-center gap-2 text-green-700">
          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          <span className="text-xs">Responsável notificado</span>
        </div>
      )}
    </div>
  );
}