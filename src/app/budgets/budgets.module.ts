import { NgModule } from '@angular/core';
import { BudgetsComponent } from './budgets-component/budgets.component';
import { BudgetsRoutingModule } from './budgets-routing.module';
import { CommonModule } from '@angular/common';
import { NbLayoutModule, NbListModule, NbCardModule, NbButtonModule } from '@nebular/theme';

@NgModule({
    declarations: [BudgetsComponent],
    imports: [
        BudgetsRoutingModule,
        CommonModule,
        NbLayoutModule,
        NbListModule,
        NbCardModule,
        NbButtonModule,
    ],
    exports: []
})
export class BudgetsModule { }
