## Object.getPrototypeOf()

Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值）。

### 语法

```ts
Object.getPrototypeOf(object);
```

### 参数

- obj：要返回其原型的对象。

### 返回值

给定对象的原型。如果没有继承属性，则返回 null 。

简单的例子：

```ts
const prototype1 = {};
const object1 = Object.create(prototype1);

console.log(Object.getPrototypeOf(object1) === prototype1); // true
```

## 参考资料

- [Object.getPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)