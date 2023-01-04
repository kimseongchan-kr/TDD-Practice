# 16장 드디어, 추상화

### 할 일

- [x] ~~$5 + 10CHF = $10(환율이 2:1일 경우)~~
- [x] ~~$5 + $5 = $10~~
- [ ] $5 + $5에서 Money 반환하기
- [x] ~~Bank.reduce(Money)~~
- [x] ~~Money에 대한 통화 변환을 수행하는 Reduce~~
- [x] ~~Reduce(Bank, String)~~
- [ ] Sum.plus
- [ ] Expression.times

<br>

- Expression에 plus() 정의해줬다.
- 따라서 Expression을 implements하고 있는 Sum에도 plus()를 구현해야 한다.
- 먼저 테스트 Sum.plus()의 테스트 코드를 작성해보자.

<br>

```javascript
test('다른 화폐끼리 더하기', () => {
  const fiveBucks = Money.dollar(5);
  const tenFrancs = Money.franc(10);

  const bank = new Bank();

  bank.addRate('CHF', 'USD', 2);

  const result = bank.reduce(fiveBucks.plus(tenFrancs), 'USD');

  expect(true).assertEquals(Money.dollar(10), result);
});
```

<br>

- 위 테스트 코드를 살펴보면 Money.plus()를 사용하는 것이 아닌 Sum을 생성하여 plus()를 실행하는 방식으로 되어있다.
- 해당 방식이 더 직접적이므로 내 코드를 읽는 개발자에게 나의 의도를 좀 더 쉽게 전달할 수 있다.

<br>

```javascript
// Sum
class Sum implements Expression {
  // ...

  plus(addend: Expression) {
    return new Sum(this, addend);
  }
}

// Money
class Money {
  // ...

  plus(object: Expression) {
    return new Sum(this, object);
  }
}
```

<br>

- 이제 Sum.plus()를 구현해보자.
- 스텁 코드를 지우고 코드를 작성해보니 Money.plus()와 같아졌다?!
- 일단 작업을 계속 진행해보자.

<br>

### 할 일

- [x] ~~$5 + 10CHF = $10(환율이 2:1일 경우)~~
- [x] ~~$5 + $5 = $10~~
- [ ] $5 + $5에서 Money 반환하기
- [x] ~~Bank.reduce(Money)~~
- [x] ~~Money에 대한 통화 변환을 수행하는 Reduce~~
- [x] ~~Reduce(Bank, String)~~
- [x] ~~Sum.plus~~
- [ ] Expression.times

<br>

- 작가는 TDD로 구현할 땐 테스트 코드와 모델 코드의 줄 수가 거의 비슷해야 한다고 한다.
- TDD가 경제적이기 위해서는 매일 만들어 내는 코드의 두 배가 되거나 동일한 기능을 구현하되 절반의 줄 수로 해내야 한다고 한다.
- 따라서 프로젝트에 TDD를 적용하기 앞서 개발자 본인이 TDD를 진행하면서 디버깅, 통합 작업, 다른 사람에게 설명하는 시간 등의 요소를 측정해봐야하고 고려해봐야 한다고 생각한다.

<br>

### 할 일

- [x] ~~$5 + 10CHF = $10(환율이 2:1일 경우)~~
- [x] ~~$5 + $5 = $10~~
- [ ] $5 + $5에서 Money 반환하기
- [x] ~~Bank.reduce(Money)~~
- [x] ~~Money에 대한 통화 변환을 수행하는 Reduce~~
- [x] ~~Reduce(Bank, String)~~
- [x] ~~Sum.plus~~
- [ ] **Expression.times**

<br>

- 이번엔 Expression.times()를 구현해야 한다.
- Expression.times()는 Sum.times()를 구현해서 작동된다면 어렵지 않게 정의할 수 있을 것이다.
- 먼저 테스트 코드를 작성하자.

<br>

```javascript
test('Sum.times 함수 테스트', () => {
  const fiveBucks: Expression = Money.dollar(5);
  const tenFrancs: Expression = Money.franc(10);
  const bank: Bank = new Bank();

  bank.addRate('CHF', 'USD', 2);

  const sum = new Sum(fiveBucks, tenFrancs).times(fiveBucks);
  const result = bank.reduce(sum, 'USD');

  expect(true).assertEquals(Money.dollar(20), result);
});
```

<br>

- 테스트 코드를 실행하면 당연히 times()가 없으므로 컴파일 오류가 발생한다.
- times()를 구현하자!

<br>

```javascript
class Sum implements Expression {
  time(multiplier: number) {
    return new Sum(this.augend.times(multiplier), this.addend.times(multiplier));
  }
}
```

<br>

- 이번에도 테스트 코드보다 길이가 길다.
- 해당 테스트 코드는 나중에 수정하기로 하고 계속 진행해보자.

<br>

- 위 코드를 작성했지만 오류가 발생하고 있다.
- augend, addend의 타입을 Expression로 전 장에서 변경해줬기 때문이다.
- 따라서 Expression에 times()를 정의하자.

<br>

```javascript
interface Expression {
  // ...
  times(multiplier: number): Expression;
}
```

<br>

- 테스트가 통과되었다!!

<br>

### 할 일

- [x] ~~$5 + 10CHF = $10(환율이 2:1일 경우)~~
- [x] ~~$5 + $5 = $10~~
- [ ] $5 + $5에서 Money 반환하기
- [x] ~~Bank.reduce(Money)~~
- [x] ~~Money에 대한 통화 변환을 수행하는 Reduce~~
- [x] ~~Reduce(Bank, String)~~
- [x] ~~Sum.plus~~
- [x] ~~Expression.times~~

<br>

- 이제 할 일 리스트의 마지막 작업인 $5 + $5에서 Money 반환하기를 실험해보자.
- 테스트 코드 먼저 작성하자.

<br>

```javascript
test('$5 + $5에서 Money 반환하기', () => {
  const sum = Money.dollar(1).plus(Money.dollar(1));
  expect(sum instanceof Money).toBe(true);
});
```

<br>

- 해당 코드는 비지니스 로직이 정상적으로 동작하는지 테스트하는 코드 임으로 좀 지저분하다.
- 하지만 해당 테스트 코드는 우리가 원하는 `$5 + $5에서 Money 반환하기`를 실험 해보기엔 충분하다.
- 테스트 코드를 실행해보니 빨간 막대가 보인다.

<br>

- 인자가 Money일 경우, 또 오로지 그 경우에만 인자의 통화를 확인하는 깔끔한 방법이 없고, 실험은 실패하였다.
- 해당 테스트 코드를 삭제하자.
- 일단 해당 작업을 마무리하고 이번 장에서 진행한 일들을 정리하자.

<br>

## 정리

- 미래에 코드를 읽은 다른 사람들을 염두에 둔 테스트를 작성했다.
- TDD와 여러분의 현재 개발 스타일을 비교해 볼 수 있는 실험 방법을 제시했다.
- 또 한 번 선언부에 대한 수정이 시스템 나머지 부분으로 번져갔고, 문제를 고치기 위해 역시 컴파일러의 조언을 따랐다.
- 잠시 실험을 시도했는데, 제대로 되지 않아서 버렸다.
