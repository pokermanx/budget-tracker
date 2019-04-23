import { NgModule } from '@angular/core';
import { NavBarComponent } from './navbar.component';
import { NbLayoutModule, NbActionsModule, NbSortIconComponent } from '@nebular/theme';

@NgModule({
    declarations: [NavBarComponent],
    imports: [
        NbLayoutModule,
        NbActionsModule,
    ],
    exports: [NavBarComponent]
})
export class UiModule {}
