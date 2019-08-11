import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { TransactionModel } from 'src/app/shared/models/transaction.model';
import { CategoriesProvider } from 'src/app/shared/providers/categories.provider';
import { WalletCategoriesModel } from 'src/app/shared/models/category.model';
import { CurrencySymbol, WalletModel } from 'src/app/shared/models/wallet.model';
import { finalize } from 'rxjs/operators';
import { WalletProvider } from 'src/app/shared/providers/wallet.provider';
import * as moment from 'moment';
import { zip } from 'rxjs';

@Component({
    selector: 'app-transactions',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss'],
})
export class TransactionsComponent {

    isLoaded = false;

    incomeTransactions: TransactionModel[];
    outgoingTransactions: TransactionModel[];

    walletCategories: any;
    currWallet: WalletModel;

    moment = moment;

    walletCurrency = CurrencySymbol;

    constructor(
        private transactionsService: TransactionsService,
        private categoriesProvider: CategoriesProvider,
        private walletProvider: WalletProvider
    ) {
        walletProvider.getWalletSub()
            .subscribe(wallet => {
                this.currWallet = wallet;
                this.init();
            });
    }

    init() {
        zip(
            this.categoriesProvider.loadWalletsCategories(),
            this.transactionsService.getTransactionsList()
        )
            .pipe(finalize(() => this.isLoaded = true))
            .subscribe(([categories, transactions]) => {

                this.walletCategories = categories;

                this.incomeTransactions = [];
                this.outgoingTransactions = [];
                transactions.map(transaction => {
                    if (transaction.type === 'income') {
                        this.incomeTransactions.unshift(transaction);
                    } else {
                        this.outgoingTransactions.unshift(transaction);
                    }
                });
            });
    }

    getColor(id: number, type: 'income' | 'outgoing') {
        const category = this.walletCategories.find(x => x._id === id);
        if (!category) {
            return '#ffffff';
        } else {
            return category.color;
        }
    }

    getCategory(id: number, type: 'income' | 'outgoing') {
        const category = this.walletCategories.find(x => x._id === id);
        if (!category) {
            return 'No Category';
        } else {
            return category.name;
        }
    }
}
