import { NgModule } from '@angular/core';
import { BudgetsComponent } from './budgets-component/budgets.component';
import { BudgetsRoutingModule } from './budgets-routing.module';
import { CommonModule } from '@angular/common';
import { NbLayoutModule, NbListModule, NbCardModule, NbButtonModule, NbDialogModule, NbProgressBarModule } from '@nebular/theme';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { ShowActionsModule } from '../shared/show-option/show-options.module';

@NgModule({
    declarations: [BudgetsComponent],
    imports: [
        BudgetsRoutingModule,
        CommonModule,
        NbLayoutModule,
        NbListModule,
        NbCardModule,
        NbButtonModule,
        NbDialogModule,
        NbProgressBarModule,
        ShowActionsModule
    ],
    exports: [],
    entryComponents: []
})
export class BudgetsModule { }
