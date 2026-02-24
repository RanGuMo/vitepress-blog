# TypeScript 核心

##　类型注解
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
age = '19';
```
### 小结：

什么是类型注解？
- 变量后面，约定类型的语法，就是类型注解
类型注解作用？
- 约定类型，违反报错