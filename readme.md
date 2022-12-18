# 14장 바꾸기

### 할 일

- [ ] $5 + 10CHF = $10(환율이 2:1일 경우)
- [ ] $5 + $5 = $10
- [ ] $5 + $5에서 Money 반환하기
- [x] Bank.reduce(Money)
- [ ] **Money에 대한 통화 변환을 수행하는 Reduce**
- [ ] Reduce(Bank, String)

<br>

- 이번 장에는 달러를 프랑으로 바꾸는 작업을 진행할 것이다.
- 먼저 "2프랑이 있는데 이걸 달러로 바꾸고 싶다" 이 문장을 그대로 사용해서 테스트 코드로 변경해보았다.

<br>

```javascript
test('다른 통화로 환율 계산하기', () => {
  const bank = new Bank();
  bank.addRate('CHF', 'USD', 2);
  const result = bank.reduce(Money.franc(2), 'USD');
  expect.assertEquals(Money.dollar(1), result);
});
```

<br>

- 테스트를 돌려보면 addRate()가 없기 때문에 오류가 발생한다.
- addRate()에서는 위에서 설명한 대로 환율이 진행될 것이고, 환율은 복잡한 계산 대신 `프랑 / 2`로 퉁 치자

<br>

- 우리는 아래와 같이 코드를 작성해서 초록 막대를 볼 수 있다.

<br>

```javascript
// Money
reduce(to: string) {
  const rate = this.#currency === 'CHF' && to === 'USD' ? 2 : 1;
  return new Money(this.#amount / rate, to);
}

// money.test.js
test('다른 통화로 환율 계산하기', () => {
  const bank = new Bank();
  //bank.addRate('CHF', 'USD', 2);
  const result = bank.reduce(Money.franc(2), 'USD');
  expect.assertEquals(Money.dollar(1), result);
});
```

<br>

> 책에서는 addRate()를 주석 처리하지 않았지만 당장엔 addRate()가 구현되어 있지 않아 위 같이 수정해도 초록 막대를 볼 수 없기 때문에 주석 처리해줬습니다.

- 하지만 위 같이 처리하게 되면 Money가 환율 계산 `프랑 / 2`을 알게 된다!
- 우리는 환율에 대한 일을 Bank에서 주관하도록 클래스를 만들어줬다.
- 따라서 우리는 Bank.reduce()가 호출한 Expression.reduce() 인자에 Bank를 추가하여 Expression.reduce()가 호출될 때 Bank를 사용해 Bank에 있는 환율 로직을 사용할 수 있도록 만들 수 있다!

<br>

```javascript
// Bank
reduce(source: Expression, to: string) {
  return source.reduce(this, to);
}

// Expression
reduce(bank: Bank, to: string): unknown;

// Sum
reduce(bank: Bank, to: string) {
const amount = this.augend.amount + this.addend.amount;
return new Money(amount, to);
}

// Money
reduce(bank: Bank, to: string) {
const rate = this.#currency === 'CHF' && to === 'USD' ? 2 : 1;
return new Money(this.#amount / rate, to);
}

```

<br>

- 이제 Money에서 계산하고 있는 환율을 Bank에서 계산할 수 있게 되었다.

<br>

```javascript
// Bank
rate(from: string, to: string) {
  return from === 'CHF' && to === 'USD' ? 2 : 1;
}

// Money
reduce(bank: Bank, to: string) {
  const rate = bank.rate(this.#currency, to);
  return new Money(this.#amount / rate, to);
}
```

<br>

- 위 같이 수정을 진행했지만 데이터 2가 테스트 코드와 구현 코드에서 중복이 발생하고 있다.

```javascript
// money.test.js
bank.addRate('CHF', 'USD', 2);

// Bank
rate(from: string, to: string) {
  return from === 'CHF' && to === 'USD' ? 2 : 1;
}
```

- 따라서 우리는 환율표를 만들어 두 개의 통화가 입력되면 매핑된 환율을 가져오는 식으로 중복되는 "2"를 없앨 수 있을 것 같다.
- 이 환율표는 Object를 사용해서 만들 것이다.

> 책에서는 해쉬 테이블로 진행합니다.

<br>

- 먼저 해시 테이블의 키를 배열로 만들 수 있는지 테스트해보자.

> 여기서 놀랐던 건 프로젝트 작업을 진행할 때 console.log를 통해 생각한 코드가 잘 동작하는지 확인하곤 하는데, 이런 간단한 확인 또한 테스트 코드를 작성하여 테스트를 돌리는 것을 보고 감탄하였다.

```javascript
test('생성한 배열이 같은지 확인', () => {
  expect(new Array('abc') === new Array('abc')).toBe(true);
});
```

- 배열의 동치성 테스트가 실패하였기 때문에 객체로 만들어서 진행하려고 한다.

<br>

```javascript
class Pair {
  #from;
  #to;

  constructor(from: string, to: string) {
    this.#from = from;
    this.#to = to;
  }

  get key() {
    return [this.#from, this.#to].sort().join('');
  }
}
```

<br>

- 우리는 객체인 Pair를 키로 사용할 것이다.
- 현재 환율을 계산하는 로직을 만든 상태지만, 방식이 마음에 들지 않기 때문에 리팩토링을 진행하고 있다. (if문으로 통화를 비교하여 환율 계산 중)
- 따라서 리팩토링을 진행하고, 지금 잘 돌아가고 있는 테스트 코드를 실행했을 때 초록 막대가 뜬다면 성공적으로 리팩토링을 진행했다는 뜻이된다!
- 때문에 리팩토링 중에는 테스트 코드를 추가로 작성하지 않았다. 하지만 다른 사람과 프로그래밍 즉 페어 프로그래밍 중이거나 또는 로직이 복잡했다면 테스트 코드가 추가 되었을 것이다.

<br>

- 이제 환률를 저장할 공간이 필요하고, 마련한 공간에 환율을 설정할 수도 있어야 한다.
- 마지막으로 저장한 환율을 꺼내서 사용할 수 있어야한다.

<br>

```javascript
class Bank {
  #rates: Hashtable = {};

  // ...

  addRate(from: string, to: string, rate: number) {
    this.#rates[new Pair(from, to).key] = rate;
  }

  rate(from: string, to: string) {
    return this.#rates[new Pair(from, to).key];
  }
}
```

<br>

- 그런데 테스트를 실행해보면 오류가 발생한다.
- 확인해보니 USD에서 USD로 환율을 요청하면 1이 되어야한다.
- 위 사실을 일단 테스트 코드로 작성해두자.

<br>

```javascript
test('USD에서 USD로 환전하면 1이 된다.', () => {
  expect(new Bank().rate('USD', 'USD')).toBe(1);
});
```

<br>

- 일단 오류가 발생하지 않도록 같은 통화일 때 1이 반환되도록 수정하자.

<br>

```javascript
rate(from: string, to: string) {
  if (from === to) {
    return 1;
  }

  return this.#rates[new Pair(from, to).key];
}
```

<br>

- 다음 장에서는 $5 + 10CHF를 구현할 예정이다.

## 정리

- 필요할 거라고 생각한 인자를 빠르게 추가했다.
- 코드와 테스트 사이에 있는 데이터 중복을 끄집어냈다.
- 자바의 오퍼레이션에 대한 가정을 검사해보기 위한 테스트(testArray-Equals)를 작성했다.
- 별도의 테스트 없이 전용(private) 도우미(helper) 클래스를 만들었다.
- 리팩토링하다가 실수를 했고, 그 문제를 분리하기 위해 또 하나의 테스트를 작성하면서 계속 전진해 가기로 선택했다.
