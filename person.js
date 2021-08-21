const validator = {
  set(target, key, value) {
    if (key === "age") {
      if (!Number.isInteger(value)) {
        throw new TypeError(`${key} must be an integer`);
      }
      if (value > 200) {
        throw new RangeError(`the ${key} seems invalid`);
      }
    }

    target[key] = value;
    return true;
  },
};
const person = {};
const personProxy = new Proxy(person, validator);


personProxy.age = 100;

personProxy.age // 100
personProxy.age = 'young' // 报错
personProxy.age = 300 // 报错