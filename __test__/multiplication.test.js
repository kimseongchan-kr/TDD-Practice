import Dollar from '../src/Dollar';

test('5달러 곱하기 2', () => {
  const five = new Dollar(5);
  five.times(2);
  expect(five.amount).toBe(10);
});
