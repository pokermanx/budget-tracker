import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { TransactionModel } from 'src/app/shared/models/transaction.model';
import { CategoriesProvider } from 'src/app/shared/providers/categories.provider';
import { WalletCategoriesModel } from 'src/app/shared/models/category.model';
import { CurrencySymbol, WalletModel } from 'src/app/shared/models/wallet.model';
import { finalize } from 'rxjs/operators';
import { WalletProvider } from 'src/app/shared/providers/wallet.provider';
import * as moment from 'moment';

@Component({
    selector: 'app-transactions',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss'],
})
export class TransactionsComponent implements OnInit {

    isLoaded = false;

    incomeTransactions: TransactionModel[];
    outgoingTransactions: TransactionModel[];

    walletCategories: WalletCategoriesModel;
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
                this.getCategories();
                this.getTransactions();
            });
    }

    ngOnInit() {
    }

    getTransactions() {
        this.incomeTransactions = [];
        this.outgoingTransactions = [];
        this.transactionsService.getTransactionsList()
            .pipe(finalize(() => this.isLoaded = true))
            .subscribe((res: TransactionModel[]) => {
                res.map(transaction => {
                    if (transaction.type === 'income') {
                        this.incomeTransactions.unshift(transaction);
                    } else {
                        this.outgoingTransactions.unshift(transaction);
                    }
                });
            });
    }

    getCategories() {
        this.categoriesProvider.loadWalletsCategories()
            .subscribe((res: WalletCategoriesModel[]) => {
                [this.walletCategories] = res;
            });
    }

    getColor(id: number, type: 'income' | 'outgoing') {
        if (+id === -1) {
            return '#ffffff';
        } else if (type === 'income') {
            return this.walletCategories.list.incomeCategories.find(x => +x.id === +id).color;
        } else {
            return this.walletCategories.list.outgoingCategories.find(x => +x.id === +id).color;
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
