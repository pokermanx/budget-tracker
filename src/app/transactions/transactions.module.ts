import { TransactionsComponent } from './transaction-component/transaction.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { NbDialogModule } from '@nebular/theme';

@NgModule({
    declarations: [
        TransactionsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NbDialogModule,
        TransactionsRoutingModule
    ],
})
export class TransactionsModule { }
