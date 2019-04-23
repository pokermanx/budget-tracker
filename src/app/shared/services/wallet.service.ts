import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WalletModel } from '../models/wallet.model';
import { WalletProvider } from '../providers/wallet.provider';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WalletService {

    constructor(
        private http: HttpClient,
        private walletProvider: WalletProvider
    ) { }

    getWallets() {
        return this.http.get<WalletModel[]>(`${environment.apiEndpoint}/wallets?active=false`);
    }

    changeWalletStatus(id: number) {
        return this.http.patch(`${environment.apiEndpoint}/wallets/${this.walletProvider.getWallet().id}`, { active: false })
            .pipe(mergeMap(() => {
                return this.http.patch<WalletModel[]>(`${environment.apiEndpoint}/wallets/${id}`, { active: true })
                    // @ts-ignore
                    .pipe(map(res => [res] = res));
            })
        );
    }
}
