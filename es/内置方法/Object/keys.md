## Object.keys()

Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。

### 语法

```ts
Object.keys(obj);
```

### 参数

- obj：要返回其枚举自身属性的对象。

### 返回值

一个表示给定对象的所有可枚举属性的字符串数组。

```ts
// simple array
var arr = ["a", "b", "c"];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array like object
var obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array like object with random key ordering
var anObj = { 100: "a", 2: "b", 7: "c" };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']

// getFoo is a property which isn't enumerable
var myObj = Object.create(
  {},
  {
    getFoo: {
      value: function () {
        return this.foo;
      },
    },
  }
);
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']
```


