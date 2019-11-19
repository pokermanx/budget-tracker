import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { CategoryModel, WalletCategoriesModel } from 'src/app/shared/models/category.model';
import { WalletPeriod } from 'src/app/shared/models/wallet.model';
import { CategoriesProvider } from 'src/app/shared/providers/categories.provider';
import { BudgetService } from 'src/app/shared/services/budget.service';

@Component({
    selector: 'app-add-budget',
    templateUrl: './add-budget.component.html',
    styleUrls: ['./add-budget.component.scss']
})
export class AddBudgetComponent implements OnInit {

    isLoaded = true;

    addBudgetForm: FormGroup;
    categoriesList: CategoryModel[];

    periods = WalletPeriod;

    selectedItems = [-1];

    constructor(
        private categoriesProvider: CategoriesProvider,
        private dialogRef: NbDialogRef<AddBudgetComponent>,
        private budgetService: BudgetService
    ) { }

    ngOnInit() {
        this.init();
        this.getCategories();
    }

    init() {
        this.addBudgetForm = new FormGroup({
            name: new FormControl('', [
                Validators.required
            ]),
            value: new FormControl('', [
                Validators.required,
                Validators.pattern(/^[1-9][0-9]*$/)
            ]
            ),
            period: new FormControl(3),
        });
    }

    onSubmit() {
        this.budgetService.addNewBudget(this.addBudgetForm.value, this.selectedItems)
            .subscribe(() => this.closeDialog(true));
    }

    getCategories() {
        this.categoriesProvider.loadWalletsCategories()
            .subscribe((categories: any) => {
                this.categoriesList = categories.filter(el => {
                    return el.type === 'outgoing';
                });
            });
    }

    updateSelected(id: number) {
        console.log(this.selectedItems)
        if (id === -1) {
            this.selectedItems = [-1];
        } else if (this.selectedItems.includes(-1)) {
            this.selectedItems = [id];
        } else if (this.selectedItems.includes(id)) {
            this.selectedItems = this.selectedItems.filter(el => el !== id);
        } else {
            this.selectedItems.push(id);
        }
    }

    closeDialog(status: boolean) {
        this.dialogRef.close(status);
    }
}
