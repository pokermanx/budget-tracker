import { NgModule } from '@angular/core';
import { NavBarComponent } from './navbar.component';
import { NbLayoutModule, NbActionsModule, NbCardModule, NbButtonModule } from '@nebular/theme';

@NgModule({
    declarations: [NavBarComponent],
    imports: [
        NbLayoutModule,
        NbActionsModule,
        NbCardModule,
        NbButtonModule
    ],
    exports: [NavBarComponent]
})
export class UiModule {}
