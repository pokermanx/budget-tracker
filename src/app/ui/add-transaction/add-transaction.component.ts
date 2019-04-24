import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Currency, CurrencySymbol } from 'src/app/shared/models/wallet.model';

@Component({
    selector: 'app-add-transaction',
    templateUrl: './add-transaction.component.html',
    styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

    sumForm: FormGroup;

    currencies = Currency;
    currencySymbols = CurrencySymbol;

    constructor() { }

    ngOnInit() {
        this.init();
    }

    init() {
        this.sumForm = new FormGroup({
            value: new FormControl(0),
            currency: new FormControl(1),
        });
    }
}
