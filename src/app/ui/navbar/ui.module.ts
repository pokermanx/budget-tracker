import { NgModule } from '@angular/core';
import { NavBarComponent } from './navbar.component';
import {
    NbLayoutModule,
    NbActionsModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbDialogModule,
    NbInputModule,
    NbOverlayModule,
    NbTabsetModule,
    NbDatepickerModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddWalletComponent } from '../add-wallet/add-wallet.component';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';
import { TransactionsModule } from 'src/app/transactions/transactions.module';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { NbMomentDateModule } from '@nebular/moment';

@NgModule({
    declarations: [
        NavBarComponent,
        AddWalletComponent,
        ValidationMessagesComponent,
        AddTransactionComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NbLayoutModule,
        NbActionsModule,
        NbCardModule,
        NbButtonModule,
        NbSelectModule,
        NbDialogModule.forRoot(),
        NbInputModule,
        NbOverlayModule,
        NbTabsetModule,
        NbDatepickerModule,
        NbMomentDateModule,
        RouterModule
    ],
    exports: [NavBarComponent, ValidationMessagesComponent],
    entryComponents: [AddWalletComponent, AddTransactionComponent]
})
export class UiModule {}
