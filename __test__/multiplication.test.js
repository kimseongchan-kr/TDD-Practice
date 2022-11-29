import Dollar from '../src/Dollar';

test('입력 달러 곱하기 환율', () => {
  const five = new Dollar(5);
  let product = five.amount(2);

  expect(product.amount).toBe(10);

  product = five.times(3);
  expect(five.amount).toBe(15);
});
