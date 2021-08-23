## for...in

`for...in`语句以任意顺序遍历一个对象的除 Symbol 以外的可枚举属性。

### 语法

```ts
for (variable in object) statement;
```

- `variable`:在每次迭代时，`variable` 会被赋值为不同的属性名。
- `object`:非 `Symbol` 类型的可枚举属性被迭代的对象。

## for...in 遍历对象

### 遍历无父对象的对象

```ts
const obj = {
  name: "foo",
};

for (const key in obj) {
  console.log(`${key}---${obj[key]}`);
}
// 输出结果为：
// name---foo
```

### 遍历有父对象的对象

```ts
const obj = {
  name: "foo",
};

const extendsObj = Object.create(obj);

extendsObj.age = 90;

for (const key in extendsObj) {
  console.log(`${key}---${extendsObj[key]}`);
}
// 输出结果为：
// age---90
// name---foo
```

可以发现 for...in 循环会遍历父对象和对象本身。所以如果只是遍历对象本身，可以使用`hasOwnProperty()`方法先确定该属性是否是对象本身的属性。

```ts
const obj = {
  name: "foo",
};

const extendsObj = Object.create(obj);

extendsObj.age = 90;

for (const key in extendsObj) {
  if (Object.hasOwnProperty.call(extendsObj, key)) {
    const element = extendsObj[key];
    console.log(`${key}---${element}`);
  }
}
// 输出结果为：
// age---90
```

## for...in 遍历数组

不建议使用`for...in`遍历数组，如果非要如此，那么，`for...in`遍历数组的时候会将数组的索引作为对象的 `key`。

```ts
const arr = [1, 2, 2, 3];
for (const key in arr) {
  console.log(`${key}---${arr[key]}`);
}

// 输出结果为：
// 0---1
// 1---2
// 2---2
// 3---3
```

