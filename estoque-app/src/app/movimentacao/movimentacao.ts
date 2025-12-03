
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { supabase } from '../supabase.client';

export interface Movimentacao {
  id?: string;                 // ← antes: number
  tipo: 'entrada' | 'saida';
  produtoId: string;           // ← antes: number
  quantidade: number;
  data: string;                // armazenando como string (ISO), Supabase aceita 'date'
}

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  listar(): Observable<Movimentacao[]> {
    return from(
      supabase
        .from('movimentacoes')
        .select('*')
        .order('data', { ascending: false })     // opcional: ordenar por data (mais recentes primeiro)
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []) as Movimentacao[];
        })
    );
  }

  buscarPorId(id: string): Observable<Movimentacao | null> {
    return from(
      supabase
        .from('movimentacoes')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? null) as Movimentacao | null;
        })
    );
  }

  criar(movimentacao: Movimentacao): Observable<Movimentacao | null> {
    return from(
      supabase
        .from('movimentacoes')
        .insert([movimentacao])
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? null) as Movimentacao | null;
        })
    );
  }

  atualizar(id: string, movimentacao: Movimentacao): Observable<Movimentacao | null> {
    return from(
      supabase
        .from('movimentacoes')
        .update(movimentacao)
        .eq('id', id)
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? null) as Movimentacao | null;
        })
    );
  }

  deletar(id: string): Observable<void> {
    return from(
      supabase
        .from('movimentacoes')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) throw error;
          return;
        })
    );
  }

  // (Opcional) Filtros que talvez você já use na lista:
  listarPorProduto(produtoId: string): Observable<Movimentacao[]> {
    return from(
      supabase
        .from('movimentacoes')
        .select('*')
        .eq('produtoId', produtoId)
        .order('data', { ascending: false })
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []) as Movimentacao[];
        })
    );
  }

  listarPorTipo(tipo: 'entrada' | 'saida'): Observable<Movimentacao[]> {
    return from(
      supabase
        .from('movimentacoes')
        .select('*')
        .eq('tipo', tipo)
        .order('data', { ascending: false })
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []) as Movimentacao[];
        })
    );
  }
}