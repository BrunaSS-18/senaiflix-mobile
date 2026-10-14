export interface FilmeDetalhes {
  id: string | number;
  nome: string;
  ano: number | string;
  duracao: string;
  classificacao?: string;
  descricao: string;
  genero: string;
  direcao: string;
  poster: string;
}

export async function BuscarFilme(id: string): Promise<FilmeDetalhes> {
  const response = await fetch(`http://10.0.2.2:3000/filmes/${id}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar o filme na API');
  }

  return response.json();
}

