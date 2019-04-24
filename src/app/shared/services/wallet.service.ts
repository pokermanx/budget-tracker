import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WalletModel } from '../models/wallet.model';
import { WalletProvider } from '../providers/wallet.provider';
import { mergeMap, map } from 'rxjs/operators';
import { CategoriesService } from './categories.service';

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

    changeWalletStatus(id: number) {
        return this.http.patch(`${environment.apiEndpoint}/wallets/${this.walletProvider.getWallet().id}`, { active: false })
            .pipe(mergeMap(res => {
                console.log(res)
                return this.http.patch<WalletModel>(`${environment.apiEndpoint}/wallets/${id}`, { active: true });
            })
        );
    }

    addNewWallet(formValue) {
        const request = {
            period: formValue.period,
            title: formValue.title,
            lastExpanses: {},
            balance: 0,
            currency: formValue.currency,
            active: false
        };

        const categories = formValue.categories;

        return this.http.post(`${environment.apiEndpoint}/wallets`, request)
            // @ts-ignore
            .pipe(mergeMap((newWallet: WalletModel) => {
                return this.categoriesService.setWalletCategories(categories, newWallet.id, newWallet.title);
            }));
    }
}
