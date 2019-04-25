import { Injectable } from '@angular/core';
import { WalletModel } from '../models/wallet.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class WalletProvider {

    private currentWallet: BehaviorSubject<WalletModel>;

    constructor(
        private http: HttpClient
    ) { }

    loadWallet() {
        return this.http.get<WalletModel[]>(`${environment.apiEndpoint}/wallets?active=true`);
    }

    getWalletSub() {
        return this.currentWallet;
    }

    getWallet() {
        return this.currentWallet.getValue();
    }

    changeCurrentWallet(wallet: WalletModel) {
        this.currentWallet.next(wallet);
    }

    updateCurrentWallet() {
        return new Promise((resolve) => {
            this.loadWallet()
                .subscribe((res: WalletModel[]) => {
                    const [dec] = res;
                    this.currentWallet.next(dec);
                    resolve(true);
                });
        });
    }

    init() {
        return new Promise((resolve, reject) => {
            this.loadWallet()
                .subscribe((res: WalletModel[]) => {
                    const [dec] = res;
                    this.currentWallet = new BehaviorSubject<WalletModel>(dec);
                    resolve(true);
                });
        });
    }
}
