import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { TransactionModel } from 'src/app/shared/models/transaction.model';
import { CategoriesProvider } from 'src/app/shared/providers/categories.provider';
import { WalletCategoriesModel } from 'src/app/shared/models/category.model';
import { CurrencySymbol } from 'src/app/shared/models/wallet.model';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-transactions',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})
export class TransactionsComponent implements OnInit {

    isLoaded = false;

    incomeTransactions = [];
    outgoingTransactions = [];

    walletCategories: WalletCategoriesModel;

    walletCurrency = CurrencySymbol;

    constructor(
        private transactionsService: TransactionsService,
        private categoriesProvider: CategoriesProvider
    ) { }

    ngOnInit() {
        this.getCategories();
        this.transactionsService.getTransactionsList()
            .pipe(finalize(() => this.isLoaded = true))
            .subscribe((res: TransactionModel[]) => {
                res.map(transaction => {
                    if (transaction.type === 'income') {
                        this.incomeTransactions.push(transaction);
                    } else {
                        this.outgoingTransactions.push(transaction);
                    }
                });
                console.log(this.incomeTransactions, this.outgoingTransactions)
            });
    }

    getCategories() {
        this.categoriesProvider.loadWalletsCategories()
            .subscribe((res: WalletCategoriesModel[]) => {
                [this.walletCategories] = res;
                console.log(this.walletCategories)
            });
    }

    getColor(id: number, type: 'income' | 'outgoing') {
        if (+id === -1) {
            return '#ffffff';
        } else if (type === 'income') {
            return this.walletCategories.list.incomeCategories.find(x => x.id === id).color;
        } else {
            return this.walletCategories.list.outgoingCategories.find(x => x.id === id).color;
        }
    }

    getCategory(id: number,  type: 'income' | 'outgoing') {
        if (+id === -1) {
            return 'No Category';
        } else if (type === 'income') {
            return this.walletCategories.list.incomeCategories.find(x => x.id === id).name;
        } else {
            return this.walletCategories.list.outgoingCategories.find(x => x.id === id).name;
        }
    }
}
