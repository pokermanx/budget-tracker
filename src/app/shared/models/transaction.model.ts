export class TransactionModel {
    _id: number;
    walletId: number;
    date: string;
    type: 'income' | 'outgoing';
    value: number;
    description?: string;
    category: string;
    currency: string;
}
