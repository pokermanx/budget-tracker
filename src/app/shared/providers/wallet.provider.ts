import { Injectable } from '@angular/core';
import { WalletModel } from '../models/wallet.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';

@Injectable()
export class WalletProvider {

    private currentWallet: WalletModel;

    constructor(
        private http: HttpClient
    ) { }

    loadWallet() {
        return this.http.get<WalletModel[]>(`${environment.apiEndpoint}/wallets?active=true`);
    }

    getWallet() {
        return this.currentWallet;
    }

    changeCurrentWallet(wallet: WalletModel) {
        this.currentWallet = wallet;
    }

    updateCurrentWallet() {
        return new Promise((resolve, reject) => {
            this.loadWallet()
                .subscribe((res: WalletModel[]) => {
                    [this.currentWallet] = res;
                    resolve(true);
                });
        });
    }

    init() {
        return new Promise((resolve, reject) => {
            this.loadWallet()
                .subscribe((res: WalletModel[]) => {
                    [this.currentWallet] = res;
                    resolve(true);
                });
        });
    }
}
