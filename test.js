class Foo {
  #privateValue = 42;
  static getPrivateValue(foo) {
    return foo.#privateValue;
  }
}

console.log(Foo.getPrivateValue(new Foo())); // 42


class IncreasingCounter {
  #count = 0;
  get value() {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment() {
    this.#count++;
  }
  static getCount(foo){
    return foo.#count;
  }
}

const counter = new IncreasingCounter();

console.log(IncreasingCounter.getCount(counter)); // 42