import { Component } from '@angular/core';
import { WalletProvider } from 'src/app/shared/providers/wallet.provider';
import { WalletModel } from 'src/app/shared/models/wallet.model';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { TransactionModel } from 'src/app/shared/models/transaction.model';
import { SumPipe } from 'src/app/shared/pipes/sum.pipe';
import { ChartType } from 'chart.js';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

    isLoaded = false;

    currWallet: WalletModel;
    transactions: TransactionModel[];

    chartData: number[] = [0, 0];
    chartLabels = ['Income', 'Outgoing'];
    pieChartType: ChartType = 'pie';
    chartColors = [{
        backgroundColor: ['rgba(36, 222, 138)', 'rgba(255, 56, 106, 1)'],
        borderWidth: [0, 0]
    }];
    chartOptions = {
        legend: {
            position: 'left'
        }
    };

    constructor(
        private walletProvider: WalletProvider,
        private transactionsService: TransactionsService
    ) {
        walletProvider.getWalletSub()
            .subscribe((wallet: WalletModel) => {
                this.currWallet = wallet;
                this.isLoaded = false;
                this.chartData = [0, 0];
                this.getStatisticsData();
            });
    }

    getStatisticsData() {
        this.transactionsService.getTransactionsList()
            .pipe(finalize(() => this.isLoaded = true))
            .subscribe((transactions: TransactionModel[]) => {
                transactions.map(transaction => {
                    if (transaction.type === 'income') {
                        this.chartData[0] += +transaction.value;
                    } else {
                        this.chartData[1] += +transaction.value;
                    }
                });
            });
    }
}
