import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionModel } from '../models/transaction.model';
import { environment } from 'src/environments/environment';
import { WalletProvider } from '../providers/wallet.provider';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {

    constructor(
        private http: HttpClient,
        private walletProvider: WalletProvider
    ) {}

    getTransactionsList() {
        return this.http.get<TransactionModel[]>(`${environment.apiEndpoint}/wallets/${this.walletProvider.getWallet().id}/transactions`);
    }
}
