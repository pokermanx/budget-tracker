import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { WalletModel } from 'src/app/shared/models/wallet.model';
import { WalletProvider } from 'src/app/shared/providers/wallet.provider';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

    myWallet: WalletModel;
    wallets: WalletModel[];
    walletControl = new FormControl('');

    constructor(
        private walletProvider: WalletProvider,
        private walletService: WalletService
    ) {
        this.initControls();
    }

    initControls() {
        this.walletControl.valueChanges.subscribe(val => {
            this.walletService.changeWalletStatus(val)
                // @ts-ignore
                .subscribe((res: WalletModel) => {
                    this.walletProvider.changeCurrentWallet(res);
                    this.ngOnInit();
                });
        });
    }

    ngOnInit() {
        this.myWallet = this.walletProvider.getWallet();
        this.walletService.getWallets()
            .subscribe(res => {
                this.wallets = res;
            });
        console.log(this.myWallet)
    }
}
