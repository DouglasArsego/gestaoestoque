import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categoriaId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly API = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.API}/${id}`);
  }

  criar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto);
  }

  atualizar(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.API}/${id}`, produto);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}