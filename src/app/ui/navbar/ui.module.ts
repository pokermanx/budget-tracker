import { NgModule } from '@angular/core';
import { NavBarComponent } from './navbar.component';
import { NbLayoutModule, NbActionsModule, NbCardModule, NbButtonModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [NavBarComponent],
    imports: [
        NbLayoutModule,
        NbActionsModule,
        NbCardModule,
        NbButtonModule,
        RouterModule
    ],
    exports: [NavBarComponent]
})
export class UiModule {}
