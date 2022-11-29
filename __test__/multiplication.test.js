import Dollar from '../src/Dollar';

test('입력 달러 곱하기 환율', () => {
  const five = new Dollar(5);
  let product = five.times(2);

  expect(product.amount).toBe(10);

  product = five.times(3);
  expect(product.amount).toBe(15);
});

test('같은 객체의 인스턴스인지 확인', () => {
  expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
  expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy();
});
