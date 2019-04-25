import { NgModule } from '@angular/core';
import { SumPipe } from './sum.pipe';

@NgModule({
    declarations: [
        SumPipe
    ],
    imports: [],
    exports: [
        SumPipe
    ]
})

export class SharedPipesModule { }
