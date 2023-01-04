import './assertEquals';

import Money from '../src/Money';
import Bank from '../src/Bank';
import Sum from '../src/Sum';
import Expression from '../src/Expression';

test('화폐 곱셈 테스트', () => {
  const five = Money.dollar(5);

  expect(true).assertEquals(Money.dollar(10), five.times(2));
  expect(true).assertEquals(Money.dollar(15), five.times(3));
});

test('다중 화폐의 합 테스트', () => {
  const five = Money.dollar(5);
  const sum = five.plus(five);
  const bank = new Bank();
  const reduced = bank.reduce(sum, 'USD');
  expect(true).assertEquals(Money.dollar(10), reduced);
});

test('amount의 값과 인스턴스가 같은지 확인하는 테스트', () => {
  expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
  expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy();

  expect(Money.franc(5).equals(Money.dollar(5))).toBeFalsy();
});

test('인스턴스에 맞는 통화 문자열을 가지고 있는지 확인하는 테스트', () => {
  expect(Money.dollar(1).currency).toBe('USD');
  expect(Money.franc(1).currency).toBe('CHF');
});

test('plus()의 리턴 타입 체크 테스트', () => {
  const five = Money.dollar(5);
  const result = five.plus(five);
  const sum = result;
  expect(true).assertEquals(five, sum.augend);
  expect(true).assertEquals(five, sum.addend);
});

test('입력받은 Sum()으로 reduce로 환율 계산하기', () => {
  const sum = new Sum(Money.dollar(3), Money.dollar(4));
  const bank = new Bank();
  const result = bank.reduce(sum, 'USD');
  expect(true).assertEquals(Money.dollar(7), result);
});

test('입력받은 Money()로 reduce로 환율 계산하기', () => {
  const bank = new Bank();
  const result = bank.reduce(Money.dollar(1), 'USD');
  expect(true).assertEquals(Money.dollar(1), result);
});

test('다른 통화로 환율 계산하기', () => {
  const bank = new Bank();
  bank.addRate('CHF', 'USD', 2);
  const result = bank.reduce(Money.franc(2), 'USD');
  expect(true).assertEquals(Money.dollar(1), result);
});

test('USD에서 USD로 환전하면 1이 된다.', () => {
  expect(new Bank().rate('USD', 'USD')).toBe(1);
});

test('다른 화폐끼리 더하기', () => {
  const fiveBucks: Expression = Money.dollar(5);
  const tenFrancs: Expression = Money.franc(10);

  const bank = new Bank();

  bank.addRate('CHF', 'USD', 2);

  const result = bank.reduce(fiveBucks.plus(tenFrancs), 'USD');

  expect(true).assertEquals(Money.dollar(10), result);
});
