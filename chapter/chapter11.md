# 11장 모든 악의 근원

### 할 일

- [ ] $5 + 10CHF = $10
- [x] ~~$5 x 2 = $10~~
- [x] ~~Dollar 부작용?~~
- [ ] Money 반올림?
- [x] ~~equals()~~
- [ ] hashCode()
- [ ] Equal null
- [ ] Equal object
- [x] ~~5CHF x 2 = 10CHF~~
- [ ] **Dollar/Franc 중복**
- [x] ~~공용 equals~~
- [x] ~~공용 times~~
- [x] ~~Franc과 Dollar 비교하기~~
- [x] ~~통화?~~
- [ ] "프랑 곱셈 테스트" 제거

<br>

```javascript
class Dollar extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }
}

class Franc extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }
}
```

- 하위 클래스가 생성자 함수만 가지고 있다.
- 생성자 함수만 가지고 있는 하위 클래스는 필요 없기 때문에 이제 하위 클래스를 제거해도 괜찮다.

<br>

```javascript
class Money {
  // ...

  static dollar(amount) {
    return new Money(amount, 'USD');
  }

  static franc(amount) {
    return new Money(amount, 'CHF');
  }
}
```

- 이제 하위 클래스를 참조하는 것이 아니라 상위 클래스를 참조하도록 변경하였다.
- 더 이상 하위 클래스의 대한 참조가 남아 있지 않으므로 하위 클래스를 제거한다.
- 수정을 진행하고 테스트 코드를 실행해보면 성공하는 것을 확인할 수 있다.
  > '두 인스턴스의 프로토타입이 같은지 확인'을 책에서는 new Frans로 동치성 테스트를 진행해 오류가 발생하지만 저는 Money.franc으로 처리해 오류가 발생하지 않았습니다.

<br>

```javascript
test('amount의 값과 인스턴스가 같은지 확인하는 테스트', () => {
  expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
  expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy();

  expect(Money.franc(5).equals(Money.dollar(5))).toBeFalsy();
});
```

- 이제 테스트 코드도 한번 정리해보자.
- 동치성 테스트 쪽을 확인해보니 중복되는 테스트가 있으므로 제거해줍니다.
- 또한 이제 Money.dollar와 Money.franc가 더 이상 하위 클래스를 반환하지 않고 같은 클래스를 반환하므로 '두 인스턴스의 프로토타입이 같은지 확인' 테스트 코드도 제거하자.
- 위와 같은 이유로 `달러 곱셉 테스트`와 `프랑 곱셉 테스트`도 지워도 무방하다.

<br>

- 이제 클래스가 하나가 되었고, 덧셈을 다음 장부터 다루게 될 것 같다.

<br>

## 정리

- 하위 클래스의 속을 들어내는 걸 완료하고, 하위 클래스를 삭제했다.
- 기존의 소스 구조에서는 필요했지만 새로운 구조에서는 필요 없게 된 테스트를 제거했다.
