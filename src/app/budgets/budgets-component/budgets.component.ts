import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AddBudgetComponent } from '../add-budget/add-budget.component';
import { BudgetService } from 'src/app/shared/services/budget.service';
import { BudgetModel } from 'src/app/shared/models/budget.model';
import { finalize } from 'rxjs/operators';
import { CurrencySymbol, WalletModel } from 'src/app/shared/models/wallet.model';
import { WalletProvider } from 'src/app/shared/providers/wallet.provider';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { TransactionModel } from 'src/app/shared/models/transaction.model';

@Component({
    selector: 'app-budgets',
    templateUrl: './budgets.component.html',
    styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {

    isLoaded = false;

    budgetsList: BudgetModel[];
    currWallet: WalletModel;
    sumsList: any;

    currencySymbols = CurrencySymbol;

    constructor(
        private dialogService: NbDialogService,
        private budgetServise: BudgetService,
        private walletProvider: WalletProvider,
        private transactionsService: TransactionsService
    ) {
        this.currWallet = walletProvider.getWallet();
    }

    ngOnInit() {
        this.getTransactions();
        this.budgetServise.getAllWalletBudgets()
            .pipe(finalize(() => this.isLoaded = true))
            .subscribe(res => {
                this.budgetsList = res;
            });
    }

    getTransactions() {
        this.transactionsService.getTransactionsList()
            .subscribe(res => {
                this.sumsList = res.reduce((accum, el) => {
                    if (!accum[el.category]) {
                        accum[el.category] = +el.value;
                    } else {
                        accum[el.category] += +el.value;
                    }
                    return accum;
                }, {});
            });
    }

    addNewBudget() {
        setTimeout(() => {
            this.dialogService.open(AddBudgetComponent)
                .onClose.subscribe();
        });
    }

}
