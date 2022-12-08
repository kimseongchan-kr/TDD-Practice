import './assertEquals';

import Money from '../src/Money';

test('달러 곱셈 테스트', () => {
  const five = Money.dollar(5);

  expect(true).assertEquals(Money.dollar(10), five.times(2));
  expect(true).assertEquals(Money.dollar(15), five.times(3));
});

test('프랑 곱셈 테스트', () => {
  const five = Money.franc(5);

  expect(true).assertEquals(Money.franc(10), five.times(2));
  expect(true).assertEquals(Money.franc(15), five.times(3));
});

test('amount의 값과 인스턴스가 같은지 확인하는 테스트', () => {
  expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
  expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy();
  expect(Money.franc(5).equals(Money.franc(5))).toBeTruthy();
  expect(Money.franc(5).equals(Money.franc(6))).toBeFalsy();

  expect(Money.franc(5).equals(Money.dollar(5))).toBeFalsy();
});

test('인스턴스에 맞는 통화 문자열을 가지고 있는지 확인하는 테스트', () => {
  expect(Money.dollar(1).currency).toBe('USD');
  expect(Money.franc(1).currency).toBe('CHF');
});
