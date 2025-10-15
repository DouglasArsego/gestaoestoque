import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ProdutoService, Produto } from './produto';
import { CategoriaService, Categoria } from '../categorias/categoria';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './produto-form.html'
})
export class ProdutoForm implements OnInit {
  private fb = inject(FormBuilder);
  private produtoService = inject(ProdutoService);
  private categoriaService = inject(CategoriaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form!: FormGroup;
  categorias: Categoria[] = [];
  id?: number;

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      preco: [0, [Validators.required, Validators.min(0)]],
      quantidade: [0, [Validators.required, Validators.min(0)]],
      categoriaId: [null, Validators.required]
    });

    this.categoriaService.listar().subscribe(categorias => this.categorias = categorias);

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.produtoService.buscarPorId(this.id).subscribe(produto => {
        this.form.patchValue(produto);
      });
    }
  }

  salvar() {
    if (this.form.invalid) return;

    const produto: Produto = this.form.value;

    if (this.id) {
      this.produtoService.atualizar(this.id, produto).subscribe(() => {
        alert('Produto atualizado com sucesso!');
        this.router.navigate(['/produtos']);
      });
    } else {
      this.produtoService.criar(produto).subscribe(() => {
        alert('Produto criado com sucesso!');
        this.router.navigate(['/produtos']);
      });
    }
  }
}