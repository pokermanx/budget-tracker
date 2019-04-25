import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AddBudgetComponent } from '../add-budget/add-budget.component';

@Component({
    selector: 'app-budgets',
    templateUrl: './budgets.component.html',
    styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent {

    isLoaded = true;

    constructor(
        private dialogService: NbDialogService,
    ) {}

    addNewBudget() {
        setTimeout(() => {
            this.dialogService.open(AddBudgetComponent)
                .onClose.subscribe();
        });
    }

}
