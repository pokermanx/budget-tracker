import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-add-budget',
    templateUrl: './add-budget.component.html',
    styleUrls: ['./add-budget.component.scss']
})
export class AddBudgetComponent {

    isLoaded = true;

    addBudgetForm: FormGroup;

    constructor() {}

    init() {
        this.addBudgetForm = new FormGroup({
            name: new FormControl(),
            value: new FormControl(),
            period: new FormControl(),
            categories: new FormControl()
        });
    }
}
