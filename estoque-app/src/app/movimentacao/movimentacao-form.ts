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
      // produtoId deve ser string (id do produto no Supabase)
      produtoId: [null, Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      // string no formato YYYY-MM-DD (compatível com Supabase 'date')
      data: [new Date().toISOString().substring(0, 10), Validators.required]
    });

    this.produtoService.listar().subscribe(produtos => this.produtos = produtos);
  }

  salvar() {
    if (this.form.invalid) return;

    const movimentacao: Movimentacao = this.form.value;

    // Encontrar o produto pelo id (string)
    const produto = this.produtos.find(p => p.id === movimentacao.produtoId);
    if (!produto) {
      alert('Produto não encontrado!');
      return;
    }

    // Ajuste de quantidade local (mantendo a lógica atual)
    const q = Number(movimentacao.quantidade) || 0;
    if (movimentacao.tipo === 'entrada') {
      produto.quantidade = Number(produto.quantidade) + q;
    } else {
      if (Number(produto.quantidade) < q) {
        alert('Quantidade insuficiente em estoque!');
        return;
      }
      produto.quantidade = Number(produto.quantidade) - q;
    }

    // Atualiza o produto e salva a movimentação
    // Observação: produto.id é string no Supabase
    this.produtoService.atualizar(produto.id!, produto).subscribe({
      next: () => {
        this.movimentacaoService.criar(movimentacao).subscribe({
          next: () => {
            alert('Movimentação registrada com sucesso!');
            this.router.navigate(['/movimentacoes']);
          },
          error: (err) => {
            // Se a criação da movimentação falhar, você pode querer reverter o ajuste local.
            // Para manter alteração mínima, apenas informamos o erro.
            console.error(err);
            alert('Erro ao registrar movimentação.');
          }
        });
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao atualizar o produto.');
      }
    });
  }
}