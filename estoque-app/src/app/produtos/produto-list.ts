import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Produto, ProdutoService } from './produto';
import { FiltroPipe } from '../shared/filtro-pipe';
import { Categoria, CategoriaService } from '../categorias/categoria';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FiltroPipe],
  templateUrl: './produto-list.html'
})
export class ProdutoList {
  private produtoService = inject(ProdutoService);
  private categoriaService = inject(CategoriaService);

  produtos: Produto[] = [];
  categorias: Categoria[] = [];
  filtro = '';

  constructor() {
    this.carregarCategorias();
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe((dados) => {
      this.produtos = dados;
    });
  }

  carregarCategorias() {
    this.categoriaService.listar().subscribe((dados) => {
      this.categorias = dados;
    });
  }

  nomeCategoria(id: string): string {
    const categoria = this.categorias.find(c => c.id === id);
    return categoria ? categoria.nome : '—';
  }

  excluir(id: string) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deletar(id).subscribe(() => {
        this.carregarProdutos();
      });
    }
  }
}
