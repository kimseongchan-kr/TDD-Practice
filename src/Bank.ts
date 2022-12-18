import Expression from './Expression';
import Money from './Money';

class Bank {
  reduce(source: Expression, to: string) {
    return source.reduce(to);
  }
}

export default Bank;
