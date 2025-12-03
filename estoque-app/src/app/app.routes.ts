import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';
import { LoginComponent } from './auth/login/login';
import { AuthCallbackComponent } from './auth//callback/callback';
import { ProdutoList } from './produtos/produto-list';
import { ProdutoForm } from './produtos/produto-form';
import { CategoriaList } from './categorias/categoria-list';
import { CategoriaForm } from './categorias/categoria-form';
import { MovimentacaoList } from './movimentacao/movimentacao-list';
import { MovimentacaoForm } from './movimentacao/movimentacao-form';



export const routes: Routes = [
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
  { path: 'produtos', component: ProdutoList, canActivate: [authGuard] },
  { path: 'produtos/novo', component: ProdutoForm, canActivate: [authGuard] },
  { path: 'produtos/:id', component: ProdutoForm, canActivate: [authGuard] },
  { path: 'categorias', component : CategoriaList, canActivate: [authGuard] },
  { path: 'categorias/novo', component : CategoriaForm, canActivate: [authGuard] },
  { path: 'categorias/editar/:id', component : CategoriaForm, canActivate: [authGuard] },
  { path: 'movimentacoes', component: MovimentacaoList, canActivate: [authGuard] },
  { path: 'movimentacoes/nova', component: MovimentacaoForm, canActivate: [authGuard] },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/callback', component: AuthCallbackComponent }

];