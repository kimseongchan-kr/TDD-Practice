# 10장 흥미로운 시간

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
- [ ] Dollar/Franc 중복
- [x] ~~공용 equals~~
- [ ] 공용 times
- [x] ~~Franc과 Dollar 비교하기~~
- [ ] **통화?**
- [ ] "프랑 곱셈 테스트" 제거

<br>

- 하위 클래스를 제거하기 위해선 times()를 상위 클래스로 올려야한다.

```javascript
class Dollar extends Money {
  // ...

  times(multiplier) {
    return Money.dollar(super.amount * multiplier);
  }
}

class Franc extends Money {
  // ...

  times(multiplier) {
    return Money.franc(super.amount * multiplier);
  }
}
```

- 하지만 아직 times()의 구현이 동일하지 않기 때문에 상위 클래스로 올릴 수 없다.
- 당장 현 상황에서 두 메소드를 동일하게 만들 방법이 없기 때문에 다시 인스턴스를 생성하는 방식으로 변경하였다.
- 그리고 인스턴스가 생성될 때 currency는 생성자 함수에서 정해진 값을 할당 받기 때문에 아래와 같이 수정할 수 있다.

```javascript
class Dollar extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }

  times(multiplier) {
    return Money.dollar(super.amount * multiplier, super.currency);
  }
}

class Franc extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }

  times(multiplier) {
    return new Franc(super.amount * multiplier, super.currency);
  }
}
```

- 이제 Franc이 정말로 필요한지, Money로 대체해도 괜찮은지 알아야한다.
- Money로 변경하고 테스트 코드를 실행시켜 Money로 변경해도 괜찮은지 테스트 코드에게 물어보자!

```javascript
class Franc extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }

  times(multiplier) {
    return new Money(super.amount * multiplier, super.currency);
  }
}
```

- '프랑 곱셈 테스트'에 `expect(true).assertEquals(Money.franc(10), five.times(2));` 코드에서 에러가 발생했다.
- equals()를 확인해보니 인스턴스의 프로토타입을 비교하고 있다.
- 저자분은 빨간 막대인 상황에서 추가적인 테스트 코드를 작성할 수 없다고 한다.
- 따라서 초록 막대 상태로 돌아가 테스크 코드를 추가해야한다.

> 저자분도 위 같이 말씀하셨지만 때때로 빨간 막대인 상태에서 테스트 코드를 작성한다고 하신다!
> 우리가 배우면 안되니까...

```javascript
class Franc extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }

  times(multiplier) {
    return new Franc(super.amount * multiplier, super.currency);
  }
}
```

- 다시 초록 막대로 돌아왔다.
- 우리는 `new Franc(10, "CHF")`와 `Money(10, "CHF")`가 같아야 하지만, 테스트 코드에서 실패하였다.
- 이 토대로 테스트 코드를 작성해서 테스트 코드를 실행해보면 오류가 발생한다.

```javascript
test('두 인스턴스의 프로토타입이 같은지 확인', () => {
  expect(true).assertEquals(Money.franc(10), new Money(10, 'CHF'));
});
```

- times() 추상 메소드이기 때문에 Money에서 선언이 되어있지 않아 오류가 발생했다.

```javascript
class Money {
  // ...

  times() {
    return null;
  }

  // ...
}
```

- 다시 테스트를 돌려보니 역시 빨간 막대가 등장했다.
- equals() 코드는 프로토타입이 아닌 currency를 비교해야 한다.

```javascript
class Money {
  // ...

  equals(object) {
    const money = object;

    return this.#amount === money.amount && this.#currency === object.currency;
  }

  // ...
}

class Franc extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }

  times(multiplier) {
    return new Money(super.amount * multiplier, super.currency);
  }
}
```

- Franc.times()에도 Money를 반환하도록 변경하고 테스트 코드를 돌려보면 통과한다!
- 이제 Dollar에도 적용하자!

```javascript
class Dollar extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }

  times(multiplier) {
    return new Money(super.amount * multiplier, super.currency);
  }
}
```

- Dollar도 통과하였다.
- 이제 코드가 동일해졌으니 상위 클래스로 옮길 수 있다!

```javascript
class Money {
  times(multiplier) {
    return new Money(this.#amount * multiplier, this.#currency);
  }
}
```

- 이제 하위 클래스의 모든 기능을 상위 클래스로 옮겼다.
- 이 말은 더 이상 하위 클래스가 아무 동작도 하지 않는다는 뜻으로 드디어 이제 하위 클래스를 지울 수 있다!

<br>

## 정리

- 두 times()를 일치시키기 위해 그 메서드들이 호출하는 다른 메서드들을 인라인시킨 후 상수를 변수로 바꿔주었다.
- 단지 디버깅을 위해 테스트 없이 toString()을 작성했다.
  > 자바에서만 발생하는 오류로 인해 책에서는 toString()을 작성하였다.
  > 책에서는 화면에 나타는 결과를 확인하기 위해 디버그 출력만을 위해 toString()을 작성하였다.
  > 이 메소드가 잘 못 구현되어서 얻게될 리스트가 적고, 이미 빨간 막대인 상태에서 테스트 코드를 추가하지 않는 것이 좋아 toString을 작성하였다.
- Franc 대신 Money를 반환하는 변경을 시도한 뒤 그것이 잘 작동할지를 테스트가 말하도록 했다.
- 실험해본 걸 뒤로 물리고 또 다른 테스트를 작성했다. 테스트를 작동했더니 실험으로 제대로 작동했다.
