export interface FilmeCatalogo {
  id: string | number;
  nome: string;
  ano: number | string;
  duracao: string;
  genero: string;
  poster: string;
}

export async function BuscarFilmes(): Promise<FilmeCatalogo[]> {

  const response = await fetch('http://10.92.201.130:3000/filmes');

  if (!response.ok) {
    throw new Error('Falha ao buscar a lista de filmes do catálogo');
  }

  const data = await response.json();
  return data;
}