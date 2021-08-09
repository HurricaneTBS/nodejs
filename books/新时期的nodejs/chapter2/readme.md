# 第二章 常用模块

## Module

### 模块规范

目前流行的模块规范有两种：CommonJS 和 AMD

1. CommonJS

CommonJS 将每个文件看做是一个模块，模块内部定义的变量都是私有的，无法被其他模块使用。

除非使用预定义的方法将内部的变量暴露出来（通过 exports 和 require 关键字来实现），CommonJS 最出名的实现就是 Node.js

CommonJS 显著的特点就是模块的加载是同步的。

2. AMD

AMD 意思就是异步模块定义。它采用异步方式加载模块，模块的加载不影响后面语句的运行。

### require 及其运行机制

```js
// person.js
function say() {
  console.log("say");
}

function listen() {
  console.log("listen");
}

module.exports = {
  say,
  listen,
};
```

```js
// test.js
const person = require("./person");
person.listen();
```


## Buffer

`Buffer`是`Node`特有的数据类型，主要用来处理二进制数据。

```js
const fs = require('fs');

fs.readFile("person.js",(err,res) => {
  console.log(res);
})
// <Buffer 66 75 6e 63 74 69 6f 6e 20 73 61 79 28 29 7b 0a 20 20 20 20 63 6f 6e 73 6f 6c 65 2e 6c 6f 67 28 22 73 61 79 22 29 3b 0a 7d 0a 0a 0a 66 75 6e 63 74 69 ... 78 more bytes>
```

### Buffer的构建与转换

