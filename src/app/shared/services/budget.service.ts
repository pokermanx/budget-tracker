import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WalletProvider } from '../providers/wallet.provider';
import { BudgetModel } from '../models/budget.model';

@Injectable({
    providedIn: 'root'
})
export class BudgetService {

    constructor(
        private http: HttpClient,
        private walletProvider: WalletProvider
    ) {}

    addNewBudget(model, categories: number[]) {

        const cuurId = this.walletProvider.getWallet().id;

        const request = {
            walletId: cuurId,
            name: model.name,
            value: model.value,
            period: model.period,
            categories
        };

        return this.http.post<BudgetModel>(`${environment.apiEndpoint}/budgets/`, request);
    }
}
