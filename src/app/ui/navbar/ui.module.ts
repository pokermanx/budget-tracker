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
    NbThemeModule,
    NbOverlayModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddWalletComponent } from '../add-wallet/add-wallet.component';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';

@NgModule({
    declarations: [NavBarComponent, AddWalletComponent, ValidationMessagesComponent],
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
        RouterModule
    ],
    exports: [NavBarComponent, ValidationMessagesComponent],
    entryComponents: [AddWalletComponent]
})
export class UiModule {}
