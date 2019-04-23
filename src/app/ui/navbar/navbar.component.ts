import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { WalletModel } from 'src/app/shared/models/wallet.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

    myWallet: WalletModel;

    constructor(
        private walletService: WalletService
    ) {}

    ngOnInit() {
        this.walletService.getBalance().subscribe(res => {
            this.myWallet = res[0];
        });
    }
}
