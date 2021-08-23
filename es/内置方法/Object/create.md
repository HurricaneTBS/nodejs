## Object.create()

Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的**proto**。

看不懂这句话没关系，后面会通过案例来解释，

先来熟悉一下 create 方法。

### 语法

```ts
Object.create(proto，[propertiesObject])
// 注意，文档中用方括号括起来的属性都表示可选属性。
```

### 参数

- proto：新创建对象的原型对象。
- propertiesObject：可选。需要传入一个对象，该对象的属性类型参照 Object.defineProperties()的第二个参数。如果该参数被指定且不为 undefined，该传入对象的自有可枚举属性(即其自身定义的属性，而不是其原型链上的枚举属性)将为新创建的对象添加指定的属性值和对应的属性描述符。

第二个参数的意思可以不用去理解，深入学习的时候再看。

### 返回值

一个新对象，带着指定的原型对象和属性。

> 注意：带着置顶的原型对象和属性，这句话很重要。

### create 方法会克隆一个对象

比如下面的例子：

```ts
const person = {
  name: "NoName",
  age: 0,
};

const chinese = Object.create(person);
console.log(person.name); // NoName
console.log(person.age); // 0
```

上面的例子中，创建了一个原型对象 person，然后用 create 方法克隆了一个 chinese 对象。chinese 对象会获取到了它的原型 person 对象的 name 和 age 属性，同时也获得了属性值。

> 注意：name 和 age 属性在 person 对象上，而不是在 chinese 对象上。你可以理解为，一个人继承了父亲的财产，他可以开父亲的车，但是这个车是在他父亲的名下的。自己的属性，可以理解为在自己名下的财产。

我们不需要对 create 方法理解的太深，只需要知道上面的例子中：

- person 对象是父对象，chinese 是子对象；
- 子对象可以使用父对象的属性和方法


## 参考资料

- [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty#%E8%AF%AD%E6%B3%95)