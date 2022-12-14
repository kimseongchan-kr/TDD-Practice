import { types } from '@babel/core';
import Expression from '../src/Expression';
import Money from '../src/Money';

declare global {
  namespace jest {
    interface Matchers<R> {
      assertEquals(object: Money, object2: Money | Expression): CustomMatcherResult;
    }
  }
}

const assertEquals = (boolean = true, object1: Money, object2: Money) => {
  if (typeof object1 !== 'object' || typeof object2 !== 'object') {
    throw new Error('오브젝트 타입이어야 합니다.');
  }

  if (boolean !== true) {
    throw new Error('expect()에 값을 담지 마세요.');
  }

  const pass = boolean === object1.equals(object2);

  if (pass) {
    return {
      message: () => '해당 오브젝트는 같습니다.',
      pass: true,
    };
  } else {
    return {
      message: () => '해당 오브젝트는 틀립니다.',
      pass: false,
    };
  }
};

expect.extend({
  assertEquals,
});
