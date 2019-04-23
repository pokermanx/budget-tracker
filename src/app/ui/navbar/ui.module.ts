import { NgModule } from '@angular/core';
import { NavBarComponent } from './navbar.component';
import { NbLayoutModule, NbActionsModule, NbCardModule, NbButtonModule, NbSelectModule, NbDialogModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [NavBarComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NbLayoutModule,
        NbActionsModule,
        NbCardModule,
        NbButtonModule,
        NbSelectModule,
        NbDialogModule,
        RouterModule
    ],
    exports: [NavBarComponent]
})
export class UiModule {}
