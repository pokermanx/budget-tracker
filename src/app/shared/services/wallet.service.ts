import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WalletModel } from '../models/wallet.model';

@Injectable({
    providedIn: 'root'
})
export class WalletService {

    constructor(
        private http: HttpClient
    ) {}

    getBalance() {
        return this.http.get<WalletModel>(`${environment.apiEndpoint}/wallets`, {});
    }
}
