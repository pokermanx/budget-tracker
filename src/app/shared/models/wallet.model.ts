import { TransactionModel } from './transaction.model';

export class WalletModel {
    id: number;
    title: string;
    transactions: Array<TransactionModel>;
    budgets: Array<any>;
    balance: string;
    debts: Array<any>;
    categories: Array<any>;
    marks: Array<any>;
    lastExpanses: any;
    active: boolean;
}
