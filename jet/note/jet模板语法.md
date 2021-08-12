## 1.执行基础内容

执行模板需要传递一个变量 map 和一个上下文:

> 暂时先不看

## 2.分隔符

默认情况下，模板分隔符是`{{}}`。

注释用 `{* *}`.

## 3.访问输入

### 全局

给`jet.Set`添加一个全局变量。像下面这种方式去访问它：

设置：

```go
viewSet.AddGlobal("version", "v1.1.145");
```

访问

```handlebars
<footer>Version: {{version}}</footer>
```

### 全局方法

和全局变量类似：

```go
viewSet.AddGlobal("noblue", func(s string) string {
    return strings.Replace(s, "blue", "", -1)
})

// If speed is a consideration, use GlobalFunc instead
viewSet.AddGlobalFunc("noblue", func(args jet.Arguments) reflect.Value {
    a.RequireNumOfArguments("noblue", 1, 1)
    return reflect.ValueOf(strings.Replace(s, "blue", "", -1))
})
```

```handlebars
<div>{{ noblue("red blue green") }}</div>
<!-- Alternate call syntax, using pipelining (see below) -->
<div>{{ "red blue green"|noblue }}</div>
```

### 上下文

设置上下文：

```go
data := &http.Request{Method: http.MethodPost}
err := t.Execute(&w, vars, data)
// ...
```

获取上下文可以使用.的方式

```handlebars
<div>Request method is: {{ .Method }}</div>
<!-- Would be "POST" -->
```

## 4.遍历数据

### 结构体

访问成员和调用方法:

```handlebars
//  访问的是user对象里的FirstName
The user's firstname is {{ user.Firstname }}
// 访问的是user对象里的FullName函数
The user's name is {{ user.Fullname() }}.
// 访问的是user里带参数的Rename函数
Now his name is {{ user.Rename("Frederick", "Johnson") }}.
```

### Maps

使用方括号语法访问映射:

```handlebars
The test map's value is {{ testMap["testKey"] }}.
```

使用双值返回语法检查是否设置了键:

```handlebars
{{if v, ok := testMap["testKey"]; ok}}
  {{ v }} <!-- will print "test-value" -->
{{end}}
```

### 数组

```handlebars
The test slice's value is {{ testSlice[0] }}.
```

### 遍历数组或者 map

```handlebars
{{range .}}
{{end}}

{* 每次迭代出来的值赋值给value *}
{{range value := .}}
{{end}}

{* 遍历数组和map的方式是一样的，区别就是如果是数组，第一个值是索引，index，如果是map，第一个值是key *}
{{range keyOrIndex, value := .}}
{{end}}

{* 遍历集合依次更改每个项的上下文。 *}
{{range favoriteColors}}
  <p>I like {{.}}</p>
{{end}}
```

`range`可以有`else`模块，当遍历的数组或者 map 为空的时候执行：

```handlebars
{{range index, value := .}}
{{else}}
{{end}}
```

### 自定义 range

如果你的自定义类型满足[`jet.Ranger`](https://godoc.org/github.com/CloudyKit/jet#Ranger) 接口，Jet 会使用你自定义的方法去遍历。

你需要实现的方法有这样的签名:

```go
Range() (reflect.Value, reflect.Value, bool)
```

## 5.表达式

### 计算

支持基本算术运算符:+、-、\*、/、%

```handlebars
{{ 1 + 2 * 3 - 4 }} <!-- will print 3 -->
{{ (1 + 2) * 3 - 4.1 }} <!-- will print 4.9 -->
```

### 字符串拼接

```handlebars
{{ "HELLO"+" WORLD!" }} <!-- will print "HELLO WORLD!" -->
```

### 比较操作符

```handlebars
{{ if item == true || !item2 && item3 != "test" }}

{{ if item >= 12.5 || item < 6 }}
```

### 定义变量

```handlebars
{{ item := items[1] }}
{{ item2 := .["test"] }} <!-- also works on the context -->
```

### 三元表达式

```handlebars
{{ .HasTitle ? .Title : "Title not set" }}
```

### 切片表达式

你可以使用 Go-like [start:end]语法遍历一部分。不包含结尾，例如下面的表达式，遍历结果不包含 3

```handlebars
{{range v := .[1:3]}}
    {{ v }}
{{end}}
<!-- context is []string{"0", "1", "2", "3"}, will print "12" -->
```


```handlebars
{{ states := array(1,2,3,4,5,6,7,8,9)}}
{{range index,value := states[5:8]}}
    <div>{{index}}----{{value}}</div>
{{end}}

<!--
    0----6
    1----7
    2----8
-->
```

### 管道

简单的字符串可以通过管道打印或转换。

```handlebars
{{ "HELLO WORLD"|lower }} <!-- will print "hello world" -->
```

将`|`前面的结果转化成小写。

管道可以用几种不同的方式表示:

```handlebars
<!-- 链式表达，可以多个表达式共存 -->
chaining: {{ "HELLO"|lower|repeat:2 }} (will print hellohello)
<!-- 前缀表达式 -->
{{ lower:"HELLO"}} （结果是hello）
<!-- 前缀的优先级低于管道 -->
prefix: {{ lower:"HELLO"|upper|repeat:2 }} (will print HELLOHELLO)
simple function call: {{ lower("HELLO") }}
```

因为前缀的优先级低于管道，所以在使用了前缀表达式以后，就不要使用管道了，否则无效：

```handlebars
{{ "hello"|upper|raw }} <!-- valid -->
{{ raw:"hello" }}       <!-- valid -->
{{ raw:"hello"|upper }} <!-- invalid -->
```

## 6.流程控制语句

### `if`, `else`, and `else if`

```handlebars
{{if expression}}
{{end}}

{* assignment is possible as well *}
{{if ok := expression; ok }}

{{else if expression}}

{{else}}

{{end}}
```

## 7.Blocks

您可以将块视为可以按名称调用的模板的部分或片段。

#### 简单的例子

```handlebars
<!-- Define a block -->
{{block copyright()}}
  <div>© ACME, Inc. 2018</div>
{{end}}

<!-- Invoke with "yield" -->
<footer>
  {{yield copyright()}}
</footer>

<!-- Output -->
<footer>
  <div>© ACME, Inc. 2018</div>
</footer>
```

请记住，定义块的地方也是调用它的地方(see [Define & Invoke Together](#define--invoke-together))。
如果这不是你想要的，那么你必须把它放到另一个模板中并导入它，参见“导入和声明”部分。

#### 定义一个块

```handlebars
{{block inputField(type="text", label, id, value="", required=false)}}
  <div class="form-field">
    <label for="{{ id }}">{{ label }}</label>
    <input type="{{ type }}" value="{{ value }}" id="{{ id }}" {{if required}}required{{end}} />
  </div>
{{end}}
```

块定义接受以逗号分隔的参数名称列表，参数还可以加默认值。

默认值可以是任何表达式，包括:

- 局部或全局变量
- 一个收取电话（An `isset` call）--- 不懂
- 函数表达式

块不能命名为content、yield或其他Jet关键字。

#### 调用一个块

```handlebars
{{yield inputField(id="firstname", label="First name", required=true)}}
```

使用`yield`按名称调用块。
参数的顺序是无关紧要的，没有默认值的参数在`yield`块的时候，必须传递值。

您可以传递一个用作上下文的表达式，或者传递当前上下文。

```handlebars
<!-- Define block -->
{{block buff()}}
  <strong>{{.}}</strong>
{{end}}

<!-- Invoke & provide a context -->
{{yield buff() "Man"}}

<!-- Output -->
<strong>Man</strong>
```

#### 递归调用

```handlebars
<!-- Define a block which calls itself -->
{{block menu()}}
  <ul>
    {{range .}}
      <li>{{ .Text }}{{if len(.Children)}}{{yield menu() .Children}}{{end}}</li>
    {{end}}
  </ul>
{{end}}

<!-- Invoke -->
<nav>
  {{yield menu() navItems}}
</nav>
```

#### 包装时调用（slot）

当定义块时，使用特殊的' {{yield content}} '语句指定内部内容应该呈现在何处。然后，当你用yield调用block时，传递关键字content作为context。

```handlebars
<!-- Define block -->
{{block link(target)}}
  <a href="{{target}}">{{yield content}}</a>
{{end}}

<!-- Invoke -->
{{yield link(target="https://www.example.com") content}}
  Example.com
{{end}}

<!-- Output -->
<a href="https://www.example.com">Example.com</a>
```

这是一个更复杂的例子：

```handlebars
<!-- Define block -->
{{block cols(class="col-md-12", wrapInContainer=false, wrapInRow=true)}}
  {{if wrapInContainer}}<div class="container">{{end}}
    {{if wrapInRow}}<div class="row">{{end}}
      <div class="{{ class }}">{{yield content}}</div>
    {{if wrapInRow}}</div>{{end}}
  {{if wrapInContainer}}</div>{{end}}
{{end}}

<!-- Invoke -->
{{yield cols(class="col-xs-12") content}}
  <p>This content will be wrapped.</p>
{{end}}

<!-- Output -->
<div class="row">
  <div class="col-xs-12">
    <p>This content will be wrapped.</p>
  </div>
</div>
```

广泛使用时性能很好，因为块是在第一次导入时解析和缓存的。

#### 定义和调用同步

```handlebars
{{block pageHeader() .Header}}
  {{ .Title }}
{{end}}
```

当你在模板中定义一个未导入的块，并传递一个额外的表达式，如".Header"，这等同于：定义块并使用表达式调用块。


## 8.Include声明

include模板跟其他语言中使用一个块是一样的（类似于Vue中使用一个组件）。在include进来的模板中的所有局部和全局的变量对于你来说，都是可以使用的。你可以通过在{{include}}语句中指定上下文作为最后一个参数来传递上下文:

```handlebars
<!-- file: "views/users/_user.jet" -->
<div class="user">
  {{ .Firstname }} {{ .Lastname }}: {{ .Email }}
</div>

<!-- file: "views/users/index.jet" -->
{{range user := users}}
  {{include "users/_user.jet" user}}
{{end}}
```

### 如果存在，引入

如果你不确定你想包含的模板是否真的存在，你可以使用{{includeIfExists}}语句。当模板不存在时，它不会惊慌或抛出错误。它还以第二种形式返回布尔值，因此您可以对不存在的模板作出反应，并退回到默认内容。

```handlebars
{{includeIfExists "sidebars/"+user.ID+".jet" user}} <!-- no content if the template does not exist -->

{{if ok := includeIfExists("sidebars/"+user.ID, user); !ok}}
    <p>The template does not exist.</p>
  {{end}}
{{end}}
```

你也可以在' {{block}} '定义中使用它。

## 9.Import声明

导入模板可以让你在模板中使用已定义的块:

```handlebars
<!-- file: "views/common/_menu.jet" -->
{{block menu()}}
  <ul>
    {{range .}}
      <li>{{ .Text }}{{if len(.Children)}}{{yield menu() .Children}}{{end}}</li>
    {{end}}
  </ul>
{{end}}

<!-- file: "views/home.jet" -->
{{import "common/_menu.jet"}}
{{yield menu() navItems}}
<main>
  Content.
</main>
```

## 10.Extend声明

extend一个模板本质上意味着用“layout”包装它。下面是一个layout的例子:

```handlebars
<!-- file: "views/layouts/application.jet" -->
<!DOCTYPE html>
<html>
  <head>
    <title>{{yield title()}}</title>
  </head>
  <body>
    {{yield body()}}
  </body>
</html>
```

然后你可以在主模板中扩展布局，覆盖布局中生成的块定义:

```handlebars
<!-- file: "views/home.jet" -->
{{extends "layouts/application.jet"}}
{{block title()}}My title{{end}}
{{block body()}}
  <main>
    This content will be yielded in the layout above.
  </main>
{{end}}
```

结果是：

```handlebars
<!DOCTYPE html>
<html>
  <head>
    <title>My title</title>
  </head>
  <body>
      <main>
        This content will be yielded in the layout above.
      </main>
  </body>
</html>
```

当extend模板时，' {{extends}} '语句必须是模板中的第一个语句。只能extend一个模板。

## 11.相对模板查找

可以直接import和include同一目录下的模板，比如下面的代码中，_logo.jet和login.jet在同一目录下，就可以直接include。

```handlebars
<!-- file: "views/auth/_logo.jet" -->
<img src="{{ .LogoURL }}" />

<!-- file: "views/auth/login.jet" -->
{{extends "layouts/application.jet"}}
{{block body()}}
  {{include "_logo" company}}
{{end}}
```

如果模板的扩展名以`.jet`, `.html.jet` 或者 `.jet.html`结尾，你可以省略模板的扩展名。

## 参考

[GO jet](https://pkg.go.dev/github.com/CloudyKit/jet#Ranger)
