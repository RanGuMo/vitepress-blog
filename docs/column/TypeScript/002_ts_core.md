# TypeScript 核心

## 类型注解

> 知道：`TypeScript` 类型注解

### 示例代码：

```typescript
// 约定变量 age 的类型为 number 类型
let age: number = 18;
age = 19;
```

语法：代码中: `number` 就是类型注解，
作用：为变量提供类型约束。
解释：约定了什么类型，就只能给该变量赋值什么类型的值，否则报错。

### 错误演示：

```typescript
let age: number = 18;
// 报错：不能将类型“string”分配给类型“number”
age = "19";
```

### 小结：

**什么是类型注解？**

- 变量后面，约定类型的语法，就是类型注解

**类型注解作用？**

- 约定类型，违反报错

## 原始类型

> 知道：`ts` 有哪些类型，掌握：原始类型使用

`TS` 常用类型：

- `JS` 已有类型
  - 简单类型：`number` `string` `boolean` `null` `undefined`
  - 复杂类型：对象、数组、函数
- `TS` 新增类型
  - 联合类型、交叉类型、自定义类型(类型别名)、接口、元组、字面量类型、枚举、`void`、`any`、泛型 等

原始类型：

- 使用简单，完全按照 `JS` 的类型来书写即可

```typescript
let age: number = 18;
let myName: string = "黑马程序员";
let isLoading: boolean = false;
let nullValue: null = null;
let undefinedValue: undefined = undefined;
```

推荐写法：

```typescript
// ✅ 推荐：省略注解，代码更简洁
let age = 18; // 自动推断为 number
let name = "张三"; // 自动推断为 string
let flag = true; // 自动推断为 boolean
let nullValue = null; // 自动推断为 null
let undefinedValue = undefined; // 自动推断为 undefined

// ❌ 冗余：简单类型无需手动注解
let age: number = 18;
let name: string = "张三";
let flag: boolean = true;
let nullValue: null = null;
let undefinedValue: undefined = undefined;
```

```typescript
// ⚠️ 以下情况必须写类型注解

// 1. 变量声明时未赋值
let age: number; // 必须注解

// 2. 函数参数
function greet(name: string) {} // 必须注解

// 3. 需要特定类型约束
let value: string | number = "hello"; // 必须注解
```

小结：

1. 语法： `let 变量名：类型注解 = 值`
2. 特点：💥类型不匹配，直接报错。
3. 推荐：👍简单数据类型，`省略注解`。

## 数组类型

> 掌握：数组类型的两种写法

- 写法 1

```typescript
let numbers: number[] = [1, 3, 5];
```

- 写法 2

```typescript
let strings: Array<string> = ["a", "b", "c"];
```

- 推荐使用：`number[]` 写法👍

## 联合类型

> 掌握：通过联合类型将多个类型合并为一个类型

需求：数组中有 `number` 和 `string` 类型，这个数组的类型如何书写？

```typescript
let arr: (number | string)[] = [1, "a", 3, "b"];
```

定义：

- 解释：`|`（竖线）在 `TS` 中叫做联合类型，即：由两个或多个其他类型组成的类型，表示可以是这些类型中的任意一种

注意：

- 这是 `TS` 中联合类型的语法，只有一根竖线，不要与 `JS` 中的或（`||`）混淆了

## 类型别名

> 掌握：使用类型别名语法给类型取别字

示例代码：

```typescript
let arr1: (number | string)[] = [1, "a", 4];
let arr2: (number | string)[] = [2, "b", 3];
```

```ts
// 类型别名: type 类型别名 = 具体类型
type CustomArr = (number | string)[];
let arr1: CustomArr = [1, "a", 4];
let arr2: CustomArr = [1, "a", 4];
```

语法:

- `type 类型别名 = 任意类型` 基本语法
- 使用类型别名，与类型注解的写法一样，`:自定义类型`，并没定义新的类型，只是起一个别名

作用：创建自定义类型，复用类型

推荐：

- 使用大驼峰命名👍

使用场景：

- 当同一类型（复杂）被多次使用时，可以通过类型别名，`简化` 该类型的使用

```typescript
type CustomArr = (number | string)[];
let arr: CustomArr = [1, "a", 4];
let arr2: CustomArr = [2, "b", 8];
```

## 函数类型

### 基本使用

> 掌握：给函数指定类型

给函数指定类型，其实是给 `参数` 和 `返回值` 指定类型。

两种写法：

- 在函数基础上 `分别指定` 参数和返回值类型
- 使用类型别名 `同时指定` 参数和返回值类型

示例代码 1：分别指定

```typescript
// 函数声明
function add(num1: number, num2: number): number {
  return num1 + num2;
}

// 箭头函数
const add = (num1: number, num2: number): number => {
  return num1 + num2;
};
```

示例代码 2：同时指定

```typescript
type AddFn = (num1: number, num2: number) => number;

const add: AddFn = (num1, num2) => {
  return num1 + num2;
};
```

::: info 注意：

同时指定，类似 箭头函数的语法。

同时指定，只适用于 `函数表达式`。
:::

```typescript
✅ 正确的用法（函数表达式）

// 类型别名定义函数类型
type AddFn = (num1: number, num2: number) => number;

// 函数表达式 - ✅ 正确
const add: AddFn = (num1, num2) => {
  return num1 + num2;
};

// 也是函数表达式 - ✅ 正确
const subtract: AddFn = function(num1, num2) {
  return num1 - num2;
};
```

```typescript
❌ 错误的用法（函数声明）

type AddFn = (num1: number, num2: number) => number;

// 函数声明 - ❌ 错误！不能这样用
function add: AddFn(num1, num2) {
  return num1 + num2;
}
```

### void 类型

> 掌握：`void` 函数返回值类型

如果函数没有返回值，定义函数类型时返回值类型为 `void`

```typescript
const say = (): void => {
  console.log("hi");
};
```

如果函数没有返回值，且没有定义函数返回值类型的时候，默认是 `void`

```typescript
const say = () => {
  console.log("hi");
};
```

注意：

- 在 `JS` 中如果没有返回值，默认返回的是 `undefined`
- 但是 `void` 和 `undefined` 在 `TypeScript` 中并不是一回事
- 如果指定返回值类型是 `undefined` 那返回值必须是 `undefined`

```typescript
const add = (): undefined => {
  return undefined;
};
```

小结：

- 函数没有返回值，使用👍`void`表示返回空，不推荐使用`undefined`👎

## 可选参数

> 掌握： 使用 `?` 将参数标记为可选

如果函数的参数，可以传也可以不传，这种情况就可以使用 `可选参数` 语法，
语法：参数后加 `?` 即可

```typescript
const fn = (n?: number) => {
  // ..
};
fn();
fn(10);
```

练习，模拟 `slice` 函数，定义函数参数类型

```typescript
const mySlice = (start?: number, end?: number) => {
  console.log("起始Index:", start, "结束Index:", end);
};
mySlice();
mySlice(1);
mySlice(1, 2);
```

注意：

- 必选参数不能位于可选参数后 `(start?: number, end: number)` 这样是不行的

总结：

- 可选参数：参数名称后有`?`
- 必选参数：参数名称后没有`?`
- 可选参数，只能出现在必选参数后

## 对象类型

### 基本使用

> 掌握：对象类型语法

`TS` 的对象类型，其实就是描述对象中的 `属性` `方法` 的类型，因为对象是由属性和方法组成的。

```typescript
// 空对象
let person: {} = {};

// 有属性的对象
let person: { name: string } = {
  name: "同学",
};

// 换行写可以省略 ; 符号
let person: {
  name: string;
  sayHi(): void;
} = {
  name: "jack",
  sayHi() {},
};
```

小结：

- 描述对象结构？ `:{}`
- 属性怎么写类型？ `属性名: 类型`
- 方法怎么写类型? `方法名(): 返回值类型`

### 扩展用法

> 掌握：对象类型中，函数使用箭头函数类型，属性设置可选，使用类型别名。

使用类型别名👍

```ts
// {} 会降低代码可阅读性，建议对象使用类型别名
// const axios = (config: { url: string; method?: string }) => {};
type Config = {
  url: string;
  method: string;
};
const axios = (config: Config) => {};
```

对象属性可选

```diff
type Config = {
   url: string;
-  method: string;
+  method?: string;
};
const axios = (config: Config) => {};
```

函数使用箭头函数类型

```typescript
type Person = {
  sayHi: (name: string) => void;
  sayHello(name: string): void;
};

let zs: Person = {
  sayHi(name) {
    console.log(name);
  },
};
```

小结：

- 对象的方法使用箭头函数类型怎么写？ `{sayHi:()=>void}`
- 对象的可选参数怎么设置？ `{name?: string}`
- 对象类型会使用 `{}`
- 如何提供可阅读性？ `类型别名`

::: warning 练习

创建一个学生对象，该对象中具有以下属性和方法：

属性：必选属性：姓名、性别、成绩，可选属性：身高
方法：学习、打游戏（可选）
:::

## 接口 interface

### 基本使用

> 掌握：使用 `interface` 声明对象类型

接口声明是命名对象类型的另一种方式

```typescript
// 通过interface定义对象类型
interface Person {
  name: string;
  age: number;
  sayHi: () => void;
}
// 使用类型
let person: Person = {
  name: "jack",
  age: 19,
  sayHi() {},
};
```

小结：

- `interface` 后面是接口名称，和类型别名的意思一样。
- 指定 `接口名称` 作为变量的类型使用。
- 接口的每一行只能有 一个 属性或方法，每一行不需要加分号。

### interface 继承

> 掌握：使用 `extends` 实现接口继承，达到类型复用

思考：

有两个接口，有相同的属性或者函数，如何提高代码复用？

```typescript
interface Point2D {
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}
```

继承：

相同的属性或展示可以抽离出来，然后使用 `extends` 实现继承复用

```typescript
interface Point2D {
  x: number;
  y: number;
}
// 继承 Point2D
interface Point3D extends Point2D {
  z: number;
}
// 继承后 Point3D 的结构：{ x: number; y: number; z: number }
```

小结：

接口继承的语法：`interface 接口A extends 接口B {}`
继承后 `接口A` 拥有 `接口B` 的所有属性和函数的类型声明

### type 交叉类型

> 掌握：使用 `交叉类型` 实现接口的继承效果

实现 `Point2D` 与 `{z: number}` 类型合并得到 `Ponit3D` 类型

```typescript
// 使用 type 来定义 Point2D 和 Point3D
type Point2D = {
  x: number;
  y: number;
};

// 使用 交叉类型 来实现接口继承的功能：
// 使用 交叉类型 后，Point3D === { x: number; y: number; z: number }
type Point3D = Point2D & {
  z: number;
};

let o: Point3D = {
  x: 1,
  y: 2,
  z: 3,
};
```

小结：

使用 `&` 可以合并连接的对象类型，也叫：`交叉类型`

### interface vs type

> 了解：`interface` 和 `type` 的相同点和区别

类型别名和接口非常相似，在许多情况下，可以在它们之间自由选择。
接口的几乎所有特性都以类型的形式可用，关键的区别在于`不能重新打开类型以添加新属性，而接口总是可扩展的`。

interface type
支持：对象类型 支持：对象类型，其他类型
复用：可以继承 复用：交叉类型
不同的点：

type 不可重复定义

```typescript
type Person = {
  name: string;
};
// 标识符“Person”重复  Error
type Person = {
  age: number;
};
```

interface 重复定义会合并

```typescript
interface Person {
  name: string;
}
interface Person {
  age: number;
}
// 类型会合并，注意：属性类型和方法类型不能重复定义
const p: Person = {
  name: "jack",
  age: 18,
};
```

小结：

它们都可以定义对象类型
它们都可以复用，`interface` 使用 `extends` , `type` 使用 `&`
`type` 不能重复定义，`interface` 可以重复会合并

## 类型推断

> 知道：`TS` 的的类型推断机制作用

在 `TS` 中存在类型推断机制，在没有指定类型的情况下，`TS` 也会给变量提供类型。
发生类型推断的几个场景场景：

1. 声明变量并初始化时

```typescript
// 变量 age 的类型被自动推断为：number
let age = 18;
```

2. 决定函数返回值时
```typescript
// 函数返回值的类型被自动推断为：number
const add = (num1: number, num2: number) => {
  return num1 + num2;
};

```
::: tip 建议：

推荐👍：能省略类型注解的地方就省略（偷懒，充分利用`TS`类型的推论，提升开发效率）

技巧🔔：如果你不知道类型怎么写，可以把鼠标悬停变量上，可以通过 `VScode` 提示看到类型

在你还没有熟悉 `ts` 类型的时候建议都加上类型，比如今天第一次写 `ts` 最好都写上
:::

## 字面量类型
### 字面量类型介绍
> 知道：什么是字面量类型

思考：这两个变量的类型是什么？

```typescript
let str1 = 'Hello TS';
const str2 = 'Hello TS';
```
通过类型推断发现，`str1` 类型是 `string` ， `str2` 类型是 `Hello TS`


解释：

- `str1` 是一个变量，它的值可以是任意字符串，所以类型为`string`

- `str2` 是 常量，常量的值不能改，值只能是 `Hello TS`，所以类型是 `Hello TS`


总结：

- 字面量类型：值被作为类型。
- 任意的 `JS` 值（比如，对象、数字等），都可以作为类型使用

### 字面量类型应用

> 知道：字面量类型的应用场景

使用模式：字面量类型配合联合类型一起使用
使用场景：用来表示一组明确的取值范围

需求：性别只能是 `男` 和 `女`，不会出现其他值。

```ts
// let gender = '男'
// gender = '女'
// ------------------------
type Gender = '男' | '女'
let gender: Gender = '男'
gender = '女'
```



例子：

在贪吃蛇游戏中，游戏的方向的可选值只能是上、下、左、右中的任意一个
```ts
// 使用自定义类型:
type Direction = 'up' | 'down' | 'left' | 'right'

function changeDirection(direction: Direction) {
  console.log(direction)
}

// 调用函数时，会有类型提示：
changeDirection('up')
```
- 解释：参数 `direction` 的值只能是 `up/down/left/right` 中的任意一个
- 优势：相比于 `string` 类型，使用字面量类型更加精确、严谨

小结：

- 语法：字面量+联合类型
- 场景：表示一组明确的取值范围
- 技巧：🔔
  `VScode`会自动提示字面量的值
  `ctrl + i` 开关提示


## 枚举 - 特殊
> 枚举的功能类似于`字面量类型+联合类型组合`的功能，也可以表示一组明确的可选值
> 枚举：定义一组命名常量。它描述一个值，该值可以是这些命名常量中的一个

```ts
// 创建枚举
enum Direction { Up, Down, Left, Right }

// 使用枚举类型
function changeDirection(direction: Direction) {
  console.log(direction)
}

// 调用函数时，需要应该传入：枚举 Direction 成员的任意一个
// 类似于 JS 中的对象，直接通过 点（.）语法 访问枚举的成员
changeDirection(Direction.Up)
```

解释:

1. 使用 `enum` 关键字定义枚举
2. 约定枚举名称以`大写字母开头`
3. 枚举中的多个值之间通过 `,（逗号）分隔`
4. 定义好枚举后，直接使用枚举名称作为类型注解

## 枚举-数字枚举

- 问题：我们把枚举成员作为了函数的实参，它的值是什么呢?
- 解释：通过将鼠标移入 `Direction.Up`，可以看到枚举成员 `Up` 的值为 `0`

注意：枚举成员是有值的，默认为：从 `0` 开始自增的数值
我们把，枚举成员的值为数字的枚举，称为：`数字枚举`

当然，也可以给枚举中的成员初始化值
```ts
// Down -> 11、Left -> 12、Right -> 13
enum Direction { Up = 10, Down, Left, Right }

enum Direction { Up = 2, Down = 4, Left = 8, Right = 16 }
```

## 字符串枚举

> 字符串枚举：枚举成员的值是字符串
> 注意：字符串枚举没有自增长行为，因此，字符串枚举的`每个成员必须有初始值`
```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
```
### any 类型👎
> 知道：`any` 类型的作用是逃避 `TS` 的类型检查

显式`any`情况：当变量的类型指定为 `any` 的时候，不会有任何错误，也不会有代码提示，`TS`会忽略类型检查

```ts
let obj: any = { age: 18 }
obj.bar = 100
obj()
const n: number = obj
```

以上的代码虽然没有报错提示，但是将来是可能出现错误的。

隐式`any`的情况：声明变量不给类型或初始值，函数参数不给类型或初始值
```ts
// 声明变量不给类型或初始值
let a;
// 函数参数不给类型或初始值
const fn = (n) => {}
```

小结：

`any` 的使用越多，程序可能出现的漏洞越多，
因此不推荐使用 `any` 类型，尽量避免使用。


## 类型断言
有时候你会比 `TS` 更加明确一个值的类型，此时，可以使用类型断言来指定更具体的类型。 比如，

```ts
// aLink 的类型 HTMLElement，该类型只包含所有标签公共的属性或方法
// 这个类型太宽泛，没包含 a 元素特有的属性或方法，如 href
const aLink = document.getElementById('link')
```

但是我们明确知道获取的是一个 `A` 元素，可以通过 `类型断言` 给它指定一个更具体的类型。

```ts
const aLink = document.getElementById('link') as HTMLAnchorElement
```
解释:

- 使用 `as` 关键字实现类型断言
- 关键字 `as` 后面的类型是一个更加具体的类型（`HTMLAnchorElement` 是 `HTMLElement` 的`子类型`）
通过类型断言，`aLink` 的类型变得更加具体，这样就可以访问 `a` 标签特有的属性或方法了


例如：

```ts
const img = document.getElementById('img') as HTMLImageElement
// 如果不知道标签的类型：document.querySelector('div') 鼠标摸上去就可以看见
```
## typeof
众所周知，`JS` 中提供了 `typeof` 操作符，用来在 `JS` 中获取数据的类型
```js
console.log(typeof 'Hello world') // string
```
实际上，`TS` 也提供了 `typeof` 操作符：也用来在 `JS` 中获取数据的类型
使用场景:根据已有变量的值，获取该值的类型，来简化类型书写

```ts
let p = { x: 1, y: 2 }
function formatPoint(point: { x: number; y: number }) {}
formatPoint(p)

function formatPoint(point: typeof p) { }
```
解释:

1. 使用 `typeof` 操作符来获取变量 `p` 的类型，结果与第一种（对象字面量形式的类型）相同
2. `typeof` 出现在类型注解的位置（参数名称的冒号后面）所处的环境就在类型上下文(区别于 `JS` 代码)
3. 注意：`typeof` 只能用来查询变量或属性的类型，无法查询其他形式的类型（比如，函数的调用）


## 综合案例
> 使用 `TS` 实现访问历史记录功能

![alt text](./assets/3-image.png)

需求：

> 刷新页面后，展示访问历史记录，记录包含：次数和时间。
步骤：

1. 封装格式化时间函数，支持 `string` 格式的时间，可选参数，转换成功 `10:10:10` 时分秒
2. 定义访问记录单项 对象 类型，定义访问记录 列表 类型，需要存储在本地的 `key` 字面量类型
3. 封装获取访问历史记录函数，返回类型是 记录列表
4. 封装修改访问历史记录函数
5. 封装一个展示访问历史记录函数，且调用

代码：

```ts
// 需求1. 封装格式化时间函数，string 格式的时间，转换成功 `10:10:10` 时分秒
// 要求：
//     1. formatTime()  返回 当前时分秒，如： 18:18:10
//     2. formatTime('2023-02-01 10:10:10')  返回 时分秒，如： 10:10:10
const formatTime = () => {
 
};


// 需求：去掉所有的any
const KEY = "ts-demo-data";


const render = () => {
  // 读取缓存
  const str: any = localStorage.getItem(KEY);
  const list =  JSON.parse(str) ;
  
  // 新增一条访问记录
  const lastItem = list[list.length - 1];
  list.push({
    // 要求：🔔 conut拼错了，要求报错，改为count
    conut: lastItem ? lastItem.count + 1 : 1,
    time: formatTime(),
  });

  // 存入缓存
  localStorage.setItem(KEY, JSON.stringify(list));
  
  // 渲染到界面中
  const app = document.querySelector("#app") as any;
  app.innerHTML = list
    .map((item) => `次数：${item.count}，时间：${item.time}`)
    .join("<br/>");
};

render();
```