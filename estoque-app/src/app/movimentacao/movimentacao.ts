import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movimentacao {
  id?: number;
  tipo: 'entrada' | 'saida';
  produtoId: number;
  quantidade: number;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {
  private readonly API = 'http://localhost:3000/movimentacoes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Movimentacao[]> {
    return this.http.get<Movimentacao[]>(this.API);
  }

  buscarPorId(id: number): Observable<Movimentacao> {
    return this.http.get<Movimentacao>(`${this.API}/${id}`);
  }

  criar(movimentacao: Movimentacao): Observable<Movimentacao> {
    return this.http.post<Movimentacao>(this.API, movimentacao);
  }

  atualizar(id: number, movimentacao: Movimentacao): Observable<Movimentacao> {
    return this.http.put<Movimentacao>(`${this.API}/${id}`, movimentacao);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
