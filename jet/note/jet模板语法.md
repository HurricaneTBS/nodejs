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
<footer>Version: {{ version }}</footer>
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
