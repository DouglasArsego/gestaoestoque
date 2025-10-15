import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoriaService, Categoria } from './categoria';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './categoria-form.html'
})
export class CategoriaForm implements OnInit {
  private fb = inject(FormBuilder);
  private categoriaService = inject(CategoriaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form!: FormGroup;
  id?: number;

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required]
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.categoriaService.buscarPorId(this.id).subscribe(categoria => {
        this.form.patchValue(categoria);
      });
    }
  }

  salvar() {
    if (this.form.invalid) return;

    const categoria: Categoria = this.form.value;

    if (this.id) {
      this.categoriaService.atualizar(this.id, categoria).subscribe(() => {
        alert('Categoria atualizada com sucesso!');
        this.router.navigate(['/categorias']);
      });
    } else {
      this.categoriaService.criar(categoria).subscribe(() => {
        alert('Categoria criada com sucesso!');
        this.router.navigate(['/categorias']);
      });
    }
  }
}