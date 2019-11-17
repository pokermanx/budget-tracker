import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionModel } from '../models/transaction.model';
import { environment } from 'src/environments/environment';
import { WalletService } from './wallet.service';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {

    constructor(
        private http: HttpClient,
        private walletService: WalletService
    ) { }

    getTransactionsList() {
        return this.http.get<TransactionModel[]>(`${environment.apiEndpoint}/transactions`);
    }

    addTransaction(request: TransactionModel) {
        return this.http.post(`${environment.apiEndpoint}/transactions`, request);
    }

    updateTransaction(request: TransactionModel) {
        return this.http.put(`${environment.apiEndpoint}/transactions`, request);
    }

    deleteTransaction(id: string) {
        return this.http.delete(`${environment.apiEndpoint}/transactions?id=${id}`);
    }
}
