## Object.entries()

`Object.entries()`方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 `for...in `循环遍历该对象时返回的顺序一致（区别在于 `for-in` 循环还会枚举原型链中的属性）。

### 语法

```ts
Object.entries(obj);
```

### 参数

- obj：可以返回其可枚举属性的键值对的对象。

### 返回值

给定对象自身可枚举属性的键值对数组。

举个例子：

```ts
const object1 = {
  a: "somestring",
  b: 42,
};
const result = Object.entries(object1);
console.log(result); // [ [ 'a', 'somestring' ], [ 'b', 42 ] ]
```

可以使用 for...of 循环来遍历属性：

```ts
const object1 = {
  a: "somestring",
  b: 42,
};

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}
```

## 使用案例

### 将 Object 转换为 Map

```ts
var obj = { foo: "bar", baz: 42 };
var map = new Map(Object.entries(obj));
console.log(map); // Map { foo: "bar", baz: 42 }
```

## 参考资料

- [Object.entries](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#%E8%AF%AD%E6%B3%95)
