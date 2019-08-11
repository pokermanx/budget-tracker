import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WalletModel } from '../models/wallet.model';
import { WalletProvider } from '../providers/wallet.provider';
import { mergeMap, map } from 'rxjs/operators';
import { CategoriesService } from './categories.service';
import { LastExpensesModel } from '../models/last-expanses.model';

@Injectable({
    providedIn: 'root'
})
export class WalletService {

    constructor(
        private http: HttpClient,
        private walletProvider: WalletProvider,
        private categoriesService: CategoriesService
    ) { }

    getWallets() {
        return this.http.get<WalletModel[]>(`${environment.apiEndpoint}/wallets?active=false`);
    }

    changeWallet(id: number) {
        return this.http.patch(`${environment.apiEndpoint}/wallets?id=${id}`, {});
    }

    addNewWallet(formValue) {
        const request = {
            period: formValue.period,
            title: formValue.title,
            lastExpenses: {},
            balance: 0,
            currency: formValue.currency,
            active: false
        };

        const categories = formValue.categories;

        return this.http.post(`${environment.apiEndpoint}/wallets`, request)
            // @ts-ignore
            .pipe(mergeMap((newWallet: WalletModel) => {
                return this.categoriesService.setWalletCategories(categories, newWallet._id, newWallet.title);
            }));
    }

    updateBalance(value: number, type: 'income' | 'outgoing') {
        const currWallet = this.walletProvider.getWallet();
        let balance = +currWallet.balance;
        if (type === 'income') {
            balance += +value;
        } else {
            balance -= +value;
        }

        return this.http.patch(`${environment.apiEndpoint}/wallets/${currWallet._id}`, {balance});
    }

    updateLastExpenses(lastExpenses: LastExpensesModel) {
        return this.http.patch<LastExpensesModel>(
                `${environment.apiEndpoint}/wallets/${this.walletProvider.getWallet()._id}`,
                {lastExpenses}
            );
    }
}
