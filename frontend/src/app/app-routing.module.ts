import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabelaViewComponent } from './views/tabela-view/tabela-view.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {path: "",component: HomeComponent},
  {path: "tabela",component: TabelaViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
