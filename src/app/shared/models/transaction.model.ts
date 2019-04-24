export class TransactionModel {
    id: number;
    date: string;
    type: 'income' | 'outcome';
    value: string;
    description?: string;
    category: string;
    currency: string;
}
