import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './ui/navbar/navbar.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'transactions', loadChildren: '../app/transactions/transactions.module#TransactionsModule' },
    { path: 'statistics', loadChildren: '../app/statistics/statistics.module#StatisticsModule' }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
