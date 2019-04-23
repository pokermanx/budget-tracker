import { Injectable } from '@angular/core';
import { WalletModel } from '../models/wallet.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class WalletProvider {

    private currentWallet: WalletModel;

    constructor(
        private http: HttpClient
    ) { }

    getBalance() {
        return this.http.get<WalletModel[]>(`${environment.apiEndpoint}/wallets?active=true`);
    }

    getWallet() {
        return this.currentWallet;
    }

    changeCurrentWallet(wallet: WalletModel) {
        this.currentWallet = wallet;
    }

    init() {
        return new Promise((resolve, reject) => {
            this.getBalance()
                .subscribe((res: WalletModel[]) => {
                    [this.currentWallet] = res;
                    resolve(true);
                });
        });
    }
}
