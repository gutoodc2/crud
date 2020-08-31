import { UsuariosViewComponent } from './views/usuarios-view/usuarios-view.component';
import { VinculaViewComponent } from './views/vincula-view/vincula-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabelaViewComponent } from './views/tabela-view/tabela-view.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {path: "",component: HomeComponent},
  {path: "tabela",component: TabelaViewComponent},
  {path: "vincula",component: VinculaViewComponent},
  {path: "usuarios",component: UsuariosViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
