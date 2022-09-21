import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditDebitMask',
})
export class CreditDebitMaskPipe implements PipeTransform {
  transform(Cardnumber: string): unknown {
    let mask = Cardnumber.split('-').map((x) => x.replace(x, '****'));
    let visable = Cardnumber.split('-').pop();
    return mask.slice(0, 3).join('-') + '-' + visable;
  }
}
