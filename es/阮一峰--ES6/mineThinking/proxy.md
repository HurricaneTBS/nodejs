## 概述

Proxy 是一种”元编程”，即对编程语言进行编程。
它还有一种作用，就是在目标对象之前架设一层“拦截”，外界对目标对象进行操作和访问的时候，都要先通过这层拦截。

举个例子来说明一下。

比如之前我们对对象的属性进行添加和访问是这样进行的：

```ts
const obj = {
  name: "Tom",
  age: 20,
  country: "Chine",
};

// 访问的name属性
obj.name; // Tom
// 给对象添加属性
obj.sex = "male";
```

这种操作非常常见，但是现在客户有了新的需求，不允许修改国籍。所以就需要在用户修改国籍的时候拦截这次操作。

这时候就需要用到`Proxy`，接下来对上面的代码进行修改：

```ts
const obj = {
  name: "Tom",
  age: 20,
  country: "China",
};

const proxy = new Proxy(obj, {
  get(target, propKey) {
    return target[propKey];
  },
  set(target, propKey) {
    if (propKey === "country") {
      console.log("不能对国家属性做修改");
      return;
    }
  },
});

console.log(proxy.name);
proxy.country = "美国"; // 不能对国家属性做修改
console.log(proxy.country); // China
```

上面的 Proxy 对象的第一个参数是要拦截的目标对象，第二个参数是拦截器。

这里我们只对 set 方法做了拦截，也就是当你执行`obj.xxx=xxx`的时候会拦截，拦截的逻辑是当设置属性`country`的时候，不允许设置。

不理解上面的代码没关系，后面会对 Proxy 进行详细解释。

## Proxy 语法

语法如下：

```ts
const proxy = new Proxy(target, handler);
```

- `target`：要拦截的目标对象
- `handler`：拦截器，可以定制拦截行为。

总而言之一句话，就是当你要修改或者获取 `target` 对象的属性时，要先走 `handler` 对象这层拦截器。

`Proxy`的核心内容是`handler`中的一些拦截行为，比如上面代码中的 `get`、`set` 就是其中的两个拦截行为。接下来我们要系统的学习一下它的 `13` 种拦截行为：

| 拦截行为                                  | 描述                                                                                                                                                                                                                               |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| get(target, propKey, receiver)            | 拦截对象属性的读取                                                                                                                                                                                                                 |
| set(target, propKey, value, receiver)     | 拦截对象属性的设置                                                                                                                                                                                                                 |
| has(target, propKey)                      | 拦截 propKey in proxy 的操作，返回一个布尔值                                                                                                                                                                                       |
| deleteProperty(target, propKey)           | 拦截 delete proxy[propKey]的操作，返回一个布尔值                                                                                                                                                                                   |
| ownKeys(target)                           | 拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。 |
| getOwnPropertyDescriptor(target, propKey) | 拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。                                                                                                                                                         |
| defineProperty(target, propKey, propDesc) | 拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。                                                                                                                 |
| preventExtensions(target)                 | 拦截 Object.preventExtensions(proxy)，返回一个布尔值。                                                                                                                                                                             |
| getPrototypeOf(target)                    | 拦截 Object.getPrototypeOf(proxy)，返回一个对象。                                                                                                                                                                                  |
| isExtensible(target)                      | 拦截 Object.isExtensible(proxy)，返回一个布尔值。                                                                                                                                                                                  |
| setPrototypeOf(target, proto)             | 拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。                                                                                                                       |
| apply(target, object, args)               | 拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)                                                                                                                              |
| construct(target, args)                   | 拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。                                                                                                                                                                   |

## get()

### get 拦截操作的基本使用

`get()`方法用于拦截读取属性的操作，三个参数分别为：

- `target`：目标对象
- `propKey`： 属性名
- `receiver`：（可选）`proxy` 实例本身

下面是一个拦截读取操作的例子：

```ts
const person = {
  name: "Tom",
};

const personHandler = {
  get(target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw ReferenceError(`属性名“${propKey}”不存在`);
    }
  },
};

const proxy = new Proxy(person, personHandler);

console.log(proxy.name); // Tom
console.log(proxy.age); // 抛出错误
```

通过拦截器可以在访问不到属性的时候抛出错误，如果没有拦截器，就只能返回 `undefined`。

### get 拦截操作的继承

`get` 方法可以被继承：

```ts
const target = {};
const handler = {
  get(target, propKey, receiver) {
    console.log(`GET ${propKey}`);
    return target[propKey];
  },
};
const proto = new Proxy(target, handler);

const obj = Object.create(proto);
console.log(obj.foo);
// GET foo
// undefined
```

`Object.create(proto);`相当于复制了一个`Proxy`对象给了`obj`，所以原本的`get`拦截操作也会被复制过来。

## set()

`set` 方法用来拦截某个属性的赋值操作，可以接受 4 个参数：

- `target`： 目标对象
- `propKey`： 属性名
- `value`：属性值
- `receiver`：Proxy 对象本身

下面的程序对年龄的设置做了一个拦截：
1. 年龄的值不是整数，不允许赋值
2. 年龄超过200不允许赋值

```ts
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
```