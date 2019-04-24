export class TransactionModel {
    id: number;
    walletId: number;
    date: string;
    type: 'income' | 'outgoing';
    value: string;
    description?: string;
    category: string;
    currency: string;
}
