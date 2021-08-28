slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括 end）。原始数组不会被改变。

### 语法

```ts
arr.slice([begin[, end]])
```

### 参数

- begin:[可选]

提取起始处的索引（从 0 开始），从该索引开始提取原数组元素。
如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。
如果省略 begin，则 slice 从索引 0 开始。
如果 begin 超出原数组的索引范围，则会返回空数组。

- end:[可选]

提取终止处的索引（从 0 开始），在该索引处结束提取原数组元素。slice 会提取原数组中索引从 begin 到 end 的所有元素（包含 begin，但不包含 end）。
slice(1,4) 会提取原数组中从第二个元素开始一直到第四个元素的所有元素 （索引为 1, 2, 3 的元素）。
如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。 slice(-2,-1) 表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。
如果 end 被省略，则 slice 会一直提取到原数组末尾。
如果 end 大于数组的长度，slice 也会一直提取到原数组末尾。

### 返回值

一个含有被提取元素的新数组。

## 基本用法

```ts
const animals = ["ant", "bison", "camel", "duck", "elephant"];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// expected output: Array ["camel", "duck"]
```

## 浅拷贝

浅拷贝的意思就是，拷贝的是一个引用，当原数组里的元素发生变化的时候，拷贝后的数组内容也会发生变化，当然这一点对于基础数据类型不作数。

```ts
const arr = [
  { name: "Tom" },
  { name: "Jone" },
  { name: "Stevn" },
  { name: "苏俊洋" },
];

const sliarr = arr.slice(0, 3);

arr[1].name = "张一山";
console.log(sliarr[1].name); // 张一山
sliarr[1].name = "张达帕";
console.log(arr[1].name); // 张达帕
```

上面的代码，如果数组中的数据是基础数据类型，那么改变 sliarr，arr 是不会变的。

## 将类数组对象转化为数组

```ts
function list() {
  return Array.prototype.slice.call(arguments);
}

const list1 = list(1, 2, 3); // [1, 2, 3]
```

上面代码的简化（选学）：

```ts
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);

function list() {
  return slice(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]
```
