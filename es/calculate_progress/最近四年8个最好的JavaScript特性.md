每年，ECMA 都会发布带有新特性的新 JavaScript 版本。在本文中，我们将介绍过去四年中引入的最佳和最有用的特性。

## ES2018

### 剩余/展开属性

ES2015 中一个最有意思的特性是展开操作符。这个操作符简化了数组的复制和合并操作。你可以使用`...`操作符来替代`concat()`或者`slice()`方法。

```ts
const array1 = [10, 20, 30];
const array2 = [40, 50];
// array1和array2合并
const merge = [...array1, ...array2];
console.log(merge);
// 结果: [10, 20, 30, 40, 50]
```

`...`操作符也适用于对象：

```ts
const object = {
  a: 1,
  b: 2,
  c: 3,
};
const { a, ...x } = object;
// 结果:
// a = 1
// x = { b: 2, c: 3 }
```

> 上面的代码中`...`用于解构对象的剩余参数

```ts
const object1 = { a: 1, b: 2, c: 3 };
const object2 = { ...object1, z: 26 };
// 结果:
// obj2 ： { a: 1, b: 2, c: 3, z: 26 }
```

> 上面的代码中，`...`用于展开对象。

### Promise.prototype.finally()

`finally`类似于`try..catch`中的`finally`，意思就是不管返回的`Promise`是`resolve`还是`reject`，都会执行`finally`。

```ts
fetch("file.json")
  .then((data) => data.json())
  .catch((error) => console.error(error))
  .finally(() => console.log("finished"));
// 不管fetch的结果是什么，都会打印finished
```

## ES2019

### flat()

`flat()`方法能够将数组中的所有子元素铺平（但是仅限一层）：

这种可以铺平：

```ts
const arr = [1, 2, 3, [1, 2, 3]];
// 铺平后
const res = [1, 2, 3, 1, 2, 3];
```

这种不可以铺平(嵌套太深)：

```ts
const arr = [1, 2, 3, [1, 2, 3, [1, 2, 3]]];
// 不可以铺平
const res = [1, 2, 3, 1, 2, 3, [1, 2, 3]];
```

`flat()`代码演示：

```ts
const arr = ["a", "b", ["c", "d"]];
const flattened = arr.flat();
console.log(flattened);
// 结果: ["a", "b", "c", "d"]
```

该方法没有出来的时候，我们得使用`reduce()`或者`concat()`方法来实现数组铺平：

```ts
const arr = ["a", "b", ["c", "d"]];
const flattened = [].concat.apply([], arr);
// 或者
// const flattened =  [].concat(...arr);
console.log(flattened);
// 结果: ["a", "b", "c", "d"]
```

> concat.apply()解释：Array.prototype.concat.apply([1,2], [[3],[4]]) === [1,2,3,4]
> is equal to
> [1,2].concat([3],[4]) === [1,2,3,4]
> or in es2015
> [1,2].concat(...[[3],[4]]) === [1,2,3,4]

### Object.fromEntries()

Object 对象有一个方法，将键值对转换为数组形式，如：

```ts
const obj = {
  name: "sss",
  age: 23,
};

console.log(Object.entries(obj)); // [ [ 'name', 'sss' ], [ 'age', 23 ] ]
```

`Object.fromEntries()`就是将`[ [ 'name', 'sss' ], [ 'age', 23 ] ]`转换为对象形式：

```ts
const myArray = [
  ["one", 1],
  ["two", 2],
  ["three", 3],
];
const obj = Object.fromEntries(myArray);
console.log(obj);
// 结果: {one: 1, two: 2, three: 3}
```

## ES2020

### 链式操作

比如之前为了判断某个元素是否为`undefined`，需要这么来写：

```ts
let userAdmin = undefined;
if (
  payload &&
  payload.access &&
  payload.access.admin &&
  payload.access.admin[0]
) {
  userAdmin = payload.access.admin[0].user;
}
```

新的写法是这样来写的：

```ts
const payload = {
  access: {
    admin: [{ user: "sss" }],
  },
};

const userAdmin = payload?.access?.admin?.[0]?.user || "用户不存在";
console.log(userAdmin);
```

### ??操作符

```ts
console.log(0 ?? true); // 0
console.log(0 || true); // true
console.log("" ?? "Hello World!"); // ''
console.log("" || "Hello World!"); // 'Hello World!'
console.log(false ?? true); // false
console.log(false || true); // true
console.log(NaN ?? 5); // Nan
console.log(NaN || 5); // 5
console.log(null ?? true); // true
console.log(null || true); // true
```

通过代码可以看出，只有当前面的值为`null`，`??`将它判断为`false`。但是`||`会将`0`, `undefined`, `null`, `false`, `NaN`都当做是`false`。

## ES2021

### String.prototype.replaceAll

`replace` 只会替换第一个找到的值，`replaceAll` 会替换所有。

**replace**

```ts
let string = "Wow, he doesn't like Porsche? I guess he must be crazy!";
string.replace("he", "she");
// 结果: "Wow, she doesn't like Porsche? I guess he must be crazy!"
```

**replaceAll**

```ts
let string = "Wow, he doesn't like Porsche? I guess he must be crazy!";
string.replaceAll("he", "she");
// 结果: "Wow, she doesn't like Porsche? I guess she must be crazy!"
```

## ES2021

### 逻辑赋值操作符

**||=操作符**

来看一个经常写的代码：

```ts
let a = 0;
if (!a) {
  a = 90;
}

console.log(a); // 90
```

这种写法可以使用下面的写法来改善：

```ts
let a = 0;
a = a || 90;
console.log(a); // 90
```

那么&&操作符也有对应的 if 判断：

```ts
if (a) {
  a = b;
}

// 等同于
a = a && b;
```
