
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { supabase } from '../supabase.client';

export interface Produto {
  id?: string;           // IDs no Supabase são texto
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categoriaId: string;   // Também texto
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  listar(): Observable<Produto[]> {
    return from(
      supabase
        .from('produtos')
        .select('*')
        .order('nome', { ascending: true })
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []) as Produto[];
        })
    );
  }

  buscarPorId(id: string): Observable<Produto | null> {
    return from(
      supabase
        .from('produtos')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? null) as Produto | null;
        })
    );
  }

  criar(produto: Produto): Observable<Produto | null> {
    return from(
      supabase
        .from('produtos')
        .insert([produto])
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? null) as Produto | null;
        })
    );
  }

  atualizar(id: string, produto: Produto): Observable<Produto | null> {
    return from(
      supabase
        .from('produtos')
        .update(produto)
        .eq('id', id)
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? null) as Produto | null;
        })
    );
  }

  deletar(id: string): Observable<void> {
    return from(
      supabase
        .from('produtos')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) throw error;
          return;
        })
    );
  }
}
