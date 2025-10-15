import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MovimentacaoService, Movimentacao } from './movimentacao';
import { ProdutoService, Produto } from '../produtos/produto';

@Component({
  selector: 'app-movimentacao-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './movimentacao-form.html'
})
export class MovimentacaoForm implements OnInit {
  private fb = inject(FormBuilder);
  private movimentacaoService = inject(MovimentacaoService);
  private produtoService = inject(ProdutoService);
  private router = inject(Router);

  form!: FormGroup;
  produtos: Produto[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      tipo: ['entrada', Validators.required],
      produtoId: [null, Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      data: [new Date().toISOString().substring(0, 10), Validators.required]
    });

    this.produtoService.listar().subscribe(produtos => this.produtos = produtos);
  }

  salvar() {
    if (this.form.invalid) return;

    const movimentacao: Movimentacao = this.form.value;

    // Atualiza o produto
    const produto = this.produtos.find(p => p.id === movimentacao.produtoId);
    if (!produto) {
      alert('Produto não encontrado!');
      return;
    }

    if (movimentacao.tipo === 'entrada') {
      produto.quantidade += movimentacao.quantidade;
    } else {
      if (produto.quantidade < movimentacao.quantidade) {
        alert('Quantidade insuficiente em estoque!');
        return;
      }
      produto.quantidade -= movimentacao.quantidade;
    }

    // Atualiza o produto e salva a movimentação
    this.produtoService.atualizar(produto.id!, produto).subscribe(() => {
      this.movimentacaoService.criar(movimentacao).subscribe(() => {
        alert('Movimentação registrada com sucesso!');
        this.router.navigate(['/movimentacoes']);
      });
    });
  }
}