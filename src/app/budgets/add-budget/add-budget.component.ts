import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WalletPeriod } from 'src/app/shared/models/wallet.model';

@Component({
    selector: 'app-add-budget',
    templateUrl: './add-budget.component.html',
    styleUrls: ['./add-budget.component.scss']
})
export class AddBudgetComponent implements OnInit {

    isLoaded = true;

    addBudgetForm: FormGroup;

    periods = WalletPeriod;

    constructor() {}

    ngOnInit() {
        this.init();
    }

    init() {
        this.addBudgetForm = new FormGroup({
            name: new FormControl(),
            value: new FormControl(),
            period: new FormControl(3),
            categories: new FormControl()
        });
    }
}
