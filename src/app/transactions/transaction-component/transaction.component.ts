import { Component } from '@angular/core';
import * as moment from 'moment';
import { zip } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TransactionModel } from 'src/app/shared/models/transaction.model';
import { CurrencySymbol, WalletModel } from 'src/app/shared/models/wallet.model';
import { CategoriesProvider } from 'src/app/shared/providers/categories.provider';
import { WalletProvider } from 'src/app/shared/providers/wallet.provider';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss'],
})
export class TransactionsComponent {

    isLoaded = false;

    incomeTransactions: TransactionModel[];
    outgoingTransactions: TransactionModel[];

    showOptions = {
        id: null,
        type: null,
    };

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

    setCurrent(id, type) {
        this.showOptions = {
            id, type
        };
    }

    onCollapseAll() {
        this.showOptions = {
            id: null,
            type: null,
        };
    }

    onEdit(transaction) {
        console.log(transaction)
    }
    onDelete(transaction) {
        this.transactionsService.deleteTransaction(transaction._id).subscribe((res: any) => {
            this.incomeTransactions = this.incomeTransactions.filter(el => el._id !== res.data);
            this.outgoingTransactions = this.outgoingTransactions.filter(el => el._id !== res.data);
        });
    }
}
