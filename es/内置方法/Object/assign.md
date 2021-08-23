## Object.assign()

`Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

### 语法

```ts
Object.assign(target, ...sources);
```

### 参数

- target：目标对象
- sources：源对象

### 返回值

- 目标对象

简单的例子：

```ts
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target); // { a: 1, b: 4, c: 5 }

console.log(returnedTarget); // { a: 1, b: 4, c: 5 }
```

上面的例子中将 target 对象作为目标对象，将 source 对象合并到 target 对象中。

> 注意：该方法会对合并后的对象做去重。并且 Object.assign 不会在那些 source 对象值为 null 或 undefined 的时候抛出错误。

## 使用

### 复制一个对象

```ts
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

### 合并对象

```ts
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
```


### 对象属性去重

```ts
const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };

const obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
```

注意：它只会去除重复的键，并保留最后一个键对应的值。

### 拷贝 symbol 类型的属性

<!-- TODO -->

### 继承属性和不可枚举属性是不能拷贝的

<!-- TODO、 -->

### 原始类型会被包装为对象
<!-- TODO -->

### 异常会打断后续拷贝任务

<!-- TODO -->

### 拷贝访问器

<!-- TODO -->

### Polyfill

<!-- TODO -->

## 参考文档

- [Object.assign](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#syntax)