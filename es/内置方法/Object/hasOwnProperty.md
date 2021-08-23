## Object.prototype.hasOwnProperty()

`hasOwnProperty()` 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。

### 语法

```ts
obj.hasOwnProperty(prop);
```

### 参数

- prop：要检测的属性的 String 字符串形式表示的名称，或者 Symbol。

### 返回值

用来判断某个对象是否含有指定的属性的布尔值 Boolean。

举个例子：

```ts
const person = {
  name: "张三",
  age: 32,
};

console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("age")); // true
```

上面的代码中，对 person 对象使用了`hasOwnProperty`方法来查看 `person` 对象是否有**自己的属性**name 和 `age`。结果为 `true`。

现在新增一个对象，继承自 `person`：

```ts
const person = {
  name: "张三",
  age: 32,
};

console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("age")); // true

const chinese = Object.create(person);

console.log(chinese.name); // 张三
console.log(chinese.age); // 32

console.log(chinese.hasOwnProperty("name")); // false
console.log(chinese.hasOwnProperty("age")); // false
```

上面的代码中，`chinese` 可以获取到 `name` 和 `age` 的值，但是调用 `hasOwnProperty` 方法后，返回值是 `false`。说明 `name` 和 `age` 属性不是 `chinese` 对象的属性，是它的父对象 `person` 的。

以上就是对`hasOwnProperty`方法的解释。

## 参考资料

- [Object.prototype.hasOwnProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
