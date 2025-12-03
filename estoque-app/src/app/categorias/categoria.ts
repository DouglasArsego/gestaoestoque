
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { supabase } from '../supabase.client';

export interface Categoria {
  id?: string;  // IDs no Supabase são texto
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  listar(): Observable<Categoria[]> {
    return from(
      supabase
        .from('categorias')
        .select('*')
        .order('nome', { ascending: true })
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []) as Categoria[];
        })
    );
  }

  buscarPorId(id: string): Observable<Categoria | null> {
    return from(
      supabase
        .from('categorias')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? null) as Categoria | null;
        })
    );
  }

  criar(categoria: Categoria): Observable<Categoria | null> {
    return from(
      supabase
        .from('categorias')
        .insert([categoria])
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? null) as Categoria | null;
        })
    );
  }

  atualizar(id: string, categoria: Categoria): Observable<Categoria | null> {
    return from(
      supabase
        .from('categorias')
        .update(categoria)
        .eq('id', id)
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? null) as Categoria | null;
        })
    );
  }

  deletar(id: string): Observable<void> {
    return from(
      supabase
        .from('categorias')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) throw error;
          return;
        })
    );
  }
}
