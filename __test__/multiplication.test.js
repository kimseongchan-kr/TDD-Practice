import './assertEquals';

import Dollar from '../src/Dollar';

test('곱셈 테스트', () => {
  const five = new Dollar(5);

  expect(true).assertEquals(new Dollar(10), five.times(2));
  expect(true).assertEquals(new Dollar(15), five.times(3));
});

test('같은 객체의 인스턴스인지 확인', () => {
  expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
  expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy();
});
