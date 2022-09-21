import { CreditDebitMaskPipe } from './credit-debit-mask.pipe';

describe('CreditDebitMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new CreditDebitMaskPipe();
    expect(pipe).toBeTruthy();
  });
});
