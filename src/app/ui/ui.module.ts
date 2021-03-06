import { NgModule } from '@angular/core';
import { NavBarComponent } from './navbar/navbar.component';
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
    NbDatepickerModule,
    NbPopoverModule,
    NbProgressBarModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddWalletComponent } from './add-wallet/add-wallet.component';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { NbMomentDateModule } from '@nebular/moment';
import { ColorPickerModule } from 'ngx-color-picker';
import { AddBudgetComponent } from '../budgets/add-budget/add-budget.component';

@NgModule({
    declarations: [
        NavBarComponent,
        AddWalletComponent,
        ValidationMessagesComponent,
        AddTransactionComponent,
        AddBudgetComponent
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
        NbPopoverModule,
        ColorPickerModule,
        NbProgressBarModule,
        RouterModule
    ],
    exports: [NavBarComponent, ValidationMessagesComponent],
    entryComponents: [
        AddWalletComponent,
        AddTransactionComponent,
        // here due to lazy loading
        AddBudgetComponent
    ]
})
export class UiModule {}
