import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionModel } from '../models/transaction.model';
import { environment } from 'src/environments/environment';
import { WalletProvider } from '../providers/wallet.provider';
import { WalletService } from './wallet.service';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {

    constructor(
        private http: HttpClient,
        private walletProvider: WalletProvider,
        private walletService: WalletService
    ) {}

    getTransactionsList() {
        return this.http.get<TransactionModel[]>(`${environment.apiEndpoint}/wallets/${this.walletProvider.getWallet().id}/transactions`);
    }

    addTransaction(request: TransactionModel) {
        request.walletId = this.walletProvider.getWallet().id;
        return this.http.post(`${environment.apiEndpoint}/transactions`, request)
            // @ts-ignore
            .pipe(mergeMap((res: TransactionModel) => {
                return forkJoin(this.walletService.updateBalance(res.value, res.type), this.walletService.updateLastExpenses({
                    date: res.date,
                    value: res.value,
                    currency: res.currency,
                    category: res.category,
                    type: res.type
                }));
            }));
    }
}
