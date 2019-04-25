import { Pipe, PipeTransform } from '@angular/core';
import { TransactionModel } from '../models/transaction.model';

@Pipe({
    name: 'sumPipe'
})

export class SumPipe implements PipeTransform {

    transform(value: TransactionModel[]) {
        return value.reduce((accum, el) => {
            return accum += +el.value;
        }, 0);
    }
}
