import { NgModule } from '@angular/core';
import { NavBarComponent } from './navbar.component';
import { NbLayoutModule, NbActionsModule, NbCardModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [NavBarComponent],
    imports: [
        NbLayoutModule,
        NbActionsModule,
        NbCardModule,
        NbButtonModule,
        NbSelectModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [NavBarComponent]
})
export class UiModule {}
