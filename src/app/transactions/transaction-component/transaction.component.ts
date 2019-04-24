import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})
export class TransactionsComponent implements OnInit {

    constructor(
        private transactionsService: TransactionsService
    ) { }

    ngOnInit() {
        this.transactionsService.getTransactionsList()
            .subscribe(res => console.log(res));
    }
}
