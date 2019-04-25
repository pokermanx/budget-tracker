import { Currency } from './wallet.model';

export class LastExpensesModel {
    date: string;
    value: number;
    currency: string;
    category: string;
    type: 'income' | 'outgoing';
}
