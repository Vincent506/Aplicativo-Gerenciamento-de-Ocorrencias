import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Ocorrencia {
  id_ocorr: number;
  data_hora: string;
  tipo: string;
  categoria: string;
  descricao: string;
  nivel: number;
}

export function ListaOcorrencias() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);

  useEffect(() => {
    api.get<Ocorrencia[]>('/ocorrencias')
      .then(response => setOcorrencias(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Ocorrências</h1>

      {ocorrencias.map(o => (
        <div key={o.id_ocorr}>
          <h3>{o.tipo}</h3>
          <p>{o.descricao}</p>
        </div>
      ))}
    </div>
  );
}
