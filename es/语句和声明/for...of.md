## for...of

`for...of`语句在可迭代对象（包括 `Array`，`Map`，`Set`，`String`，`TypedArray`，`arguments` 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。

### 语法

```ts
for (variable of iterable) {
  //statements
}
```

- variable:在每次迭代中，将不同属性的值分配给变量。
- iterable:被迭代枚举其属性的对象。

### 简单的例子

```ts
const array1 = ["a", "b", "c"];

for (const element of array1) {
  console.log(element);
}

// expected output: "a"
// expected output: "b"
// expected output: "c"
```

## 迭代数组

```ts
let iterable = [10, 20, 30];

for (const value of iterable) {
  console.log(value);
}
// 10
// 20
// 30
```

## 迭代字符串

```ts
let iterable = "boo";

for (let value of iterable) {
  console.log(value);
}
// "b"
// "o"
// "o"
```

## 迭代 TypedArray

```ts
let iterable = new Uint8Array([0x00, 0xff]);

for (let value of iterable) {
  console.log(value);
}
// 0
// 255
```

## 迭代 Map

```ts
let iterable = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

for (let entry of iterable) {
  console.log(entry);
}
// ["a", 1]
// ["b", 2]
// ["c", 3]

for (let [key, value] of iterable) {
  console.log(value);
}
// 1
// 2
// 3
```

## 迭代 Set

```ts
let iterable = new Set([1, 1, 2, 2, 3, 3]);

for (let value of iterable) {
  console.log(value);
}
// 1
// 2
// 3
```

## 迭代 arguments 对象

```ts
(function () {
  for (let argument of arguments) {
    console.log(argument);
  }
})(1, 2, 3);

// 1
// 2
// 3
```

其他不常见的迭代对象，可以参考[for...of 官方文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)。

## for...of 与 for...in 的却别

无论是`for...in`还是`for...of`语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式。

`for...in` 语句以任意顺序迭代对象的可枚举属性。

`for...of` 语句遍历可迭代对象定义要迭代的数据。

更多细节可以查看[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of#for...of%E4%B8%8Efor...in%E7%9A%84%E5%8C%BA%E5%88%AB)
