import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './ui/navbar/navbar.component';

const routes: Routes = [
  { path: '', component: NavBarComponent, children: [
    { path: 'transactions', loadChildren: '../app/transactions/transactions.module#TransactionsModule' }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
