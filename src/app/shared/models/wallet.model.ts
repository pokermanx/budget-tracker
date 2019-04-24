import { TransactionModel } from './transaction.model';


// Starts from 1 due to angular treating 0 as null
export enum WalletPeriod {
    Day = 1,
    Week = 2,
    Month = 3,
    HalfAYear = 4,
    Year = 5,
    Forever = 6
}

export enum Currency {
    UAH = 1,
    RUB = 2,
    EUR = 3,
    USD = 4
}

export enum CurrencySymbol {
    '₴' = 1,
    '₽' = 2,
    '€' = 3,
    '$' = 4
}

export class WalletModel {
    id: number;
    period: WalletPeriod;
    title: string;
    lastExpanses: any;
    balance: string;
    currency: Currency;
    active: boolean;
}
