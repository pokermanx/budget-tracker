import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { WalletPeriod, Currency } from 'src/app/shared/models/wallet.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { WalletCategoriesModel, CategoryModel } from 'src/app/shared/models/category.model';
import { finalize } from 'rxjs/operators';
import { WalletProvider } from 'src/app/shared/providers/wallet.provider';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { CategoriesProvider } from 'src/app/shared/providers/categories.provider';

@Component({
    selector: 'app-add-wallet',
    templateUrl: './add-wallet.component.html',
    styleUrls: ['./add-wallet.component.scss']
})
export class AddWalletComponent implements OnInit {

    isLoaded = false;

    walletForm: FormGroup;

    walletPeriod = WalletPeriod;
    currencies = Currency;

    defaultCategories: CategoryModel[];
    walletsCategories: WalletCategoriesModel[];

    constructor(
        private dialogRef: NbDialogRef<AddWalletComponent>,
        private categoriesService: CategoriesService,
        private walletProvider: WalletProvider,
        private categoriesProvider: CategoriesProvider,
        private walletService: WalletService
    ) {
        this.defaultCategories = categoriesProvider.getDefaultCategories();
    }

    ngOnInit() {
        this.init();
        this.getCategories();
    }

    getCategories() {
        this.categoriesService.getAllCategories()
            .pipe(finalize(() => this.isLoaded = true))
            .subscribe((arr: WalletCategoriesModel[]) => this.walletsCategories = arr);
    }

    init() {
        this.walletForm = new FormGroup({
            title: new FormControl(),
            period: new FormControl(3),
            currency: new FormControl(1),
            categories: new FormControl()
        });
    }

    onSubmit() {
        this.walletService.addNewWallet(this.walletForm.value)
            .subscribe((res: WalletCategoriesModel) => {
                this.walletService.changeWallet(res.walletId)
                    .subscribe(() => {
                        this.walletProvider.updateCurrentWallet()
                            .then(() => this.closeDialog(true));
                    });
            });
    }

    closeDialog(status: boolean) {
        this.dialogRef.close(status);
    }
}
