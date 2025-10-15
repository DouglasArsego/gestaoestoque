import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Produto, ProdutoService } from './produto';
import { FiltroPipe } from '../shared/filtro-pipe';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FiltroPipe],
  templateUrl: './produto-list.html'
})
export class ProdutoList {
  private produtoService = inject(ProdutoService);
  produtos: Produto[] = [];
  filtro = '';

  constructor() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe((dados) => {
      this.produtos = dados;
    });
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deletar(id).subscribe(() => {
        this.carregarProdutos();
      });
    }
  }
}