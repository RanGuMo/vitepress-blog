# 路由导航

> 路由导航是指我们在`Next.js`中跳转页面的方式，例如原始的`<a>`标签，等。

在`Next.js`中，共有四种方式提供跳转:

- `Link`组件
- `useRouter Hook` (客户端组件)
- `redirect`函数 (服务端组件)
- `History API` (浏览器`API` 本文略过用的不多 了解即可)

## Link 组件

> `<Link>`是一个内置组件，在`a标签`的基础上扩展了功能，并且还能用来实现**预获取(`prefetch`)**，以及**保持滚动位置(`scroll`)**等。

基本用法

```tsx
import Link from "next/link"; //引入Link组件
export default function Home() {
  return (
    <div>
      <Link href="/about">跳转About页面</Link>
      <Link href={{ pathname: "/about", query: { name: "张三" } }}>
        跳转About并且传入参数
      </Link>
      <Link href="/page" prefetch={true}>
        预获取page页面(默认开启)
      </Link>
      <Link href="/xm" scroll={true}>
        保持滚动位置
      </Link>
      <Link href="/daman" replace={true}>
        替换当前页面
      </Link>
    </div>
  );
}
```

支持动态渲染

```tsx
import Link from "next/link";
export default function Page() {
  const arr = [1, 2, 3, 4, 5];
  return arr.map((item) => (
    <Link key={item} href={`/page/${item}`}>
      动态渲染的 Link
    </Link>
  ));
}
```

## useRouter Hook

> `useRouter` 可以在代码中根据逻辑跳转页面，例如根据用户权限跳转不同的页面。
> 使用该 `hook` 需要在客户端组件中。需要在顶层编写 '`use client`' 声明这是客户端组件。

```tsx
"use client";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  return (
    <>
      <button onClick={() => router.push("/page")}>跳转 page 页面</button>
      <button onClick={() => router.replace("/page")}>替换当前页面</button>
      <button onClick={() => router.back()}>返回上一页</button>
      <button onClick={() => router.forward()}>跳转下一页</button>
      <button onClick={() => router.refresh()}>刷新当前页面</button>
      <button onClick={() => router.prefetch("/about")}>
        预获取 about 页面
      </button>
    </>
  );
}
```

## redirect 函数

> `redirect` 函数可以用于**服务端组件/客户端组件**中跳转页面，例如根据用户权限跳转不同的页面。

在 `Next.js` 中 `redirect` 的状态是：`307` 临时重定向

```tsx
import { redirect } from "next/navigation";
export default async function Page() {
  const checkLogin = await checkLogin();
  //如果用户未登录，则跳转到登录页面
  if (!checkLogin) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Page</h1>
    </div>
  );
}
```

## permanentRedirect 函数

> `permanentRedirect` 跟上面的 `redirect` 的区别是：`permanentRedirect` 是永久重定向，而 `redirect` 是临时重定向。

在 `Next.js` 中 `permanentRedirect` 的状态是：`308` 永久重定向

```tsx
//用法跟 redirect 一样，只是状态码不同
import { permanentRedirect } from "next/navigation";
export default async function Page() {
  const checkLogin = await checkLogin();
  if (!checkLogin) {
    permanentRedirect("/login");
  }
}
```

`permanentRedirect` / `redirect` 参数说明
这两个函数都接受以下参数：

- `path`：字符串类型，表示重定向的目标 `URL`（支持相对路径和绝对路径）
- `type`：可选参数，值为 `replace` 或 `push`，用于控制重定向的行为
  关于 `type` 参数的默认行为：

在 `Server Actions` 中：默认使用 `push`，会将新页面添加到浏览器历史记录
在 其他场景 中：默认使用 `replace`，会替换当前的浏览器历史记录
你可以通过显式指定 `type` 参数来覆盖默认行为。

> ⚠️ 注意：`type` 参数在服务端组件中无效，仅在`客户端组件`和 `Server Actions` 中生效。
