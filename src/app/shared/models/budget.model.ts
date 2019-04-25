import { WalletPeriod } from './wallet.model';

export class BudgetModel {
    id: string;
    walletId: string;
    name: string;
    value: string;
    categories: number[];
    period: WalletPeriod;
}
