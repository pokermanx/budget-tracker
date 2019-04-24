import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Currency, CurrencySymbol } from 'src/app/shared/models/wallet.model';
import { WalletCategoriesModel } from 'src/app/shared/models/category.model';
import { CategoriesProvider } from 'src/app/shared/providers/categories.provider';
import { detectChanges } from '@angular/core/src/render3';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'app-add-transaction',
    templateUrl: './add-transaction.component.html',
    styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

    isLoaded = false;

    moment = moment;

    sumForm: FormGroup;

    selectedOItem = -1;
    selectedIItem = -1;


    selectedDate = this.moment();
    selectedTypeIdx = 1;

    currencies = Currency;
    currencySymbols = CurrencySymbol;
    walletCategories: WalletCategoriesModel;

    constructor(
        private categoriesProvider: CategoriesProvider
    ) {
        categoriesProvider.loadWalletsCategories()
            .pipe(finalize(() => this.isLoaded = true))
            .subscribe((res: WalletCategoriesModel[]) => {
                [this.walletCategories] = res;
                console.log(this.walletCategories)
            });
    }

    ngOnInit() {
        this.init();
    }

    init() {
        this.sumForm = new FormGroup({
            value: new FormControl(0),
            currency: new FormControl(1),
        });
    }

    updateSelected(id: number, type: string) {
        if (type === 'outgoing') {
            this.selectedOItem = id;
        } else {
            this.selectedIItem = id;
        }
    }

    changeType(type: number) {
        this.selectedTypeIdx = type;
        if (type === 0) {
            this.selectedDate = this.moment().subtract('1', 'day');
        } else if (type === 1) {
            this.selectedDate = this.moment();
        }
    }
}
