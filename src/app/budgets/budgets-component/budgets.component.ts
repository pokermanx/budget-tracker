import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';
import { BudgetModel } from 'src/app/shared/models/budget.model';
import { CurrencySymbol, WalletModel } from 'src/app/shared/models/wallet.model';
import { WalletProvider } from 'src/app/shared/providers/wallet.provider';
import { BudgetService } from 'src/app/shared/services/budget.service';

import { AddBudgetComponent } from '../add-budget/add-budget.component';
import { WalletCategoriesModel } from 'src/app/shared/models/category.model';
import { CategoriesProvider } from 'src/app/shared/providers/categories.provider';

@Component({
    selector: 'app-budgets',
    templateUrl: './budgets.component.html',
    styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {

    isLoaded = false;

    budgetsList: BudgetModel[];
    currWallet: WalletModel;
    currencySymbols = CurrencySymbol;

    walletCategories: any;

    constructor(
        private categoriesProvider: CategoriesProvider,
        private dialogService: NbDialogService,
        private budgetServise: BudgetService,
        private walletProvider: WalletProvider,
    ) { }

    ngOnInit() {
        this.currWallet = this.walletProvider.getWallet();
        this.getBudgets();
        this.categoriesProvider.loadWalletsCategories()
            .subscribe((res: WalletCategoriesModel[]) => {
                this.walletCategories = res;
            });
    }

    getBudgets() {
        this.budgetServise.getAllWalletBudgets()
            .pipe(finalize(() => this.isLoaded = true))
            .subscribe(res => {
                this.budgetsList = res;
            });
    }

    addNewBudget() {
        setTimeout(() => {
            this.dialogService.open(AddBudgetComponent)
                .onClose.subscribe(() => {
                    this.getBudgets();
                });
        });
    }

    onDelete(budget: BudgetModel) {
        this.budgetServise.deleteBudget(budget.id).subscribe(res => {
            this.budgetsList = this.budgetsList.filter(el => el.id !== res.data);
        });
    }

    getColor(id) {
        return this.walletCategories.find(x => x.id === id).color;
    }

    getName(id) {
        return this.walletCategories.find(x => x.id === id).name;
    }

    getProgressBarValue(max, curr) {
        const percVal = Math.round(curr * 100 / max);
        return percVal > 100 ? 100 : percVal;
    }

    getProgressBarStatus(max, curr) {
        const value = this.getProgressBarValue(max, curr);
        if (value >= 80) {
            return 'danger';
        } else if (value >= 60) {
            return 'warning';
        } else if (value >= 40) {
            return 'info';
        } else {
            return 'success';
        }
    }
}
