import { TransactionsComponent } from './transaction-component/transaction.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { NbLayoutModule, NbCardModule, NbListModule } from '@nebular/theme';
import { SharedPipesModule } from '../shared/pipes/shared-pipes.module';

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
        TransactionsRoutingModule
    ],
})
export class TransactionsModule { }
