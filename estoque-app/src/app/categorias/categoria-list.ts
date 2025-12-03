
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Categoria, CategoriaService } from './categoria';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categoria-list.html'
})
export class CategoriaList {
  private categoriaService = inject(CategoriaService);
  categorias: Categoria[] = [];

  constructor() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categoriaService.listar().subscribe((dados) => {
      this.categorias = dados;
    });
  }

  excluir(id: string) {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categoriaService.deletar(id).subscribe(() => {
        this.carregarCategorias();
      });
    }
  }
}
