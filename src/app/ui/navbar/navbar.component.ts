import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { WalletModel, CurrencySymbol } from 'src/app/shared/models/wallet.model';
import { WalletProvider } from 'src/app/shared/providers/wallet.provider';
import { FormControl } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { AddWalletComponent } from '../add-wallet/add-wallet.component';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import * as moment from 'moment';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

    myWallet: WalletModel;
    wallets: WalletModel[];
    walletControl = new FormControl('');
    currencies = CurrencySymbol;

    moment = moment;

    constructor(
        private walletProvider: WalletProvider,
        private walletService: WalletService,
        private dialogService: NbDialogService,
    ) { }

    initControls() {
        this.walletControl.valueChanges.subscribe(val => {
            if (val) {
                this.walletService.changeWalletStatus(val)
                    // @ts-ignore
                    .subscribe(() => {
                        this.walletProvider.updateCurrentWallet()
                            .then(() => this.getWalletsList());
                    });
            }
        });
    }

    ngOnInit() {
        this.initControls();
        this.getWalletsList();
        this.walletProvider.getWalletSub()
            .subscribe((wallet: WalletModel) => {
                this.myWallet = wallet;
                console.log(this.myWallet);
            });
    }

    getWalletsList() {
        this.walletService.getWallets()
            .subscribe(res => {
                this.wallets = res;
            });
    }

    addNewWallet() {
        // seTimeout due to angular bug with change detection during view creation
        setTimeout(() => {
            this.dialogService.open(AddWalletComponent)
                .onClose.subscribe(status => {
                    if (status) {
                        this.getWalletsList();
                    }
                });
        });
    }

    addTransaction() {
        setTimeout(() => {
            this.dialogService.open(AddTransactionComponent)
                .onClose.subscribe();
        });
    }
}
