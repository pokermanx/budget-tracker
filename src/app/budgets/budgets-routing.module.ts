import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetsComponent } from './budgets-component/budgets.component';

const routes: Routes = [
    { path: '', component: BudgetsComponent },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BudgetsRoutingModule { }
