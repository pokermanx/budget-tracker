export class TransactionModel {
    id: number;
    date: string;
    type: 'income' | 'outgoing';
    value: string;
    description?: string;
    category: string;
    currency: string;
}
