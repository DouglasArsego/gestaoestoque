import { Routes } from '@angular/router';
import { ProdutoList } from './produtos/produto-list';
import { ProdutoForm } from './produtos/produto-form';
import { CategoriaList } from './categorias/categoria-list';
import { CategoriaForm } from './categorias/categoria-form';
import { MovimentacaoList } from './movimentacao/movimentacao-list';
import { MovimentacaoForm } from './movimentacao/movimentacao-form';


export const routes: Routes = [
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
  { path: 'produtos',component : ProdutoList },
  { path: 'produtos/novo', component : ProdutoForm },
  { path: 'produtos/editar/:id', component : ProdutoForm },
  { path: 'categorias', component : CategoriaList },
  { path: 'categorias/novo', component : CategoriaForm },
  { path: 'categorias/editar/:id', component : CategoriaForm },
  { path: 'movimentacoes', component: MovimentacaoList },
  { path: 'movimentacoes/nova', component: MovimentacaoForm }

];