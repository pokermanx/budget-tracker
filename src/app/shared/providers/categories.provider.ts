import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryModel, WalletCategoriesModel } from '../models/category.model';
import { WalletProvider } from './wallet.provider';

@Injectable()
export class CategoriesProvider {

    private defaultCategories: CategoryModel[];

    constructor(
        private http: HttpClient,
    ) { }

    loadDefaultCategories() {
        return this.http.get<CategoryModel[]>(`${environment.apiEndpoint}/initialCategories`);
    }

    loadWalletsCategories() {
        return this.http.get(
            `${environment.apiEndpoint}/walletCategories`
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

            resolve(true);
            // this.loadDefaultCategories()
            //     .subscribe((categories: CategoryModel[]) => {
            //         this.defaultCategories = categories;
            //         resolve(true);
            //     });
        });
    }
}
