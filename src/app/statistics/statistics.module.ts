import { NgModule } from '@angular/core';
import { StatisticsComponent } from './statistics-component/statistics.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [StatisticsComponent],
    imports: [
        StatisticsRoutingModule,
        ChartsModule,
        CommonModule
    ],
    exports: []
})
export class StatisticsModule {}
