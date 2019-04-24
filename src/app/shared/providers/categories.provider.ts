import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryModel, WalletCategoriesModel } from '../models/category.model';
import { WalletProvider } from './wallet.provider';

@Injectable()
export class CategoriesProvider {

    private defaultCategories: CategoryModel[];
    private walletCategories: WalletCategoriesModel;

    constructor(
        private http: HttpClient,
        private walletProvider: WalletProvider
    ) { }

    loadDefaultCategories() {
        return this.http.get<CategoryModel[]>(`${environment.apiEndpoint}/initialCategories`);
    }

    loadWalletsCategories() {
        return this.http.get<WalletCategoriesModel[]>(
            `${environment.apiEndpoint}/wallets/${this.walletProvider.getWallet().id}/walletCategories`
            );
    }

    // TODO

    // updateWalletsCategories() {

    // }

    getDefaultCategories() {
        return this.defaultCategories;
    }

    init() {
        return new Promise(resolve => {
            this.loadDefaultCategories()
                .subscribe((categories: CategoryModel[]) => {
                    this.defaultCategories = categories;
                    resolve(true);
                });
        });
    }
}
