JavaScript 继承方式 ---> 原型委托方式实现继承。

# 1.1 动态类型语言和鸭子类型

## 1.1.1 语言类型

编程语言按照数据类型大体可以分为两类：

- 静态类型语言：编译时已经确定变量类型。
- 动态类型语言：程序运行后，变量被赋值的时候确定变量的类型。

静态类型语言的优点：

- 编译时就发现类型错误，提前避免一些错误。
- 提前规定数据类型，帮助编辑器根据这些信息优化程序，提高运行速度。

静态类型语言的缺点：

- 迫使程序员依照强契约来编写程序；
- 类型的声明会增加更多的代码，在程序编写过程中，这些细节会让程序员的精力从思考业务逻辑上分散开来。

动态类型语言的优点：

- 编写的代码数量更少，看起来也更加简洁；
- 程序员可以把精力更多地放在业务逻辑上面；

动态类型语言的缺点：

- 无法保证变量的类型，从而在程序的运行期有可能发生跟类型相关的错误。

这好像在商店买了一包牛肉辣条，但是要真正吃到嘴里才知道是不是牛肉味。

## 1.2 鸭子类型（了解）

这一切都建立在鸭子类型（`duck typing`）的概念上，鸭子类型的通俗说法是：

> 如果它走起路来像鸭子，叫起来也是鸭子，那么它就是鸭子。

我们可以通过一个小故事来更深刻地了解鸭子类型。

> 从前在 JavaScript 王国里，有一个国王，他觉得世界上最美妙的声音就是鸭子的叫声，于是国王召集大臣，要组建一个 1000 只鸭子组成的合唱团。大臣们找遍了全国，终于找到 999 只鸭子，但是始终还差一只，最后大臣发现有一只非常特别的鸡，它的叫声跟鸭子一模一样，于是这只鸡就成为了合唱团的最后一员。

这个故事告诉我们，国王要听的只是鸭子的叫声，这个声音的主人到底是鸡还是鸭并不重要。

> 鸭子类型指导我们只关注对象的行为，而不关注对象本身，也就是关注 HAS-A, 而不是 IS-A。

下面我们用代码来模拟这个故事。

```ts
const duck = {
  duckSinging: function () {
    console.log("嘎嘎嘎");
  },
};
const chicken = {
  duckSinging: function () {
    console.log("嘎嘎嘎");
  },
};
const choir = []; // 合唱团

const joinChoir = function (animal) {
  if (animal && typeof animal.duckSinging === "function") {
    choir.push(animal);
    console.log("恭喜加入合唱团");
    console.log("合唱团已有成员数量:" + choir.length);
  }
};
joinChoir(duck); // 恭喜加入合唱团
joinChoir(chicken); // 恭喜加入合唱团
```

我们看到，对于加入合唱团的动物，大臣们根本无需检查它们的类型，而是只需要保证它们拥有 duckSinging 方法。如果下次期望加入合唱团的是一只小狗，而这只小狗刚好也会鸭子叫，我相信这只小狗也能顺利加入。

在动态类型语言的面向对象设计中，鸭子类型的概念至关重要。

利用鸭子类型的思想，我们不必借助超类型的帮助，就能轻松地在动态类型语言中实现一个原则：“**面向接口编程，而不是面向实现编程**”。例如:

一个对象若有 push 和 pop 方法，并且这些方法提供了正确的实现，它就可以被当作栈来使用。一个对象如果有 length 属性，也可以依照下标来存取属性（最好还要拥有 slice 和 splice 等方法），这个对象就可以被当作数组来使用。

在静态类型语言中，要实现“面向接口编程”并不是一件容易的事情，往往要通过抽象类或者接口等将对象进行向上转型。当对象的真正类型被隐藏在它的超类型身后，这些对象才能在类型检查系统的“监视”之下互相被替换使用。只有当对象能够被互相替换使用，才能体现出对象多态性的价值。

面向接口编程”是设计模式中最重要的思想，但在 JavaScript 语言中，“面向接口编程”的过程跟主流的静态类型语言不一样，因此，在 JavaScript 中实现设计模式的过程与在一些我们熟悉的语言中实现的过程会大相径庭。

# 1.2 多态

多态”一词源于希腊文 polymorphism，拆开来看是 poly（复数）+ morph（形态）+ ism，从字面上我们可以理解为复数形态。

多态的实际含义是：**同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果**。

换句话说，给不同的对象发送同一个消息的时候，这些对象会根据这个消息分别给出不同的反馈。

从字面上来理解多态不太容易，下面我们来举例说明一下。

主人家里养了两只动物，分别是一只鸭和一只鸡，当主人向它们发出“叫”的命令时，鸭会“嘎嘎嘎”地叫，而鸡会“咯咯咯”地叫。这两只动物都会以自己的方式来发出叫声。它们同样“都是动物，并且可以发出叫声”，但根据主人的指令，它们会各自发出不同的叫声。

其实，其中就蕴含了多态的思想。下面我们通过代码进行具体的介绍。

## 1.2.1 一段多态的 JavaScript 代码

我们把上面的故事用 JavaScript 代码实现如下：

```ts
function makeSound(animal) {
  if (animal instanceof Duck) {
    console.log("嘎嘎嘎");
  } else if (animal instanceof Chicken) {
    console.log("咯咯咯");
  }
}

function Duck() {}
function Chicken() {}

makeSound(new Duck());
makeSound(new Chicken());

// 嘎嘎嘎
// 咯咯咯
```

这段代码确实体现了“多态性”，当我们分别向鸭和鸡发出“叫唤”的消息时，它们根据此消息作出了各自不同的反应。但这样的“多态性”是无法令人满意的，如果后来又增加了一只动物，比如狗，显然狗的叫声是“汪汪汪”，此时我们必须得改动 makeSound 函数，才能让狗也发出叫声。修改代码总是危险的，修改的地方越多，程序出错的可能性就越大，而且当动物的种类越来越多时，makeSound 有可能变成一个巨大的函数。

多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事物”与“可能改变的事物”分离开来。在这个故事中，动物都会叫，这是不变的，但是不同类型的动物具体怎么叫是可变的。把不变的部分隔离出来，把可变的部分封装起来，这给予了我们扩展程序的能力，程序看起来是可生长的，也是符合开放—封闭原则的，相对于修改代码来说，仅仅增加代码就能完成同样的功能，这显然优雅和安全得多。

## 1.2.2 对象的多态性

下面是改写后的代码，首先我们把不变的部分隔离出来，那就是所有的动物都会发出叫声：

```ts
const makeSound = function (animal) {
  animal.sound();
};
```

然后把可变的部分各自封装起来，我们刚才谈到的多态性实际上指的是对象的多态性：

```ts
const Duck = function () {};

Duck.prototype.sound = function () {
  console.log("嘎嘎嘎");
};

function Chicken() {}

Chicken.prototype.sound = function () {
  console.log("咯咯咯");
};

makeSound(new Duck());
makeSound(new Chicken());

// 嘎嘎嘎
// 咯咯咯
```

现在我们向鸭和鸡都发出“叫唤”的消息，它们接到消息后分别作出了不同的反应。如果有一天动物世界里又增加了一只狗，这时候只要简单地追加一些代码就可以了，而不用改动以前的 makeSound 函数，如下所示：

```ts
function Dog() {}
Dog.prototype.sound = function () {
  console.log("汪汪汪");
};
makeSound(new Dog()); // 汪汪汪
```

## 1.2.3 类型检查和多态

类型检查是在表现出对象多态性之前的一个绕不开的话题，但 `JavaScript` 是一门不必进行类型检查的动态类型语言，为了真正了解多态的目的，我们需要转一个弯，从一门静态类型语言说起。

我们在 1.1 节已经说明过静态类型语言在编译时会进行类型匹配检查。以 `Java` 为例，由于在代码编译时要进行严格的类型检查，所以不能给变量赋予不同类型的值，这种类型检查有时候会让代码显得僵硬，代码如下：

```java
String str;
str = "abc";    // 没有问题
str = 2;    // 报错
```

现在我们尝试把上面让鸭子和鸡叫唤的例子换成 Java 代码：

```java
public class Duck {        // 鸭子类
    public void makeSound(){
        System.out.println( "嘎嘎嘎" );
    }
}

public class Chicken {        // 鸡类
  public void makeSound(){
    System.out.println( "咯咯咯" );
  }
}

public class AnimalSound {
  public void makeSound( Duck duck ){    // (1)
    duck.makeSound();
  }
}

public class Test {
  public static void main( String args[] ){
    AnimalSound animalSound = new AnimalSound();
    Duck duck = new Duck();
    animalSound.makeSound( duck );    // 输出：嘎嘎嘎
  }
}
```

我们已经顺利地让鸭子可以发出叫声，但如果现在想让鸡也叫唤起来，我们发现这是一件不可能实现的事情。因为(1)处 AnimalSound 类的 makeSound 方法，被我们规定为只能接受 Duck 类型的参数：

```java
public class Test {
  public static void main( String args[] ){
    AnimalSound animalSound = new AnimalSound();
    Chicken chicken = new Chicken();
    animalSound.makeSound( chicken );    // 报错，只能接受Duck类型的参数
  }
}
```

某些时候，在享受静态语言类型检查带来的安全性的同时，我们亦会感觉被束缚住了手脚。

为了解决这一问题，静态类型的面向对象语言通常被设计为可以向上转型：当给一个类变量赋值时，这个变量的类型既可以使用这个类本身，也可以使用这个类的超类。这就像我们在描述天上的一只麻雀或者一只喜鹊时，通常说“一只麻雀在飞”或者“一只喜鹊在飞”。但如果想忽略它们的具体类型，那么也可以说“一只鸟在飞”。

同理，当 Duck 对象和 Chicken 对象的类型都被隐藏在超类型 Animal 身后，Duck 对象和 Chicken 对象就能被交换使用，这是让对象表现出多态性的必经之路，而多态性的表现正是实现众多设计模式的目标。

## 1.2.4 使用继承得到多态效果

使用继承来得到多态效果，是让对象表现出多态性的最常用手段。继承通常包括实现继承和接口继承。本节我们讨论实现继承，接口继承的例子请参见第 21 章。

我们先创建一个 Animal 抽象类，再分别让 Duck 和 Chicken 都继承自 Animal 抽象类，下述代码中(1)处和(2)处的赋值语句显然是成立的，因为鸭子和鸡也是动物：

```java
public abstract class Animal {
  abstract void makeSound();   // 抽象方法
}

public class Chicken extends Animal{
  public void makeSound(){
    System.out.println( "咯咯咯" );
  }
}

public class Duck extends Animal{
  public void makeSound(){
    System.out.println( "嘎嘎嘎" );
  }
}

Animal duck = new Duck();       // (1)
Animal chicken = new Chicken();    // (2)
```

现在剩下的就是让 AnimalSound 类的 makeSound 方法接受 Animal 类型的参数，而不是具体的 Duck 类型或者 Chicken 类型：

```java
public class AnimalSound{
  public void makeSound( Animal animal ){    // 接受Animal类型的参数
    animal.makeSound();
  }
}

public class Test {
  public static void main( String args[] ){
    AnimalSound animalSound= new AnimalSound ();
    Animal duck = new Duck();
    Animal chicken = new Chicken();
    animalSound.makeSound( duck );    // 输出嘎嘎嘎
    animalSound.makeSound( chicken );        // 输出咯咯咯
  }
}
```

## 1.2.5 JavaScript 的多态

从前面的讲解我们得知，多态的思想实际上是把“做什么”和“谁去做”分离开来，要实现这一点，归根结底先要消除类型之间的耦合关系。如果类型之间的耦合关系没有被消除，那么我们在 makeSound 方法中指定了发出叫声的对象是某个类型，它就不可能再被替换为另外一个类型。在 Java 中，可以通过向上转型来实现多态。

而 `JavaScript` 的变量类型在运行期是可变的。一个 `JavaScript` 对象，既可以表示 Duck 类型的对象，又可以表示 `Chicken` 类型的对象，这意味着 `JavaScript` 对象的多态性是与生俱来的。

这种与生俱来的多态性并不难解释。`JavaScript` 作为一门动态类型语言，它在编译时没有类型检查的过程，既没有检查创建的对象类型，又没有检查传递的参数类型。在 1.2.2 节的代码示例中，我们既可以往 `makeSound` 函数里传递 `duck` 对象当作参数，也可以传递 `chicken` 对象当作参数。

由此可见，某一种动物能否发出叫声，只取决于它有没有 `makeSound` 方法，而不取决于它是否是某种类型的对象，这里不存在任何程度上的“类型耦合”。这正是我们从上一节的鸭子类型中领悟的道理。在 `JavaScript` 中，并不需要诸如向上转型之类的技术来取得多态的效果。

## 1.2.6 多态在面向对象程序设计中的作用

有许多人认为，多态是面向对象编程语言中最重要的技术。但我们目前还很难看出这一点，毕竟大部分人都不关心鸡是怎么叫的，也不想知道鸭是怎么叫的。让鸡和鸭在同一个消息之下发出不同的叫声，这跟程序员有什么关系呢？

Martin Fowler 在《重构：改善既有代码的设计》里写到：

> 多态的最根本好处在于，你不必再向对象询问“你是什么类型”而后根据得到的答案调用对象的某个行为——你只管调用该行为就是了，其他的一切多态机制都会为你安排妥当。

换句话说，多态最根本的作用就是通过把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句。

Martin Fowler 的话可以用下面这个例子很好地诠释：

在电影的拍摄现场，当导演喊出“action”时，主角开始背台词，照明师负责打灯光，后面的群众演员假装中枪倒地，道具师往镜头里撒上雪花。在得到同一个消息时，每个对象都知道自己应该做什么。如果不利用对象的多态性，而是用面向过程的方式来编写这一段代码，那么相当于在电影开始拍摄之后，导演每次都要走到每个人的面前，确认它们的职业分工（类型），然后告诉他们要做什么。如果映射到程序中，那么程序中将充斥着条件分支语句。

利用对象的多态性，导演在发布消息时，就不必考虑各个对象接到消息后应该做什么。对象应该做什么并不是临时决定的，而是已经事先约定和排练完毕的。每个对象应该做什么，已经成为了该对象的一个方法，被安装在对象的内部，每个对象负责它们自己的行为。所以这些对象可以根据同一个消息，有条不紊地分别进行各自的工作。

`将行为分布在各个对象中，并让这些对象各自负责自己的行为，这正是面向对象设计的优点。`

再看一个现实开发中遇到的例子，这个例子的思想和动物叫声的故事非常相似。

假设我们要编写一个地图应用，现在有两家可选的地图 API 提供商供我们接入自己的应用。目前我们选择的是谷歌地图，谷歌地图的 API 中提供了 show 方法，负责在页面上展示整个地图。示例代码如下：

```ts
let googleMap = {
  show: function () {
    console.log("开始渲染谷歌地图");
  },
};

function renderMap() {
  googleMap.show();
}

renderMap();
```

后来因为某些原因，要把谷歌地图换成百度地图，为了让 renderMap 函数保持一定的弹性，我们用一些条件分支来让 renderMap 函数同时支持谷歌地图和百度地图：

```ts
const googleMap = {
  show: function () {
    console.log("开始渲染谷歌地图");
  },
};
const baiduMap = {
  show: function () {
    console.log("开始渲染百度地图");
  },
};
const renderMap = function (type) {
  if (type === "google") {
    googleMap.show();
  } else if (type === "baidu") {
    baiduMap.show();
  }
};
renderMap("google"); // 输出：开始渲染谷歌地图
renderMap("baidu"); // 输出：开始渲染百度地图
```

可以看到，虽然 renderMap 函数目前保持了一定的弹性，但这种弹性是很脆弱的，一旦需要替换成搜搜地图，那无疑必须得改动 renderMap 函数，继续往里面堆砌条件分支语句。

我们还是先把程序中相同的部分抽象出来，那就是显示某个地图：

```ts
const googleMap = {
  show: function () {
    console.log("开始渲染谷歌地图");
  },
};
const baiduMap = {
  show: function () {
    console.log("开始渲染百度地图");
  },
};

const renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show();
  }
};

renderMap(googleMap); // 输出：开始渲染谷歌地图
renderMap(baiduMap); // 输出：开始渲染百度地图
```

现在来找找这段代码中的多态性。当我们向谷歌地图对象和百度地图对象分别发出“展示地图”的消息时，会分别调用它们的 show 方法，就会产生各自不同的执行结果。对象的多态性提示我们，“做什么”和“怎么去做”是可以分开的，即使以后增加了搜搜地图，renderMap 函数仍然不需要做任何改变，如下所示

```ts
const sosoMap = {
  show: function () {
    console.log("开始渲染搜搜地图");
  },
};
renderMap(sosoMap); // 输出：开始渲染搜搜地图
```

在这个例子中，我们假设每个地图 API 提供展示地图的方法名都是 show，在实际开发中也许不会如此顺利，这时候可以借助适配器模式来解决问题。

## 1.2.7 设计模式与多态

GoF 所著的《设计模式》一书的副书名是“可复用面向对象软件的基础”。该书完全是从面向对象设计的角度出发的，通过对封装、继承、多态、组合等技术的反复使用，提炼出一些可重复使用的面向对象设计技巧。而多态在其中又是重中之重，绝大部分设计模式的实现都离不开多态性的思想。

拿命令模式来说，请求被封装在一些命令对象中，这使得命令的调用者和命令的接收者可以完全解耦开来，当调用命令的 `execute` 方法时，不同的命令会做不同的事情，从而会产生不同的执行结果。而做这些事情的过程是早已被封装在命令对象内部的，作为调用命令的客户，根本不必去关心命令执行的具体过程。

在组合模式中，多态性使得客户可以完全忽略组合对象和叶节点对象之前的区别，这正是组合模式最大的作用所在。对组合对象和叶节点对象发出同一个消息的时候，它们会各自做自己应该做的事情，组合对象把消息继续转发给下面的叶节点对象，叶节点对象则会对这些消息作出真实的反馈。

在策略模式中，`Context` 并没有执行算法的能力，而是把这个职责委托给了某个策略对象。每个策略对象负责的算法已被各自封装在对象内部。当我们对这些策略对象发出“计算”的消息时，它们会返回各自不同的计算结果。

在 `JavaScript` 这种将函数作为一等对象的语言中，函数本身也是对象，函数用来封装行为并且能够被四处传递。当我们对一些函数发出“调用”的消息时，这些函数会返回不同的执行结果，这是“多态性”的一种体现，也是很多设计模式在 `JavaScript` 中可以用高阶函数来代替实现的原因。

# 1.3 封装

封装的目的是将信息隐藏。一般而言，我们讨论的封装是封装数据和封装实现。这一节将讨论更广义的封装：

- 封装数据
- 封装实现
- 封装类型
- 封装变化

## 1.3.1 封装数据

在许多语言的对象系统中，封装数据是由语法解析来实现的，这些语言也许提供了 `private`、`public`、`protected` 等关键字来提供不同的访问权限。

但 `JavaScript` 并没有提供对这些关键字的支持，我们只能依赖变量的作用域来实现封装特性，而且只能模拟出 `public` 和 `private` 这两种封装性。

除了 `ECMAScript 6` 中提供的 `let` 之外，一般我们通过函数来创建作用域：

```ts
const myObject = (function () {
  let __name = "sven"; // 私有（private）变量
  return {
    getName: function () {
      // 公开（public）方法
      return __name;
    },
  };
})();
console.log(myObject.getName()); // 输出：sven
console.log(myObject.__name); // 输出：undefined
```

## 1.3.2 封装实现

上一节描述的封装，指的是数据层面的封装。有时候我们喜欢把封装等同于封装数据，但这是一种比较狭义的定义。

封装的目的是将信息隐藏，封装应该被视为“任何形式的封装”，也就是说，封装不仅仅是隐藏数据，还包括隐藏实现细节、设计细节以及隐藏对象的类型等。

从封装实现细节来讲，封装使得对象内部的变化对其他对象而言是透明的，也就是不可见的。对象对它自己的行为负责。其他对象或者用户都不关心它的内部实现。封装使得对象之间的耦合变松散，对象之间只通过暴露的 API 接口来通信。当我们修改一个对象时，可以随意地修改它的内部实现，只要对外的接口没有变化，就不会影响到程序的其他功能。

封装实现细节的例子非常之多。拿迭代器来说明，迭代器的作用是在不暴露一个聚合对象的内部表示的前提下，提供一种方式来顺序访问这个聚合对象。我们编写了一个 `each` 函数，它的作用就是遍历一个聚合对象，使用这个 `each` 函数的人不用关心它的内部是怎样实现的，只要它提供的功能正确便可以。即使 `each` 函数修改了内部源代码，只要对外的接口或者调用方式没有变化，用户就不用关心它内部实现的改变。

## 1.3.3 封装类型

封装类型是静态类型语言中一种重要的封装方式。一般而言，封装类型是通过抽象类和接口来进行的。把对象的真正类型隐藏在抽象类或者接口之后，相比对象的类型，客户更关心对象的行为。在许多静态语言的设计模式中，想方设法地去隐藏对象的类型，也是促使这些模式诞生的原因之一。比如工厂方法模式、组合模式等。

当然在 `JavaScript` 中，并没有对抽象类和接口的支持。`JavaScript` 本身也是一门类型模糊的语言。在封装类型方面，`JavaScript` 没有能力，也没有必要做得更多。对于 `JavaScript` 的设计模式实现来说，不区分类型是一种失色，也可以说是一种解脱。在后面章节的学习中，我们可以慢慢了解这一点

## 1.3.4 封装变化

从设计模式的角度出发，封装在更重要的层面体现为封装变化。

《设计模式》一书曾提到如下文字：

“考虑你的设计中哪些地方可能变化，这种方式与关注会导致重新设计的原因相反。它不是考虑什么时候会迫使你的设计改变，而是考虑你怎样才能够在不重新设计的情况下进行改变。这里的关键在于封装发生变化的概念，这是许多设计模式的主题。”

这段文字即是《设计模式》提到的“找到变化并封装之”。《设计模式》一书中共归纳总结了 23 种设计模式。从意图上区分，这 23 种设计模式分别被划分为：

- 创建型模式
- 结构型模式
- 行为型模式。

拿创建型模式来说，要创建一个对象，是一种抽象行为，而具体创建什么对象则是可以变化的，创建型模式的目的就是封装创建对象的变化。而结构型模式封装的是对象之间的组合关系。行为型模式封装的是对象的行为变化。

通过封装变化的方式，把系统中稳定不变的部分和容易变化的部分隔离开来，在系统的演变过程中，我们只需要替换那些容易变化的部分，如果这些部分是已经封装好的，替换起来也相对容易。这可以最大程度地保证程序的稳定性和可扩展性。

从《设计模式》副标题“可复用面向对象软件的基础”可以知道，这本书理应教我们如何编写可复用的面向对象程序。这本书把大多数笔墨都放在如何封装变化上面，这跟编写可复用的面向对象程序是不矛盾的。当我们想办法把程序中变化的部分封装好之后，剩下的即是稳定而可复用的部分了。

# 1.4 原型模式和基于原型继承的 JavaScript 对象系统

在 Brendan Eich 为 JavaScript 设计面向对象系统时，借鉴了 Self 和 Smalltalk 这两门基于原型的语言。之所以选择基于原型的面向对象系统，并不是因为时间匆忙，它设计起来相对简单，而是因为从一开始 Brendan Eich 就没有打算在 JavaScript 中加入类的概念。

在以类为中心的面向对象编程语言中，类和对象的关系可以想象成铸模和铸件的关系，对象总是从类中创建而来。而在原型编程的思想中，类并不是必需的，对象未必需要从类中创建而来，一个对象是通过克隆另外一个对象所得到的。就像电影《第六日》一样，通过克隆可以创造另外一个一模一样的人，而且本体和克隆体看不出任何区别。

原型模式不单是一种设计模式，也被称为一种编程泛型。

本节我们将首先学习第一个设计模式——原型模式。随后会了解基于原型的 Io 语言，借助对 Io 语言的了解，我们对 JavaScript 的面向对象系统也将有更深的认识。在本节的最后，我们将详细了解 JavaScript 语言如何通过原型来构建一个面向对象系统

## 1.4.1 使用克隆的原型模式

从设计模式的角度讲，原型模式是用于创建对象的一种模式，如果我们想要创建一个对象，一种方法是先指定它的类型，然后通过类来创建这个对象。原型模式选择了另外一种方式，我们不再关心对象的具体类型，而是找到一个对象，然后通过克隆来创建一个一模一样的对象。

既然原型模式是通过克隆来创建对象的，那么很自然地会想到，如果需要一个跟某个对象一模一样的对象，就可以使用原型模式。

假设我们在编写一个飞机大战的网页游戏。某种飞机拥有分身技能，当它使用分身技能的时候，要在页面中创建一些跟它一模一样的飞机。如果不使用原型模式，那么在创建分身之前，无疑必须先保存该飞机的当前血量、炮弹等级、防御等级等信息，随后将这些信息设置到新创建的飞机上面，这样才能得到一架一模一样的新飞机。

如果使用原型模式，我们只需要调用负责克隆的方法，便能完成同样的功能。

原型模式的实现关键，是语言本身是否提供了 clone 方法。ECMAScript 5 提供了 Object.create 方法，可以用来克隆对象。代码如下：

```ts
const Plane = function () {
  this.blood = 100;
  this.attackLevel = 1;
  this.defenseLevel = 1;
};
const plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;
const clonePlane = Object.create(plane);
console.log(clonePlane); // 输出：Object {blood: 500, attackLevel: 10, defenseLevel: 7}
```

## 1.4.2 克隆是创建对象的手段

通过上一节的代码，我们看到了如何通过原型模式来克隆出一个一模一样的对象。但原型模式的真正目的并非在于需要得到一个一模一样的对象，而是提供了一种便捷的方式去创建某个类型的对象，克隆只是创建这个对象的过程和手段。

在用 Java 等静态类型语言编写程序的时候，类型之间的解耦非常重要。依赖倒置原则提醒我们创建对象的时候要避免依赖具体类型，而用 new XXX 创建对象的方式显得很僵硬。工厂方法模式和抽象工厂模式可以帮助我们解决这个问题，但这两个模式会带来许多跟产品类平行的工厂类层次，也会增加很多额外的代码。

原型模式提供了另外一种创建对象的方式，通过克隆对象，我们就不用再关心对象的具体类型名字。这就像一个仙女要送给三岁小女孩生日礼物，虽然小女孩可能还不知道飞机或者船怎么说，但她可以指着商店橱柜里的飞机模型说“我要这个”。

当然在 JavaScript 这种类型模糊的语言中，创建对象非常容易，也不存在类型耦合的问题。从设计模式的角度来讲，原型模式的意义并不算大。但 JavaScript 本身是一门基于原型的面向对象语言，它的对象系统就是使用原型模式来搭建的，在这里称之为原型编程范型也许更合适。

## 1.4.3 体验 Io 语言

前面说过，原型模式不仅仅是一种设计模式，也是一种编程范型。JavaScript 就是使用原型模式来搭建整个面向对象系统的。在 JavaScript 语言中不存在类的概念，对象也并非从类中创建出来的，所有的 JavaScript 对象都是从某个对象上克隆而来的。

对于习惯了以类为中心语言的人来说，也许一时不容易理解这种基于原型的语言。即使是对于 JavaScript 语言的熟练使用者而言，也可能会有一种“不识庐山真面目，只缘身在此山中”的感觉。事实上，使用原型模式来构造面向对象系统的语言远非仅有 JavaScript 一家。

JavaScript 基于原型的面向对象系统参考了 Self 语言和 Smalltalk 语言，为了搞清 JavaScript 中的原型，我们本该寻根溯源去瞧瞧这两门语言。但由于这两门语言距离现在实在太遥远，我们不妨转而了解一下另外一种轻巧又基于原型的语言——Io 语言。

Io 语言在 2002 年由 Steve Dekorte 发明。可以从http://iolanguage.com下载到Io语言的解释器，安装好之后打开Io解释器，输入经典的“Hello World”程序。解释器打印出了 Hello World 的字符串，这说明我们已经可以使用 Io 语言来编写一些小程序了。

作为一门基于原型的语言，Io 中同样没有类的概念，每一个对象都是基于另外一个对象的克隆。

就像吸血鬼的故事里必然有一个吸血鬼祖先一样，既然每个对象都是由其他对象克隆而来的，那么我们猜测 Io 语言本身至少要提供一个根对象，其他对象都发源于这个根对象。这个猜测是正确的，在 Io 中，根对象名为 Object。

这一节我们依然拿动物世界的例子来讲解 Io 语言。在下面的代码中，通过克隆根对象 Object，就可以得到另外一个对象 Animal。虽然 Animal 是以大写开头的，但是记住 Io 中没有类，Animal 跟所有的数据一样都是对象。

```
Animal := Object clone    // 克隆动物对象
```

现在通过克隆根对象 Object 得到了一个新的 Animal 对象，所以 Object 就被称为 Animal 的原型。目前 Animal 对象和它的原型 Object 对象一模一样，还没有任何属于它自己方法和能力。我们假设在 Io 的世界里，所有的动物都会发出叫声，那么现在就给 Animal 对象添加 makeSound 方法吧。代码如下：

```
Animal makeSound := method( "animal makeSound " print );
```

好了，现在所有的动物都能够发出叫声了，那么再来继续创建一个 Dog 对象。显而易见，Animal 对象可以作为 Dog 对象的原型，Dog 对象从 Animal 对象克隆而来：

```
Dog := Animal clone
```

可以确定，Dog 一定懂得怎么吃食物，所以接下来给 Dog 对象添加 eat 方法：

```
Dog eat = method( "dog eat " print );
```

现在已经完成了整个动物世界的构建，通过一次次克隆，Io 的对象世界里不再只有形单影只的根对象 Object，而是多了两个新的对象：Animal 对象和 Dog 对象。其中 Dog 的原型是 Animal，Animal 对象的原型是 Object。最后我们来测试 Animal 对象和 Dog 对象的功能。

先尝试调用 Animal 的 makeSound 方法，可以看到，动物顺利发出了叫声：

```
Animal makeSound      // 输出：animal makeSound
```

然后再调用 Dog 的 eat 方法，同样我们也看到了预期的结果：

```
Dog eat    // 输出：dog eat
```

## 1.4.4 原型编程范型的一些规则

从上一节的讲解中，我们看到了如何在 Io 语言中从无到有地创建一些对象。跟使用“类”的语言不一样的地方是，Io 语言中最初只有一个根对象 Object，其他所有的对象都克隆自另外一个对象。如果 A 对象是从 B 对象克隆而来的，那么 B 对象就是 A 对象的原型。

在上一小节的例子中，Object 是 Animal 的原型，而 Animal 是 Dog 的原型，它们之间形成了一条原型链。这个原型链是很有用处的，当我们尝试调用 Dog 对象的某个方法时，而它本身却没有这个方法，那么 Dog 对象会把这个请求委托给它的原型 Animal 对象，如果 Animal 对象也没有这个属性，那么请求会顺着原型链继续被委托给 Animal 对象的原型 Object 对象，这样一来便能得到继承的效果，看起来就像 Animal 是 Dog 的“父类”，Object 是 Animal 的“父类”。

这个机制并不复杂，却非常强大，Io 和 JavaScript 一样，基于原型链的委托机制就是原型继承的本质。

我们来进行一些测试。在 Io 的解释器中执行 Dog makeSound 时，Dog 对象并没有 makeSound 方法，于是把请求委托给了它的原型 Animal 对象，而 Animal 对象是有 makeSound 方法的，所以该条语句可以顺利得到输出，如图 1-2 所示。

现在我们明白了原型编程中的一个重要特性，即当对象无法响应某个请求时，会把该请求委托给它自己的原型。

最后整理一下本节的描述，我们可以发现原型编程范型至少包括以下基本规则。

- 所有的数据都是对象
- 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
- 对象会记住它的原型。
- 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。

## 1.4.5 JavaScript 中的原型继承

刚刚我们已经体验过同样是基于原型编程的 Io 语言，也已经了解了在 Io 语言中如何通过原型链来实现对象之间的继承关系。在原型继承方面，JavaScript 的实现原理和 Io 语言非常相似，JavaScript 也同样遵守这些原型编程的基本规则。

- 所有的数据都是对象。
- 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
- 对象会记住它的原型。
- 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。

下面我们来分别讨论 JavaScript 是如何在这些规则的基础上来构建它的对象系统的。

### 1. 所有的数据都是对象

JavaScript 在设计的时候，模仿 Java 引入了两套类型机制：基本类型和对象类型。基本类型包括 undefined、number、boolean、string、function、object。从现在看来，这并不是一个好的想法。

按照 JavaScript 设计者的本意，除了 undefined 之外，一切都应是对象。为了实现这一目标，number、boolean、string 这几种基本类型数据也可以通过“包装类”的方式变成对象类型数据来处理。

我们不能说在 JavaScript 中所有的数据都是对象，但可以说绝大部分数据都是对象。那么相信在 JavaScript 中也一定会有一个根对象存在，这些对象追根溯源都来源于这个根对象。

事实上，JavaScript 中的根对象是 Object.prototype 对象。Object.prototype 对象是一个空的对象。我们在 JavaScript 遇到的每个对象，实际上都是从 Object.prototype 对象克隆而来的，Object.prototype 对象就是它们的原型。比如下面的 obj1 对象和 obj2 对象：

```ts
const obj1 = new Object();
const obj2 = {};
```

可以利用 ECMAScript 5 提供的 Object.getPrototypeOf 来查看这两个对象的原型：

```ts
console.log(Object.getPrototypeOf(obj1) === Object.prototype); // 输出：true
console.log(Object.getPrototypeOf(obj2) === Object.prototype); // 输出：true
```

### 2. 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它

在 Io 语言中，克隆一个对象的动作非常明显，我们可以在代码中清晰地看到 clone 的过程。比如以下代码：

```
Dog :=  Animal clone
```

但在 JavaScript 语言里，我们并不需要关心克隆的细节，因为这是引擎内部负责实现的。我们所需要做的只是显式地调用 var obj1 = new Object()或者 var obj2 = {}。此时，引擎内部会从 Object.prototype 上面克隆一个对象出来，我们最终得到的就是这个对象。

再来看看如何用 new 运算符从构造器中得到一个对象，下面的代码我们再熟悉不过了：

```ts
function Person(name) {
  this.name = name;
}
Person.prototype.getName = function () {
  return this.name;
};
const a = new Person("sven");
console.log(a.name); // 输出：sven
console.log(a.getName()); // 输出：sven
console.log(Object.getPrototypeOf(a) === Person.prototype); // 输出：true
```

在 JavaScript 中没有类的概念，这句话我们已经重复过很多次了。但刚才不是明明调用了 new Person()吗？

在这里 Person 并不是类，而是函数构造器，JavaScript 的函数既可以作为普通函数被调用，也可以作为构造器被调用。当使用 new 运算符来调用函数时，此时的函数就是一个构造器。用 new 运算符来创建对象的过程，实际上也只是先克隆 Object.prototype 对象，再进行一些其他额外操作的过程。

在 Chrome 和 Firefox 等向外暴露了对象`__proto__`属性的浏览器下，我们可以通过下面这段代码来理解 new 运算的过程：

```ts
function Person(name) {
  this.name = name;
}
Person.prototype.getName = function () {
  return this.name;
};

const objectFactory = function () {
  const obj = new Object(), // 从Object.prototype上克隆一个空的对象
    Constructor = [].shift.call(arguments); // 取得外部传入的构造器，此例是Person

  obj.__proto__ = Constructor.prototype; // 指向正确的原型
  const ret = Constructor.apply(obj, arguments); // 借用外部传入的构造器给obj设置属性
  return typeof ret === "object" ? ret : obj; // 确保构造器总是会返回一个对象
};

const a = objectFactory(Person, "sven");
console.log(a.name); // 输出：sven
console.log(a.getName()); // 输出：sven
console.log(Object.getPrototypeOf(a) === Person.prototype); // 输出：true
```

我们看到，分别调用下面两句代码产生了一样的结果：

```ts
const a = objectFactory(A, "sven");
const a = new A("sven");
```

### 3. 对象会记住它的原型

如果请求可以在一个链条中依次往后传递，那么每个节点都必须知道它的下一个节点。同理，要完成 Io 语言或者 JavaScript 语言中的原型链查找机制，每个对象至少应该先记住它自己的原型。

目前我们一直在讨论“对象的原型”，就 JavaScript 的真正实现来说，其实并不能说对象有原型，而只能说对象的构造器有原型。对于“对象把请求委托给它自己的原型”这句话，更好的说法是对象把请求委托给它的构造器的原型。那么对象如何把请求顺利地转交给它的构造器的原型呢？

JavaScript 给对象提供了一个名为**proto**的隐藏属性，某个对象的**proto**属性默认会指向它的构造器的原型对象，即{Constructor}.prototype。在一些浏览器中，**proto**被公开出来，我们可以在 Chrome 或者 Firefox 上用这段代码来验证：

```ts
const a = new Object();
console.log(a.__proto__ === Object.prototype); // 输出：true
```

实际上，**proto**就是对象跟“对象构造器的原型”联系起来的纽带。正因为对象要通过**proto**属性来记住它的构造器的原型，所以我们用上一节的 objectFactory 函数来模拟用 new 创建对象时，需要手动给 obj 对象设置正确的**proto**指向。

```ts
obj.__proto__ = Constructor.prototype;
```

通过这句代码，我们让 obj.**proto**指向 Person.prototype，而不是原来的 Object.prototype。

### 4. 如果对象无法响应某个请求，它会把这个请求委托给它的构造器的原型

这条规则即是原型继承的精髓所在。从对 Io 语言的学习中，我们已经了解到，当一个对象无法响应某个请求的时候，它会顺着原型链把请求传递下去，直到遇到一个可以处理该请求的对象为止。

JavaScript 的克隆跟 Io 语言还有点不一样，Io 中每个对象都可以作为原型被克隆，当 Animal 对象克隆自 Object 对象，Dog 对象又克隆自 Animal 对象时，便形成了一条天然的原型链，如图 1-3 所示。

(Dog)--->(Animal)--->(Object)

而在 JavaScript 中，每个对象都是从 Object.prototype 对象克隆而来的，如果是这样的话，我们只能得到单一的继承关系，即每个对象都继承自 Object.prototype 对象，这样的对象系统显然是非常受限的。

实际上，虽然 JavaScript 的对象最初都是由 Object.prototype 对象克隆而来的，但对象构造器的原型并不仅限于 Object.prototype 上，而是可以动态指向其他对象。这样一来，当对象 a 需要借用对象 b 的能力时，可以有选择性地把对象 a 的构造器的原型指向对象 b，从而达到继承的效果。下面的代码是我们最常用的原型继承方式：

```ts
const obj = { name: "sven" };
const A = function () {};
A.prototype = obj;
const a = new A();
console.log(a.name); // 输出：sven
```

我们来看看执行这段代码的时候，引擎做了哪些事情。

- 首先，尝试遍历对象 a 中的所有属性，但没有找到 name 这个属性。
- 查找 name 属性的这个请求被委托给对象 a 的构造器的原型，它被 a.**proto**记录着并且指向 A.prototype，而 A.prototype 被设置为对象 obj。
- 在对象 obj 中找到了 name 属性，并返回它的值。

当我们期望得到一个“类”继承自另外一个“类”的效果时，往往会用下面的代码来模拟实现：

```ts
const A = function () {};
A.prototype = { name: "sven" };
const B = function () {};
B.prototype = new A();
const b = new B();
console.log(b.name); // 输出：sven
```

再看这段代码执行的时候，引擎做了什么事情。

- 首先，尝试遍历对象 b 中的所有属性，但没有找到 name 这个属性。
- 查找 name 属性的请求被委托给对象 b 的构造器的原型，它被 `b.__proto__`记录着并且指向 B.prototype，而 B.prototype 被设置为一个通过 new A()创建出来的对象。
- 在该对象中依然没有找到 name 属性，于是请求被继续委托给这个对象构造器的原型 A.prototype。
- 在 A.prototype 中找到了 name 属性，并返回它的值。

和把 B.prototype 直接指向一个字面量对象相比，通过 B.prototype = new A()形成的原型链比之前多了一层。但二者之间没有本质上的区别，都是将对象构造器的原型指向另外一个对象，继承总是发生在对象和对象之间。

最后还要留意一点，原型链并不是无限长的。现在我们尝试访问对象 a 的 address 属性。而对象 b 和它构造器的原型上都没有 address 属性，那么这个请求会被最终传递到哪里呢？

实际上，当请求达到 A.prototype，并且在 A.prototype 中也没有找到 address 属性的时候，请求会被传递给 A.prototype 的构造器原型 Object.prototype，显然 Object.prototype 中也没有 address 属性，但 Object.prototype 的原型是 null，说明这时候原型链的后面已经没有别的节点了。所以该次请求就到此打住，a.address 返回 undefined

```ts
a.address; // 输出：undefined
```

## 1.4.6 原型继承的未来

设计模式在很多时候其实都体现了语言的不足之处。Peter Norvig 曾说，设计模式是对语言不足的补充，如果要使用设计模式，不如去找一门更好的语言。这句话非常正确。不过，作为 Web 前端开发者，相信 JavaScript 在未来很长一段时间内都是唯一的选择。虽然我们没有办法换一门语言，但语言本身也在发展，说不定哪天某个模式在 JavaScript 中就已经是天然的存在，不再需要拐弯抹角来实现。比如 Object.create 就是原型模式的天然实现。使用 Object.create 来完成原型继承看起来更能体现原型模式的精髓。目前大多数主流浏览器都提供了 Object.create 方法。

但美中不足是在当前的 JavaScript 引擎下，通过 Object.create 来创建对象的效率并不高，通常比通过构造函数创建对象要慢。此外还有一些值得注意的地方，比如通过设置构造器的 prototype 来实现原型继承的时候，除了根对象 Object.prototype 本身之外，任何对象都会有一个原型。而通过 Object.create( null )可以创建出没有原型的对象。

另外，ECMAScript 6 带来了新的 Class 语法。这让 JavaScript 看起来像是一门基于类的语言，但其背后仍是通过原型机制来创建对象。通过 Class 创建对象的一段简单示例代码 ① 如下所示：

```ts
class Animal {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  speak() {
    return "woof";
  }
}
const dog = new Dog("Scamp");
console.log(dog.getName() + " says " + dog.speak());
```

## 1.4.7 小结

本节讲述了本书的第一个设计模式——原型模式。原型模式是一种设计模式，也是一种编程泛型，它构成了 JavaScript 这门语言的根本。本节首先通过更加简单的 Io 语言来引入原型模式的概念，随后学习了 JavaScript 中的原型模式。原型模式十分重要，和 JavaScript 开发者的关系十分密切。通过原型来实现的面向对象系统虽然简单，但能力同样强大。

最后整理一下本节的描述，我们可以发现原型编程范型至少包括以下基本规则。

- 所有的数据都是对象。
- 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
- 对象会记住它的原型。
- 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。
