export class TransactionModel {
    id: number;
    date: string;
    type: 'income' | 'outcome';
    value: string;
    description?: string;
    marks?: Array<any>;
    category: string;
    currency: string;
}
