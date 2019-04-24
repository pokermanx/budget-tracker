import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WalletCategoriesModel, CategoryModel } from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(
        private http: HttpClient,
    ) {}

    getAllCategories() {
        return this.http.get<WalletCategoriesModel[]>(`${environment.apiEndpoint}/walletCategories`);
    }

    setWalletCategories(categories: CategoryModel[], id: number, title: string) {
        const request = {
            walletId: id,
            title: title + ' Categories',
            list: categories
        };

        return this.http.post(`${environment.apiEndpoint}/walletCategories`, request);
    }
}
