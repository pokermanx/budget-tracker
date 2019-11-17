import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbLayoutModule, NbListModule } from '@nebular/theme';

import { SharedPipesModule } from '../shared/pipes/shared-pipes.module';
import { ShowActionsModule } from '../shared/show-option/show-options.module';
import { TransactionsComponent } from './transaction-component/transaction.component';
import { TransactionsRoutingModule } from './transactions-routing.module';

@NgModule({
    declarations: [
        TransactionsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NbLayoutModule,
        NbCardModule,
        NbListModule,
        SharedPipesModule,
        ShowActionsModule,
        TransactionsRoutingModule
    ],
})
export class TransactionsModule { }
