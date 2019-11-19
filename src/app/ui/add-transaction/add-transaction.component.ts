import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbPosition } from '@nebular/theme';
import { NbTabsetComponent } from '@nebular/theme/components/tabset/tabset.component';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { WalletCategoriesModel } from 'src/app/shared/models/category.model';
import { TransactionModel } from 'src/app/shared/models/transaction.model';
import { Currency, CurrencySymbol } from 'src/app/shared/models/wallet.model';
import { CategoriesProvider } from 'src/app/shared/providers/categories.provider';
import { WalletProvider } from 'src/app/shared/providers/wallet.provider';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

export enum Tabs {
    outgoing,
    income
}

@Component({
    selector: 'app-add-transaction',
    templateUrl: './add-transaction.component.html',
    styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements AfterViewInit {

    transaction: TransactionModel;

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

    @ViewChild('tabsetRef') tabset: NbTabsetComponent;

    constructor(
        private categoriesProvider: CategoriesProvider,
        private transactionService: TransactionsService,
        private dialogRef: NbDialogRef<AddTransactionComponent>,
        private walletProvider: WalletProvider,
        private categoriesService: CategoriesService
    ) { }

    ngAfterViewInit() {
        this.init();
        this.categoriesProvider.loadWalletsCategories()
            .pipe(finalize(() => {
                this.isLoaded = true;
                if (this.transaction) {
                    this.patchForm();
                }
            }))
            .subscribe((res: WalletCategoriesModel[]) => {
                this.walletCategories = res;
            });
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

        if (this.transaction) {
            // @ts-ignore
            this.request._id = this.transaction._id;
            this.transactionService.updateTransaction(this.request)
                .subscribe(res => {
                    this.walletProvider.updateCurrentWallet().then(() => this.closeDialog(res));
                });
        } else {
            this.transactionService.addTransaction(this.request)
                .subscribe(() => {
                    this.walletProvider.updateCurrentWallet().then(() => this.closeDialog(true));
                });
        }
    }

    updateSelected(id: number, type: string) {
        if (type === 'outgoing') {
            this.selectedOItem = id;
        } else {
            this.selectedIItem = id;
        }
    }

    onTabChange(event) {
        if (event.tabTitle === 'Outgoings') {
            this.type = 'outgoing';
        } else {
            this.type = 'income';
        }
    }

    changeDate(type: number) {
        this.selectedDateTypeIdx = type;
        if (type === 0) {
            this.selectedDate = this.moment().subtract('1', 'day');
        } else if (type === 1) {
            this.selectedDate = this.moment();
        }
    }

    closeDialog(data) {
        this.dialogRef.close(data);
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

    private patchForm() {
        this.sumForm.patchValue(this.transaction);
        this.selectedDate = this.moment(this.transaction.date);
        this.description = this.transaction.description;
        this.type = this.transaction.type;
        if (this.type === 'outgoing') {
            this.request.category = this.selectedOItem;
            this.selectedOItem = this.transaction.category;
        } else {
            this.selectedIItem = this.transaction.category;
        }

    }
}
