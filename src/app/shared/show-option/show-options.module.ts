import { NgModule } from '@angular/core';
import { ShowOptionsComponent, OptionsToShowDirective, ItemForActionsDirective } from './show-options.component';
import { CommonModule } from '@angular/common';
import { OptionsBackdropComponent } from './backdrop.component';

@NgModule({
    declarations: [
        ShowOptionsComponent,
        OptionsToShowDirective,
        ItemForActionsDirective,
        OptionsBackdropComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ShowOptionsComponent,
        OptionsToShowDirective,
        ItemForActionsDirective
    ],
    entryComponents: [
        OptionsBackdropComponent
    ]
})
export class ShowActionsModule { }
