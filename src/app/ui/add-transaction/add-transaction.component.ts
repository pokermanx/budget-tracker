import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Currency, CurrencySymbol } from 'src/app/shared/models/wallet.model';
import { WalletCategoriesModel } from 'src/app/shared/models/category.model';
import { CategoriesProvider } from 'src/app/shared/providers/categories.provider';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';
import { TransactionModel } from 'src/app/shared/models/transaction.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { NbDialogRef, NbPosition } from '@nebular/theme';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { WalletProvider } from 'src/app/shared/providers/wallet.provider';

@Component({
    selector: 'app-add-transaction',
    templateUrl: './add-transaction.component.html',
    styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

    isLoaded = false;

    moment = moment;

    sumForm: FormGroup;
    catName = new FormControl();

    selectedOItem = null;
    selectedIItem = null;

    request: any = {};

    selectedDate = this.moment();
    selectedDateTypeIdx = 1;
    type: 'income' | 'outgoing';
    description: string;

    currencies = Currency;
    currencySymbols = CurrencySymbol;
    walletCategories: WalletCategoriesModel[];

    popoverPos = NbPosition.BOTTOM;
    color = '#ffffff';

    constructor(
        private categoriesProvider: CategoriesProvider,
        private transactionService: TransactionsService,
        private dialogRef: NbDialogRef<AddTransactionComponent>,
        private walletProvider: WalletProvider,
        private categoriesService: CategoriesService
    ) {
        categoriesProvider.loadWalletsCategories()
            .pipe(finalize(() => this.isLoaded = true))
            .subscribe((res: WalletCategoriesModel[]) => {
                this.walletCategories = res;
            });
    }

    ngOnInit() {
        this.init();
    }

    init() {
        this.sumForm = new FormGroup({
            value: new FormControl(0, [
                Validators.required,
                Validators.pattern(/^[1-9][0-9]*$/)
            ]),
            currency: new FormControl(1),
        });
    }

    onSubmit() {
        this.request = {
            date: this.selectedDate.format(),
            type: this.type,
            value: this.sumForm.controls.value.value,
            description: this.description,
            currency: this.sumForm.controls.currency.value
        };
        if (this.type === 'outgoing') {
            this.request.category = this.selectedOItem;
        } else {
            this.request.category = this.selectedIItem;
        }

        this.transactionService.addTransaction(this.request)
            .subscribe(() => {
                this.walletProvider.updateCurrentWallet().then(() => this.closeDialog(true));
            });
    }

    updateSelected(id: number, type: string) {
        if (type === 'outgoing') {
            this.selectedOItem = id;
        } else {
            this.selectedIItem = id;
        }
    }

    onTabChange() {
        this.type = this.type === 'outgoing' ? 'income' : 'outgoing';
    }

    changeDate(type: number) {
        this.selectedDateTypeIdx = type;
        if (type === 0) {
            this.selectedDate = this.moment().subtract('1', 'day');
        } else if (type === 1) {
            this.selectedDate = this.moment();
        }
    }

    closeDialog(status: boolean) {
        this.dialogRef.close(status);
    }

    addCategory() {
        const category = {
            name: this.catName.value,
            color: this.color,
            type: this.type
        };

        this.categoriesService.addWalletCategory(category)
            .subscribe((res: WalletCategoriesModel) => {
                this.walletCategories.unshift(res);
            });
    }
}
