# 8장 객체 만들기

[ ] $5 + 10CHF = $10

[x] ~~~$5 x 2 = $10~~~

[x] ~~~Dollar 부작용?~~~

[ ] Money 반올림?

[x] ~~~equals()~~~

[ ] hashCode()

[ ] Equal null

[ ] Equal object

[x] ~~~5CHF x 2 = 10CHF~~~

[ ] Dollar/Franc 중복

[x] ~~~공용 equals~~~

[ ] 공용 times

[x] ~~~Franc과 Dollar 비교하기~~~

[ ] 통화?

---

- 5장에서 작업한 Franc 객체가 Dollar 객체와 중복이 발생했고, 7장에서 중복이 발생한 amount와 equals()를 제거했습니다.

```javascript
// Franc
class Franc extends Money {
  times(multiplier) {
    return new Franc(this.amount * multiplier);
  }
}

// Dollar
class Dollar extends Money {
  times(multiplier) {
    return new Dollar(this.amount * multiplier);
  }
}
```

- 두 times()를 보면 구현 코드가 똑같으므로 중복 코드입니다.
- 또 위 객체들은 많은 일을 하고 있지 않기 때문에 제거해도 괜찮아보입니다.
- 따라서 하위 클래스를 제거해도 괜찮아 보입니다.
  <br>
- 책에서는 "제거해도 괜찮아보이는 객체(?)" 같이 확신이 들지 않는 작업을 단계별로 작업하여 "제거해도 괜찮은 객체"라는 것을 확신 시켜줍니다.
- 첫 단계는 하위 클래스를 제거하기 위해 객체에 직집적인 참조를 줄여야 합니다.
- 또 객체에 직접적인 참조를 줄이기 위해 팩토리 메서드(factory method: 팩토리 패턴)를 도입합니다.

```javascript
test('달러 곱셈 테스트', () => {
  const five = Money.dollar(5);

  expect(true).assertEquals(new Dollar(10), five.times(2));
  expect(true).assertEquals(new Dollar(15), five.times(3));
});
```

- 먼저 위 같이 테스트 코드를 작성합니다.
- 테스트 코드를 실행하면 당연히 dollar()가 구현되어 있지 않기 때문에 Fail이 발생합니다.

```javascript
static dollar(amount) {
    return new Dollar(amount);
  }
```

- dollar()를 구현합니다.
- dollar()는 Dollar 객체를 반환합니다.

- 테스트를 돌려보면 Money에 times() 메소드가 없기 때문에 Fail이 발생합니다.

```javascript
if (this.times === undefined) {
  throw new TypeError('Must override method');
}
```

- 책에서는 times()를 아직 구현할 준비가 되어있지 않다고 하며, times()를 추상 클래스로 만들어 기존 객체가 가지고 있는 times() 오버라이딩할 수 있게 합니다.
- 덕분에 기존 객체가 가지고 있는 times()를 그대로 사용하게 되며, 테스트 실행하면 정상적으로 Pass됩니다!
- 변경한 펙토리 메서드가 테스트 코드를 통과했기 때문에 다른 곳에서도 사용할 수 있다는 근거가 생겼습니다.

```javascript
// before
test('달러 곱셈 테스트', () => {
  const five = Money.dollar(5);

  expect(true).assertEquals(new Dollar(10), five.times(2));
  expect(true).assertEquals(new Dollar(15), five.times(3));
});

test('amount의 값과 인스턴스가 같은지 확인하는 테스트', () => {
  expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
  expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy();
  expect(new Franc(5).equals(new Franc(5))).toBeTruthy();
  expect(new Franc(5).equals(new Franc(6))).toBeFalsy();

  expect(new Franc(5).equals(new Dollar(5))).toBeFalsy();
});

// after
test('달러 곱셈 테스트', () => {
  const five = Money.dollar(5);

  expect(true).assertEquals(Money.dollar(10), five.times(2));
  expect(true).assertEquals(Money.dollar(15), five.times(3));
});

test('amount의 값과 인스턴스가 같은지 확인하는 테스트', () => {
  expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
  expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy();
  expect(new Franc(5).equals(new Franc(5))).toBeTruthy();
  expect(new Franc(5).equals(new Franc(6))).toBeFalsy();

  expect(new Franc(5).equals(Money.dollar(5))).toBeFalsy();
});
```

- 위와 같이 펙토리 메서드를 사용하도록 변경했습니다.
- 또 구조를 변경하면서 2가지의 이점이 생겼습니다.

  1. 클라이언트 코드가 Dollar라는 객체의 존재를 알지 못 합니다.
  2. (이 부분은 잘 이해하지 못했습니다.) 책에서는 하위 클래스(객체)의 존재를 테스트에서 분리함으로써 어떤 모델 코드에도 영향을 주지 않고 상속 구조를 마음대로 변경할 수 있게 되었다고 합니다.

  - 이 글을 제가 이해한 대로 정리하면 테스트 코드에서 직접적으로 인스턴스를 생성하는 부분(참조하는 부분)을 분리함으로써 Dollar 객체(모델 코드)의 상관 없이 상위 객체 Money의 구조를 마음대로 수정할 수 있게 되었다라고 이해했습니다.

- 이제 franc 객체를 직접적으로 참조하는 부분도 변경해야합니다.

```javascript
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
```

- 그런데 "프랑 곱셈 테스트" 로직을 살펴보면 "달러 곱셈 테스트"에서 검사하는 것과 동일하다는 것을 알 수 있습니다.
- 따라서 삭제해도 무방해 보이지만 예외 케이스가 발생할 수 있으니 남겨두고 할 일 리스트에 추가하기로 합니다.
  [ ] "프랑 곱셈 테스트"를 지워야 할까?

- 다시 돌아와서 Money에는 아직 franc()가 없기 때문에 테스트는 Fail이 발생합니다.

```javascript
static franc(amount) {
    return new Franc(amount);
  }
```

- franc()를 작업하고 테스트를 실행해보면 통과합니다!
- 다음 장에서는 이번 장에 제거하지 못한 times()를 작업할 예정입니다.

---

## 정리

- 동일한 메서드(times)의 두 변이형 메서드 서명부를 통일시킴으로써 중복 제거를 향해 한 단계 더 전진했다.
- 최소한 메서드 선언부만이라도 공통 상위 클래스(superclass)로 옮겼다.
- 팩토리 메서드를 도입하여 테스트 코드에서 콘크리트 하위 클래스의 존재 사실을 분리해냈다.
- 하위 클래스가 사라지면 몇몇 테스트는 불필요한 여분의 것이 된다는 것을 인식했다. 하지만 그냥 뒀다.

---

## 이번 장을 읽고 느낀 점

- 상당히 재미있는 챕터였습니다.
- TDD를 통해 구조를 변경하면서 해당 구조의 대한 확신을 얻고, 그 확신은 근거가 되어 다른 부분을 수정할 때 작업이 편리해지는 것을 느낄 수 있었습니다.
- 구조를 변경하기 전,후에 얻을 수 있는 이점을 글로 정리하는 버릇을 들이면 좋을 것 같다는 생각을 했습니다.
