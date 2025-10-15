import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovimentacaoService, Movimentacao } from './movimentacao';
import { ProdutoService, Produto } from '../produtos/produto';

@Component({
  selector: 'app-movimentacao-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movimentacao-list.html'
})
export class MovimentacaoList implements OnInit {
  private movimentacaoService = inject(MovimentacaoService);
  private produtoService = inject(ProdutoService);

  movimentacoes: Movimentacao[] = [];
  produtos: Produto[] = [];

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.movimentacaoService.listar().subscribe(movs => {
      this.movimentacoes = movs;
    });

    this.produtoService.listar().subscribe(prods => {
      this.produtos = prods;
    });
  }

  getNomeProduto(id: number): string {
    const produto = this.produtos.find(p => p.id === id);
    return produto ? produto.nome : 'Produto não encontrado';
  }
}