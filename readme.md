# 15장 바꾸기

### 할 일

- [ ] **$5 + 10CHF = $10(환율이 2:1일 경우)**
- [x] $5 + $5 = $10
- [ ] $5 + $5에서 Money 반환하기
- [x] Bank.reduce(Money)
- [x] Money에 대한 통화 변환을 수행하는 Reduce
- [x] Reduce(Bank, String)

<br>

- 드디어 **$5 + 10CHF = $10(환율이 2:1일 경우)**에 대한 테스트를 추가할 것이다.

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

- `expect(true).assertEquals(Money.dollar(10), result);`에서 테스트가 실패했다.
- result의 값이 10USD가 아닌 15USD가 나오고 있다.
- 따라서 우린 reduce()가 제대로 환율(축약)을 계산하고 있지 않다는걸 알 수 있다.
- 아래와 같이 reduce()에서 환율(축약)을 처리하도록 수정하자!

<br>

```javascript
class Sum implements Expression {
  // ...

  reduce(bank: Bank, to: string) {
    const amount = this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount;
    return new Money(amount, to);
  }
}
```

<br>

- 테스트가 통과되었다!
- 이제 Money를 조금씩 수정하여 Expression이어야 하는 부분을 옮겨줄 것이다.

> 책에서는 코드를 JAVA로 작성하고 있다. "다른 화폐끼리 더하기" 테스트 코드의 fiveBucks, tenFrancs 변수는 Expression이어야 하지만 컴파일 오류가 발생해 Money로 변경했다. 자바스크립트는 해당 오류가 발생하지 않는다.

- 먼저 피가산수와 가수를 Expression으로 취급할 것이고, 생성자의 인자도 Expression으로 변경한다.

<br>

```javascript
class Sum implements Expression {
  augend: Expression;
  addend: Expression;

  constructor(augend: Expression, addend: Expression) {
    this.augend = augend;
    this.addend = addend;
  }

  // ...
}
```

- Money쪽도 수정해주자 먼저 plus()의 인자를 Expression으로 취급할 수 있다.
- times()의 반환 값도 Expression일 수 있다.

```javascript
class Money {
  // ...

  times(multiplier: number) {
    return new Money(this.#amount * multiplier, this.#currency);
  }

  plus(object: Expression): Expression {
    return new Sum(this, object);
  }
}
```

- 이젠 Expression에 plus()를 추가해줘야한다!
- 또 새롭게 정의한 plus()를 Money와 Sum에 추가하자.
- Sum에는 일단 스텁 구현으로 진행하고 다음 할일에 추가하자.

<br>

```javascript
// Money
plus(object: Expression) {
    return new Sum(this, object);
  }

// Sum
plus(addend: Expression) {
  return null;
}
```

<br>

## 정리

- 원하는 테스트를 작성하고, 한 단계에 달성할 수 있도록 뒤로 물렀다.
- 좀더 추상적인 선언을 통해 가지에서 뿌리(애초에 테스트 케이스)로 일반화했다.
- 변경 후 (Expression fiveBucks), 그 영향을 받은 다른 부분들을 변경하기 위해 컴파일러의 지시를 따랐다.(Expression에 plus()를 추가하기 등등)
