## Promise 基础知识

### Pormise 概念

`Promise` 是为了解决回调函数带给我们的一些繁琐操作。

所谓 `Promise`，简单说就是一个 **容器** ，里面保存着某个 **未来才会结束的事件（通常是一个异步操作）的结果**。

`Promise` 对象有以下两个特点。

1. 对象的状态不受外界影响。

`Promise` 对象代表一个异步操作，有三种状态：

- `pending`（进行中）、
- `fulfilled`（已成功）
- `rejected`（已失败）。

只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 `Promise` 这个名字的由来，它的英语意思就是“**承诺**”，表示其他手段无法改变。

2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

`Promise` 对象的状态改变，只有两种可能：

- 从 `pending` 变为 `fulfilled`
- 从 `pending` 变为 `rejected`。

只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 `resolved`（已定型）。

如果改变已经发生了，你再对 `Promise` 对象添加回调函数，也会立即得到这个结果。

> 这与事件（`Event`）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

> 注意，为了行文方便，本章后面的 `resolved` 统一只指 `fulfilled` 状态，不包含 `rejected` 状态。

有了 `Promise` 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise` 对象提供统一的接口，使得控制异步操作更加容易。

### Promise 缺点

`Promise` 也有一些缺点。

1. 无法取消 `Promise`，一旦新建它就会立即执行，无法中途取消。
2. 如果不设置回调函数，`Promise` 内部抛出的错误，不会反应到外部。
3. 当处于 `pending` 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用 `Stream` 模式是比部署 `Promise` 更好的选择。

### 源码

```ts
/**
 * 表示异步操作的完成
 */
interface Promise<T> {
  /**
   * 附加对解决方案和/或拒绝承诺的回调。
   * @param onfulfilled 当Promise状态为resolved时执行的回调。
   * @param onrejected 当Promise状态为rejected时执行的回调。
   * @returns 完成回调时返回一个Promise。
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;

  /**
   * 仅在拒绝承诺时附加回调。
   * @param onrejected Promise被拒绝时执行的回调。
   * @returns 完成回调时返回一个Promise。
   */
  catch<TResult = never>(
    onrejected?:
        ((reason: any) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
}
```

```js
interface PromiseLike<T> {
  /**
   * 附加对解决方案和/或拒绝承诺的回调。
   * @param onfulfilled 当Promise状态为resolved时执行的回调。
   * @param onrejected 当Promise状态为rejected时执行的回调。
   * @returns 完成回调时返回一个Promise。
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
        ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
        ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): PromiseLike<TResult1 | TResult2>;
}
```


## Promise 基本用法

ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例。

下面的代码创建了一个`Promise`实例：

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 `JavaScript` 引擎提供，不用自己部署。

`resolve`函数的作用是:

将`Promise`对象的状态从“未完成”变为“成功”（即从 `pending `---> `resolved`），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

`reject`函数的作用是:

将 Promise 对象的状态从“未完成”变为“失败”（即从 `pending` ---> `rejected`），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise 实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

```js
promise.then(
  function (value) {
    // success
  },
  function (error) {
    // failure
  }
);
```

`then`方法可以接受两个回调函数作为参数:

1. `Promise`对象的状态变为`resolved`时调用，
2. `Promise`对象的状态变为`rejected`时调用。

这两个函数都是可选的，不一定要提供。它们都接受`Promise`对象传出的值作为参数。

下面是一个`Promise`对象的简单例子。

```js
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "done");
  });
}

timeout(2000).then((value) => console.log(value)); // done
```

Promise 创建以后会先执行，下面的例子可以说明：

```js
// step 1
const promise = new Promise((resolve, reject) => {
  console.log("new Promise()");
  resolve();
});
// step 2
promise.then(() => {
  console.log("promise then");
});
// step 3
console.log("finished");

// new Promise()
// finished
// promise then
```

上面的代码中，`promise`创建的时候就会先执行，所以会打印`new Promise()`，`step 2`会在`Promise`状态变为`resolve`的时候才会执行，所以会暂时跳过，去执行`step 3`。

下面是一个异步加载图片的例子：

```js
function loadImageAsync(url) {
  return new Promise(function (resolve, reject) {
    const image = new Image();

    image.onload = function () {
      resolve(image);
    };

    image.onerror = function () {
      reject(new Error("Could not load image at " + url));
    };

    image.src = url;
  });
}

async function load() {
  const res = await loadImageAsync(
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.efu.com.cn%2Fupfile%2Ftrade%2F2014-02-08%2F60bd633c-dd0a-491e-84ff-9bfe669fb16b.jpg&refer=http%3A%2F%2Fimg1.efu.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631070021&t=c4e71d249d82faab252c39b96a75e4d4"
  );
  const bodys = document.querySelector("body");
  bodys.appendChild(res);
}

load();
```

注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。
```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```

## `Promise`的主要使用

### 回调函数

回调函数一直是`JavaScript`中比较令人纠结的写法，主要场景是用于处理并列或者并行的操作，然后在回调函数中处理操作的结果。这样的原生写法会带来如下不便：

1. 回调状态不便管理
2. 回调方式自由松散，没有约束

例如下面的回调写法：

```js
function func(num, callback) {
  setTimeout(() => {
    try {
      let result = num * 20;
      callback(result, null);
    } catch (e) {
      callback(null, e);
    }
  }, 2000);
}

function callback(result, error) {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
}

func(20, callback); // 400
```

上面的代码中，如果要处理回调的结果`result`和`error`就必须在回调函数内处理：

```js
function callback(result, error) {
  if (error) {
    console.log(error);
  } else {
    //   在这里处理回调函数的结果
    if (result > 300) {
      console.log("你的分数太高了");
    } else {
      console.log("分数不行啊");
    }
    console.log(result);
  }
}
```

而我们希望的是在外面去处理结果，像这样：

```js
function func(num, callback) {
  //   ......
}

const result = func(num, callback);
// 接下来去处理result的数据

try {
  console.log(result);
} catch (e) {
  console.log(e);
}
```

要想避免使用回调函数，就可以使用`Promise`。


### `Promise`避免回调函数

使用Promise改写上面的代码：

```js
function func(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = 1 / num;
      resolve(result);
    }, 2000);
  });
}

func(20).then(value=>console.log(value))
```

虽然这并没有实现直接处理结果，但是这已经进步了一大步了。

### await/async

对于回调来讲，`Promise`的到来看似解决了回调场景中的状态处理问题，但是`JavaScript`中令人头疼的不是回调，而是`回调嵌套`，而`Promise`也不能彻底解决回调嵌套带来的代码维护以及可读性的问题。

#### 原生回调嵌套

```js
function increase(num, callback) {
   setTimeout(() => {
     if( !(num >= 0) ) {
       callback(new Error('The parameters must be greater than zero'), null)
     } else {
      let result = num + 1;
      callback(null, result);
     }
   }, 100)
}

increase(1, (err, result1) => {
  if(!err) {
    console.log(`result1 = ${result1}`)
    
    increase(result1, (err, result2) => {
      if(!err) {
        console.log(`result2 = ${result2}`)
        
        increase(result2, (err, result3) => {
          if(!err) {
            console.log(`result3 = ${result3}`)
          } else {
            console.log(err)
          }
        })
      } else {
        console.log(err)
      }
    })
  } else {
    console.log(err)
  }
})
// 运行结果
// "result1 = 2"
// "result1 = 3"
// "result1 = 4"
```

#### Promise 处理回调嵌套

```js
function increase(num) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
       if( !(num >= 0) ) {
         reject(new Error('The parameters must be greater than zero'))
       } else {
        let result = num + 1;
        resolve(result);
       }
     }, 100)
   })
}


increase(1).then((result1) => {
  console.log(`result1 = ${result1}`)
  
  increase(result1).then((result2) => {
    console.log(`result2 = ${result2}`)
    
    increase(result2).then((result3) => {
      console.log(`result3 = ${result3}`)
    }).catch(err => console.log(err));
    
  }).catch(err => console.log(err));
  
}).catch(err => console.log(err));
// 运行结果
// "result1 = 2"
// "result1 = 3"
// "result1 = 4"
```

看起来只是把回调的代码换了个位置。

#### aysnc/await的使用

- async 是 声明 在回调环境函数
- await 是 运行 在等待回调结果过程中
- Promise 是封装了回调操作的 原子任务

```js
// 封装原子任务
function increase(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if( !(num >= 0) ) {
        reject(new Error('The parameters must be greater than zero'))
      } else {
        resolve(num + 1)
      }

    }, 100);
  }).catch(err => console.log(err))
  
}

// 声明任务环境
async function envIncrease() {
  let num = 1;
  // 等待回调任务结果1返回
  let result1 = await increase(num);
  console.log(`result1 = ${result1}`);
  
  // 等待回调任务结果2返回
  let result2 = await increase(result1);
  console.log(`result2 = ${result2}`);
  
  // 等待回调任务结果3返回
  let result3 = await increase(result2);
  console.log(`result3 = ${result3}`);
  
  return result3
}

// 声明任务环境
async function env() {
  // 等待 环境 Increase 的结果返回
  let result = await envIncrease()
  console.log(`result = ${result}`);
}

// 运行环境
env()



// 运行结果
// "result1 = 2"
// "result1 = 3"
// "result1 = 4"
```
