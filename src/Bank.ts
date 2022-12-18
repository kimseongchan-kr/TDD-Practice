import Expression from './Expression';
import Pair from './Pair';

interface Hashtable {
  [hashKey: string]: number;
}

class Bank {
  #rates: Hashtable = {};

  reduce(source: Expression, to: string) {
    return source.reduce(this, to);
  }

  addRate(from: string, to: string, rate: number) {
    this.#rates[new Pair(from, to).key] = rate;
  }

  rate(from: string, to: string) {
    if (from === to) {
      return 1;
    }

    return this.#rates[new Pair(from, to).key];
  }
}

export default Bank;
