import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Produto, ProdutoService } from './produto';
import { FiltroPipe } from '../shared/filtro-pipe';
import { Categoria, CategoriaService } from '../categorias/categoria';
import { supabase } from '../supabase.client';

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

  // referencia ao input file escondido
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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


  abrirInputArquivo(produtoId: string) {
    const input = this.fileInput.nativeElement;

  
    input.dataset['produtoId'] = produtoId;

    input.value = ''; 
    input.click();    
  }

  async uploadImagem(event: Event, produtoIdFromRow?: string) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];


    const produtoId = produtoIdFromRow ?? input.dataset['produtoId'];

    if (!produtoId) {
      alert("Erro: ID do produto não encontrado.");
      return;
    }

   
    const filePath = `produtos/${produtoId}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

    // faz o upload
    const { data, error } = await supabase.storage
      .from('fotos')  
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error(error);
      alert("Erro ao enviar imagem: " + error.message);
    } else {
      console.log("Imagem enviada:", data);
      alert("Imagem enviada com sucesso!");
    }

    input.value = ''; 
  }
}
