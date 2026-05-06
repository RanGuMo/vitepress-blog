## 创建 Nuxt 项目

```bash
pnpm create nuxt@latest j-book-nuxt
```

## 启动 Nuxt 项目

```bash
pnpm dev
```

## Pages

在 `app` 目录下 创建 `pages` 目录，再创建 `index.vue` 文件

app/pages/index.vue

```vue
<template>
  <div>
    <h1>Welcome to the homepage</h1>
  </div>
</template>
```

然后 删除 `app/app.vue` 文件 或者 在 `app/app.vue` 文件中 添加 `<NuxtPage />`

app/app.vue

```vue
<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

访问 `http://localhost:3000/` 就可以跳转到 `app/pages/index.vue` 页面了
![alt text](image.png)

访问 `http://localhost:3000/about` 路由，则需要创建 `app/pages/about.vue` 文件

```vue
<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
  </section>
</template>
```

![alt text](image-1.png)

## 动态路由

如果您在方括号内放置任何内容，它将被转换为动态路由参数。您可以在文件名或目录中混合多个参数，甚至混合非动态文本。

如果您希望参数为可选，则必须使用双重方括号包裹，例如 `~/pages/[[slug]]/index.vue` 或 `~/pages/[[slug]].vue` 将匹配 `/` 和 `/test`。

Directory Structure

```bash
-| pages/
---| index.vue
---| users-[group]/
-----| [id].vue
```

基于上述示例，您可以在组件中通过 `$route` 对象访问 `group/id`：

app/pages/users-[group]/[id].vue

```vue
<template>
  <p>{{ $route.params.group }} - {{ $route.params.id }}</p>
</template>
```

导航到 `/users-admins/123` 将渲染：

```vue
<p>admins - 123</p>
```

![alt text](image-4.png)

如果您想使用组合式 `API` 访问路由，可以使用全局的 `useRoute` 函数，它允许您像在选项式 `API` 中使用 `this.$route` 一样访问路由。

```vue
<script setup lang="ts">
const route = useRoute();

if (route.params.group === "admins" && route.params.id) {
  console.log("验证通过");
}
</script>
```

> 命名的父路由会优先于嵌套的动态路由。对于 `/foo/hello` 路由，`~/pages/foo.vue` 会优先于 `~/pages/foo/[slug].vue`。
> 要使用不同页面分别匹配 `/foo` 和 `/foo/hello`，请使用 `~/pages/foo/index.vue` 和 `~/pages/foo/[slug].vue`。

## 路由跳转-NuxtLink

> `Nuxt` 提供 `<NuxtLink>` 组件来处理应用内的各种链接。
> `<NuxtLink>` 是 Vue Router 的 `<RouterLink>` 组件和 `HTML` 的 `<a>` 标签的直接替代品。它会智能判断链接是 内部 还是 外部，并根据可用的优化（预取、默认属性等）相应地渲染。

```vue
<template>
  <NuxtLink to="/about">About page</NuxtLink>
</template>
```

渲染为 html

```html
<!-- (Vue Router & Smart Prefetching) -->
<a href="/about">About page</a>
```

## 带参数的路由跳转以及编程式导航

app/pages/index.vue

```vue
<template>
  <div>
    <h1>Welcome to the homepage</h1>
  </div>
  <AppAlert> This is an auto-imported component. </AppAlert>
  <ul>
    <li>
      <NuxtLink to="/about">About</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/users-admins/1">Users 1</NuxtLink>
    </li>
    <li>
      <NuxtLink :to="{ path: '/about', query: { msg: JSON.stringify(msg) } }">
        带参数跳转
      </NuxtLink>
    </li>
    <li>
      <button @click="goAbout">编程式导航</button>
    </li>
  </ul>
</template>
<script setup lang="ts">
const router = useRouter();
const msg = {
  id: 1,
  book: "nuxt3",
};

const goAbout = () => {
  router.push("/about?msg=" + JSON.stringify(msg));
};
</script>
```

app/pages/about.vue 获取参数

```vue
<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
    <div>获取参数：{{ route.query.msg }}</div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
```

## Components

> 在 `Nuxt` 中，你可以在 `app/components/` 目录中创建这些组件，它们会在应用中自动可用，无需显式导入。

app/components/AppAlert.vue

```vue
<template>
  <span style="background-color: red;">
    <slot />
  </span>
</template>
```

在 `app/pages/index.vue` 中使用 `AppAlert` 组件，无需 导入

app/pages/index.vue

```vue
<template>
  <div>
    <h1>Welcome to the homepage</h1>
  </div>
  <AppAlert> This is an auto-imported component. </AppAlert>
</template>
```

![alt text](image-2.png)

## Layouts

> 在 `Nuxt` 中，你可以在 `app/layouts/` 目录中创建布局文件

具体步骤可以参考官方文档：https://nuxt.zhcndoc.com/docs/4.x/directory-structure/app/layouts

简单使用：

1. 创建 `app/layouts/default.vue` 文件
   app/layouts/default.vue

```vue
<template>
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
```

2. 创建 `app/components/AppHeader.vue` 文件
   app/components/AppHeader.vue

```vue
<template>
  <div>头部</div>
</template>
```

3. 创建 `app/components/AppFooter.vue` 文件
   app/components/AppFooter.vue

```vue
<template>
  <div>底部</div>
</template>
```

4. 在 `app/app.vue` 中使用

app/app.vue

```vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```

效果
![alt text](image-3.png)

## middleware （中间件）

`Nuxt` 提供一个可自定义的路由中间件（`route middleware`）框架，可在整个应用中使用，适合提取你希望在导航到特定路由之前运行的代码。

路由中间件有三种类型：

- 匿名（或内联）路由中间件，直接在页面内定义。
- 命名路由中间件，放置在 `app/middleware/` 中，使用时会通过异步导入自动加载。
- 全局路由中间件，放置在 `app/middleware/` 中并带有 `.global` 后缀，会在每次路由变化时运行。

前两种路由中间件可以在 `definePageMeta` 中定义。

例如，我们创建一个 `app/middleware/auth.ts` 文件，并添加以下内容：
app/middleware/auth.ts

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  // 判断⽤户是否已经登录
  let authUser = false;
  if (!authUser) {
    return navigateTo("/login");
  }
});
```

当我们要使用这个中间件时，可以在页面中使用 `definePageMeta()` 并传入`middleware`
性，来添加路由中间件。
比如我们在`about.vue`页面使用:

app/pages/about.vue

```vue
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
```

如果中间件有多个，你也可以使用阵列来传入多个中间件，并且会依序执行这些路由中间件。

```vue
<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "other"],
});
</script>
```

### 匿名（或内联）路由中间件

直接在使用它们的页面中定义,例如，直接定义一个匿名的中间件在页面元件中使用:
app/pages/about.vue

```vue
<script setup lang="ts">
// definePageMeta({
//     middleware: 'auth'
// })
definePageMeta({
  middleware: defineNuxtRouteMiddleware(() => {
    let authUser = false;
    if (!authUser) {
      return navigateTo("/login");
    }
  }),
});
</script>
```

### 命名路由中间件

在 `app/middleware/` 中创建一个中间件文件，例如 `app/middleware/auth.ts`。

### 全局路由中间件

全局路由中间件，放置在`middleware/`目录中(带有`.global`后缀)，并将在每次路由更改时自动运行。

如下例子，我们在`middleware/`创建一个`01.run.global.ts`中间件:
app/middleware/01.run.global.ts

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  console.log(`全局路由中间件 to: ${to.path}, from: ${from.path}`);
});
```

全局路由中间件，将会在每一次导航切换页面时执行。

中间件执行顺序等更多中间件内容请查看：https://nuxt.zhcndoc.com/docs/4.x/directory-structure/app/middleware

## plugins 插件

> `Nuxt` 有一个插件系统，可在创建 `Vue` 应用时使用 `Vue` 插件及其他功能。
> `Nuxt` 会自动读取 `app/plugins/` 目录下的文件，并在创建 Vue 应用时加载它们。
> 所有插件都会被自动注册，你不需要在 `nuxt.config` 中单独添加它们。
> 你可以在文件名中使用 `.server` 或 `.client` 后缀，仅在服务器或客户端加载插件。

### 已注册的插件

只有目录顶层的文件（或任意子目录内的 index 文件）会被自动注册为插件。

Directory structure

```bash
-| plugins/
---| foo.ts      // scanned
---| bar/
-----| baz.ts    // not scanned
-----| foz.vue   // not scanned
-----| index.ts  // currently scanned but deprecated
```

只有 `foo.ts` 和 `bar/index.ts` 会被注册。

要在子目录中添加插件，可以在 `nuxt.config.ts` 中使用 `app/plugins` 选项：

nuxt.config.ts

```ts
export default defineNuxtConfig({
  plugins: ["~/plugins/bar/baz", "~/plugins/bar/foz"],
});
```

### 创建插件

```ts
// app/plugins/myPlugin.ts
export default defineNuxtPlugin(() => {
  return {
    // 自动提供辅助函数，返回辅助函数
    provide: {
      myPlugin: (msg: string) => `Hello ${msg}`,
    },
  };
});
```

使用插件

```vue
<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
    <div>获取参数：{{ route.query.msg }}</div>

    <div>使用插件:{{ $myPlugin("Nuxt3") }}</div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();

// definePageMeta({
//     middleware: 'auth'
// })
definePageMeta({
  middleware: defineNuxtRouteMiddleware(() => {
    let authUser = true;
    if (!authUser) {
      return navigateTo("/login");
    }
  }),
});

const { $myPlugin } = useNuxtApp();
</script>
```

![alt text](image-5.png)

## 安装模块 Pinia

模块商店：https://nuxt.zhcndoc.com/modules

一步到位

```bash
npx nuxt@latest module add pinia
```

或者 手动安装

```bash
pnpm add @pinia/nuxt pinia
```

配置 `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
});
```

数据持久化 (Persistedstate)

```bash
pnpm add @pinia-plugin-persistedstate/nuxt
```

启用配置

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt' // 引入持久化模块
  ],
}
```

在 `app`目录下创建 `stores/` 文件夹，并创建 `myStore.ts` 文件

```ts
import { defineStore } from "pinia";

export const useMyStore = defineStore("myStore", {
  state: () => ({
    counter: 1,
    token: "2423534543",
  }),
  getters: {
    doubleCounter: (state) => state.counter * 2,
  },
  actions: {
    add() {
      this.counter++;
    },
  },
});
```

使用pinia

app/pages/pinia.vue

```vue
<template>
  <div>
    <div>使用Pinia：{{ counter }} - {{ doubleCounter }}</div>
    <button @click="myStore.add()">+</button>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMyStore } from "~/stores/myStore";
const myStore = useMyStore();
const { counter, doubleCounter } = storeToRefs(myStore);
console.log("myStore", counter, doubleCounter);
</script>
```

![alt text](image-6.png)

### 持久化存储

`app/stores/myStore.ts` 文件

```ts
import { defineStore } from "pinia";

export const useMyStore = defineStore("myStore", {
  state: () => ({
    counter: 1,
    token: "2423534543",
  }),
  getters: {
    doubleCounter: (state) => state.counter * 2,
  },
  actions: {
    add() {
      this.counter++;
    },
  },
  persist: {
    // 默认是localStorage
    // storage: persistedState.localStorage,

    // 存到sessionStorage中
    // storage: persistedState.sessionStorage,
    // paths: ['token'],//选择要存储的字段

    // 存到cookie中
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
    }),
    paths: ["token"],
  },
});
```

## composables 状态管理之 useState

在`Nuxt`中，通过 `useState()`，你可以像使用一个`ref()`一样来管理我们的应用状态，这种方式不仅简单方便，重点是它对`SSR`友好。通过 `useState()`存储的状态能在`server` 和`client` 之间共享保留。

可以跨组件创建响应性的、对`ssr`友好的共享状态。`useState`只能在组件的`setup`阶段或者生命周期钩子中使用，而不能在函数的内部、循环或条件语句中使用。

创建一个 `app/composables/state.ts` 文件

```ts
export const useCounter = () => useState("counter", () => 1);
```

在页面中使用：

app/pages/composables.vue

```vue
<template>
  <div>
    <div>{{ counter }}</div>
    <button @click="add">+</button>
  </div>
</template>

<script setup lang="ts">
const counter = useCounter();

const add = () => {
  counter.value++;
};
</script>
```

![alt text](image-7.png)

用户的登录状态、用户信息等都可以以此方式实现数据共享。

1. SSR 友好（服务端渲染同步） useState 的核心优势在于它能解决服务端和客户端的状态不一致问题。在 SSR 模式下，服务端获取的用户数据会通过 useState 序列化并注入到 HTML 中。当页面在浏览器加载（水合）时，客户端会直接复用服务端传来的状态，而不是重新初始化。这避免了页面闪烁（例如先显示"未登录"再跳变为"已登录"），确保了首屏内容的准确性。

2. 全局响应式共享 useState 创建的是全局单例状态。只要使用相同的 key（例如 useState('user')），无论是在布局文件、导航栏组件还是页面深处，获取到的都是同一个响应式对象。这意味着一旦用户信息更新，所有引用该状态的组件都会自动更新，无需复杂的 props 传递或事件总线。

3. 简化跨组件通信 相比于 Pinia 等外部状态管理库，useState 无需额外安装依赖或配置 store 文件，非常适合存储简单的全局状态（如当前用户信息、主题设置等）。它像 ref 一样易用，但具备了跨组件和跨服务端/客户端的生命周期管理能力。

注意：useState 本身不持久化数据到磁盘（如 LocalStorage）。刷新页面后数据"存在"是因为触发了新的 SSR 请求，服务端根据 Cookie/Session 重新获取了用户信息并再次通过 useState 传给客户端。如果需要浏览器关闭后依然保持登录，需配合 Cookie 或 LocalStorage 使用。

## useCookie

Nuxt 提供了一个组合式函数 `useCookie()` 来让我们可以读写 Cookie

```ts
const cookie = useCookie(name, options);
```

### 参数说明

#### name

- 类型：`string`
- 描述：对应的就是 cookie 的 key

#### options

设置多个 cookie 属性，支持以下配置：

| 属性       | 类型                          | 默认值      | 说明                                                                                                                                                                                                                   |
| ---------- | ----------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maxAge`   | `number`                      | `undefined` | 指定 `Max-Age` 属性的值，单位是秒。如果没有设置，则这个 cookie 将会是 Session Only，意即网页关闭后就会消失。                                                                                                           |
| `expires`  | `Date`                        | `undefined` | 指定一个 Date 物件来作为过期的时间，通常会保持预设，表是适用于自己的 Domain 之下。默认情况下，未设置任何域，大多数客户端将认为 cookie 仅适用于当前域。                                                                 |
| `httpOnly` | `boolean`                     | `false`     | 是一个布尔值，默认为 false，当设置为 true 时，表示客户端的 JavaScript 将无法使用 `document.cookie` 来查看这个 cookie。通常是比较敏感或机密的讯息，如 Token 或 Session Id 会设定为 true，只让浏览器发出请求时自动夹带。 |
| `secure`   | `boolean`                     | `false`     | 是一个布尔值，默认为 false，当设置为 true 时浏览器得是 HTTPS 的加密传输协定的情境下，才会自动夹带这个 cookie。                                                                                                         |
| `domain`   | `string`                      | 当前域名    | 指定 cookie 可以适用的 Domain，通常会保持预设，表是适用于自己的 Domain 之下。默认情况下，未设置任何域，大多数客户端将认为 cookie 仅适用于当前域。                                                                      |
| `path`     | `string`                      | `/`         | 指定 cookie 适用的路径。                                                                                                                                                                                               |
| `sameSite` | `'strict' \| 'lax' \| 'none'` | `'lax'`     | 用于设定安全策略，防止 CSRF 攻击。                                                                                                                                                                                     |
| `encode`   | `Function`                    | 默认编码    | 由于 cookie 的值只能使用有限的字元集，所以这个设置可以将 cookie 编码成合法的字串值，默认的编码是使用 `JSON.stringify()` + `encodeURIComponent()`。                                                                     |
| `decode`   | `Function`                    | 默认解码    | cookie 会经过一个解码的过程，默认的解码是使用 `decodeURIComponent()` + `JSON.parse()`。                                                                                                                                |
| `default`  | `Function`                    | `undefined` | 为一个函数，可以用于回传 cookie 的默认值，也可以是回传一个 Ref。                                                                                                                                                       |

### 示例用法

#### 1. 创建并读取 Cookie

```vue
<script setup>
const myCookie = useCookie("userToken", {
  maxAge: 60 * 60 * 24, // 24小时
  httpOnly: true,
  secure: true,
  sameSite: "strict",
});
</script>

<template>
  <div>
    <p>Token: {{ myCookie }}</p>
    <button @click="myCookie.value = 'new-token'">更新 Token</button>
  </div>
</template>
```

#### 2. 设置默认值

```ts
const theme = useCookie("theme", {
  default: () => "light", // 默认值为 'light'
});
```

#### 3. 自定义编码/解码

```ts
const data = useCookie("userData", {
  encode: (value) => btoa(JSON.stringify(value)),
  decode: (value) => JSON.parse(atob(value)),
});
```

### 注意事项

- `useCookie` 返回的是一个响应式的 `Ref`，可以直接在模板中绑定或在逻辑中修改。
- 在 SSR 环境下，`useCookie` 能正确处理服务端与客户端的状态同步。
- 若需持久化存储（如登录状态），推荐结合 Pinia 的 `cookiesWithOptions` 存储方式使用。

> 📌 提示：`useCookie` 是 Nuxt 3 中管理 Cookie 的推荐方式，相比手动操作 `document.cookie` 更加安全、简洁且具备响应式能力。

案例：

```ts
//存到useCookie里
const accessTokenCookie = useCookie("accessToken", {
  maxAge: 60 * 60 * 24 * 7,
});
accessTokenCookie.value = "accessToken";
```

```ts
//取 accessTokenCookie
const accessToken = useCookie("accessToken");
console.log(accessToken.value);
```

注意：

- useCookie 只在 setup 或 Lifecycle Hooks 期间工作。
- useCookie ref自动将cookie值序列化和反序列化为JSON。

# Nuxt `useHead` 使用指南

`useHead` 是 Nuxt 3 提供的组合式 API，用于在组件或页面级别动态管理 HTML 头部（`<head>`）内容，如标题、meta 标签、链接、脚本等。它基于 [Unhead](https://unhead.unjs.io/)，支持服务端渲染和客户端渲染，并且能智能合并多个组件输入的头部信息。

---

## 基本用法

在 `<script setup>` 或普通 `setup()` 函数中直接调用即可：

```vue
<script setup>
useHead({
  title: "我的页面",
  meta: [{ name: "description", content: "页面描述" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
});
</script>
```

## useFetch

useFetch 的参数和返回值

```ts
export function useFetch<DataT, ErrorT>(
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>,
): Promise<AsyncData<DataT, ErrorT>>;

type UseFetchOptions<DataT> = {
  key?: MaybeRefOrGetter<string>;
  method?: MaybeRefOrGetter<string>;
  query?: MaybeRefOrGetter<SearchParams>;
  params?: MaybeRefOrGetter<SearchParams>;
  body?: MaybeRefOrGetter<RequestInit["body"] | Record<string, any>>;
  headers?: MaybeRefOrGetter<
    Record<string, string> | [key: string, value: string][] | Headers
  >;
  baseURL?: MaybeRefOrGetter<string>;
  cache?:
    | false
    | "default"
    | "force-cache"
    | "no-cache"
    | "no-store"
    | "only-if-cached"
    | "reload";
  server?: boolean;
  lazy?: boolean;
  immediate?: boolean;
  getCachedData?: (
    key: string,
    nuxtApp: NuxtApp,
    ctx: AsyncDataRequestContext,
  ) => DataT | undefined;
  deep?: boolean;
  dedupe?: "cancel" | "defer";
  timeout?: number;
  default?: () => DataT;
  transform?: (input: DataT) => DataT | Promise<DataT>;
  pick?: string[];
  $fetch?: typeof globalThis.$fetch;
  watch?: MultiWatchSources | false;
};

type AsyncDataRequestContext = {
  /** The reason for this data request */
  cause: "initial" | "refresh:manual" | "refresh:hook" | "watch";
};

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | undefined>;
  pending: Ref<boolean>;
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>;
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>;
  clear: () => void;
  error: Ref<ErrorT | undefined>;
  status: Ref<AsyncDataRequestStatus>;
};

interface AsyncDataExecuteOptions {
  dedupe?: "cancel" | "defer";
  timeout?: number;
  signal?: AbortSignal;
}

type AsyncDataRequestStatus = "idle" | "pending" | "success" | "error";
```

### 参数

| Option        | Type                                                                    | Default    | Description                                                                        |
| ------------- | ----------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------- |
| key           | `MaybeRefOrGetter<string>`                                              | `auto-gen` | 用于去重的唯一键。如果未提供，会根据 URL 和选项生成。                              |
| method        | `MaybeRefOrGetter<string>`                                              | `'GET'`    | HTTP 请求方法。                                                                    |
| query         | `MaybeRefOrGetter<SearchParams>`                                        | -          | 要附加到 URL 的查询/搜索参数。别名：params。                                       |
| params        | `MaybeRefOrGetter<SearchParams>`                                        | -          | query 的别名。                                                                     |
| body          | `MaybeRefOrGetter<RequestInit['body'] \| Record<string, any>>`          | -          | 请求体。对象会被自动序列化为字符串。                                               |
| headers       | `MaybeRefOrGetter<Record<string, string> \| [key, value][] \| Headers>` | -          | 请求头。                                                                           |
| baseURL       | `MaybeRefOrGetter<string>`                                              | -          | 请求的基础 URL。                                                                   |
| cache         | `false \| string`                                                       | -          | 缓存控制。布尔值会禁用缓存，或使用 Fetch API 的取值：default、no-store 等。        |
| server        | `boolean`                                                               | `true`     | 是否在服务器端获取数据。                                                           |
| lazy          | `boolean`                                                               | `false`    | 如果为 true，则在路由加载后解析（不阻塞导航）。                                    |
| immediate     | `boolean`                                                               | `true`     | 如果为 false，则阻止请求立即触发。                                                 |
| default       | `() => DataT`                                                           | -          | 在异步解析前，作为 data 的默认值工厂函数。                                         |
| timeout       | `number`                                                                | -          | 以毫秒为单位的等待时间，在此时间后超时终止请求（默认为 undefined，表示不设置超时） |
| transform     | `(input: DataT) => DataT \| Promise<DataT>`                             | -          | 在解析结果后对结果进行转换的函数。                                                 |
| getCachedData | `(key, nuxtApp, ctx) => DataT \| undefined`                             | -          | 返回缓存数据的函数。下面将介绍默认实现。                                           |
| pick          | `string[]`                                                              | -          | 仅从结果中提取指定的键。                                                           |
| watch         | `MultiWatchSources \| false`                                            | -          | 要监听并自动刷新的一组响应式源数组。false 将禁用监听。                             |
| deep          | `boolean`                                                               | `false`    | 在深度 ref 对象中返回数据。                                                        |
| dedupe        | `'cancel' \| 'defer'`                                                   | `'cancel'` | 避免同一个 key 同时被获取多次。                                                    |
| $fetch        | `typeof globalThis.$fetch`                                              | -          | 自定义的 $fetch 实现。参考 Nuxt 中的自定义 useFetch                                |

### 返回值

| Name    | Type                                                | Description                                                                                                                                       |
| ------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| data    | `Ref<DataT \| undefined>`                           | 异步获取的结果。                                                                                                                                  |
| refresh | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | 用于手动刷新数据的函数。默认情况下，Nuxt 会等待 refresh 完成后，才能再次执行。                                                                    |
| execute | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | refresh 的别名。                                                                                                                                  |
| error   | `Ref<ErrorT \| undefined>`                          | 如果数据获取失败，则为错误对象。                                                                                                                  |
| status  | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>`  | 数据请求的状态。可能的取值请参见下文。                                                                                                            |
| pending | `Ref<boolean>`                                      | 布尔标志，指示当前请求是否正在进行中。                                                                                                            |
| clear   | `() => void`                                        | 将 data 重置为 undefined（若提供了 options.default() 则重置为其返回值），将 error 重置为 undefined，将 status 设为 idle，并取消任何待处理的请求。 |

```ts
const param1 = ref("value1");
const { data, pending, error, refresh } = await useFetch(
  "https://api.nuxts.dev/mountains",
  {
    query: { param1: param1.value, param2: "value2" },
    server: false, //设置为false就可以在浏览器中看到
  },
);
```

更多使用文档：https://nuxt.zhcndoc.com/docs/4.x/api/composables/use-fetch

## useFetch() 的封装

app/composables/useHttpFetch.ts

```ts
import { callWithNuxt } from "#app";

interface myFetchOptions {
  headers?: Record<string, string>;
  [key: string]: any;
}

// const getBaseUrl = () => {
//     let baseURL = ''
//     if (process.env.NODE_ENV === 'production') {
//         //生产环境
//         if (process.server) {
//             //SSR请求内网
//             baseURL = 'http://127.0.0.1:3000/'
//         } else {
//             baseURL = 'http://jbook.XXX.com/'
//         }
//     } else {
//         //本地开发环境
//         baseURL = 'http://127.0.0.1:3000/'
//     }
//     baseURL = 'http://127.0.0.1:3000/'
//     return baseURL
// }
export const useHttpFetch = (url: string, opt: myFetchOptions) => {
  //token
  const accessToken = useCookie("accessToken");
  //添加请求头和token
  const headers = {
    ...opt.headers,
    ...(accessToken.value
      ? { Authorization: `Bearer ${accessToken.value}` }
      : {}),
  };
  opt.headers = headers;
  const nuxtApp = useNuxtApp();
  return useFetch(url, {
    ...opt,
    // baseURL: getBaseUrl(),//基本url
    onRequest({ request, options }) {
      console.log("request", request);
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
      console.log("request", request);
    },
    async onResponse({ request, response, options }) {
      // Process the response data
      //自定义处理数据
      // if (response._data.code === 0){
      //    //处理
      //     response._data = response._data.data
      // }else{
      //
      // }
    },
    async onResponseError({ request, response, options }) {
      // Handle the response errors
      console.log("error", response.status);
      //https://github.com/nuxt/nuxt/issues/14771
      //未登录401状态
      if (response.status === 401) {
        await callWithNuxt(nuxtApp, navigateTo, [
          "/sign_in",
          { replace: true, redirectCode: 401 },
        ]);
      } else if (response.status === 500) {
        console.log("服务器报错！！");
      }
    },
  });
};

//定义接口
export const userInfoFetch = (opt: myFetchOptions) => {
  return useHttpFetch("/user/info", opt);
};
```

## 服务器端路由

### 路由介绍

`Nuxt` 的服务端路由同客户端一样，都是通过文件目录结构来自动生成的。

在`Nuxt`项目根目录下创建`server/`目录，用于存放服务器端文件，包括路由、`API`、数据库访问等。

`Nuxt`将自动扫描 `~/server/api`, `~/server/routes`,和 `~/server/middleware` 目录中的文件，以注册具有`HMR`支持的`API`和服务器处理程序。

每个文件都应该导出一个用 `defineEventHandler()`定义的默认函数。

例子：

~/server/api/hello.ts

```ts
export default defineEventHandler((event) => {
  return {
    api: "world",
  };
});
```

页面使用：

app/pages/fetch.vue

```vue
<template></template>

<script setup>
const data = await $fetch("/api/hello");
</script>

<style lang="scss" scoped></style>
```

| 接口文件                 | Method | 最终路由地址 | 说明                                                               |
| ------------------------ | ------ | ------------ | ------------------------------------------------------------------ |
| server/api/hello.ts      | GET    | /api/hello   | 默认认为GET方式                                                    |
| server/api/hello.get.ts  | GET    | /api/hello   | 支持ts                                                             |
| server/api/hello.get.js  | GET    | /api/hello   | 支持js                                                             |
| server/api/hello.post.ts | POST   | /api/hello   | 句柄文件名可以用.get, .post, .put, .delete等作为后缀来HTTP请求方法 |

### 自定义API路由前缀

`~/server/api`中的文件在它们的路由中会自动以`/api`作为前缀。对于添加没有`/api`前缀的服务器路由，您可以将它们放到`~/server/routes`目录中。

```ts
// ~/server/routes/hello.ts
export default defineEventHandler((event) => {
  return {
    api: "world2",
  };
});
```

![alt text](image-8.png)

## 服务端中间件

我们一个`HTTP`请求到达服务端都可能会经过中间件，我们可以在中间件处理一些简单的业务逻辑，比如`JWT鉴权`、`日志追踪`等工作。
`Nuxt`里面`Server`中间件
`Nuxt`支持为`API`创建请求中间件。
`Nuxt`将自动读入`~/server/middleware`中的任何文件，为项目创建服务器中间件。
注意:中间件处理程序不应该返回任何东西(也不关闭或响应请求)并且只检查或扩展请求上下文或抛出错误。

例子：

```ts
// ~/server/middleware/request.ts
export default defineEventHandler((event) => {
  console.log("New request: " + event.node.req.url);
});
```

![alt text](image-9.png)

```ts
// ~/server/middleware/cors.ts
// 全局配置跨域资源共享（CORS）策略，并处理预检请求
export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "*",
  });
  if (getMethod(event) === "OPTIONS") {
    setResponseStatus(event, 204);
    return "OK";
  }
});
```

## 安装 MySQL

使用 `Docker` 快速部署 `MySQL` 数据库服务，适用于开发与测试环境。

### 命令示例

```bash
docker run -d \
  -p 3306:3306 \
  --name mysql \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -v ./db:/var/lib/mysql \
  --restart always \
  mysql:8.0

```

| 参数                            | 说明                                                                                          |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| `-d`                            | 以后台模式运行容器。                                                                          |
| `--name mysql`                  | 为容器指定名称为 mysql，便于后续管理。                                                        |
| `-e MYSQL_ROOT_PASSWORD=123456` | 设置 MySQL 的 root 用户密码为 123456。建议在生产环境中使用更复杂的密码。                      |
| `-v ./db:/var/lib/mysql`        | 将容器内的数据库文件挂载到本地当前目录下的 db/ 目录，实现数据持久化。重启容器后数据不会丢失。 |
| `-p 3306:3306`                  | 将容器的 3306 端口映射到宿主机的 3306 端口，可通过本地访问 MySQL。                            |
| `--restart always`              | 容器启动后若异常退出，Docker 会自动重启该容器，确保服务持续运行。                             |
| `mysql:8.0`                     | 使用 MySQL 8.0 版本的官方镜像。                                                               |

来到 `~/deploy/`目录下，创建一个名为 `docker-compose.yml` 的文件，并添加以下内容：

```yaml
version: "3.8"
services:
  mysql:
    image: mysql:8.0
    container_name: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 123456
    ports:
      - "3307:3306"
    volumes:
      - ./db:/var/lib/mysql
```

在当前目录执行命令启动 MySQL 服务：

```bash
docker-compose up -d
```

`-d` 参数表示以后台模式运行容器。 启动成功后，可以通过 `docker ps` 命令查看容器状态。

### 创建数据库

![alt text](image-10.png)

sql建表语句

```sql

DROP TABLE IF EXISTS `notebook_notes`;
CREATE TABLE `notebook_notes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `notebook_id` int NOT NULL DEFAULT '0' COMMENT '文集id',
  `note_id` int NOT NULL DEFAULT '0' COMMENT '文章id',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `notebooks`;
CREATE TABLE `notebooks` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `uid` int unsigned NOT NULL DEFAULT '0' COMMENT '关联用户id',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '文集名称',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `notes`;
CREATE TABLE `notes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `uid` int unsigned NOT NULL DEFAULT '0' COMMENT '关联用户id',
  `title` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '文章名',
  `content_md` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章内容',
  `state` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '头像',
  `nickname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `phone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '手机号',
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '密码',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


```

mysql的教程链接：https://tehub.com/b/show/bFWKZLsZMr/chapter/bFWSznWPBU

### 连接mysql

```bash
docker exec -it mysql mysql -uroot -p123456
```

`docker exec`
功能：在已运行的 `Docker`容器中执行命令。

```bash
docker exec <container_name> <command>
```

`-it`：交互式终端

`mysql`（第一个）：容器名

`mysql -uroot -p123456`：在容器内执行的命令（即启动 `MySQL` 客户端）

## mysql2

### Node.js MySQL2 简介

mysql2 是一个轻量级、高性能 的 MySQL 数据库驱动程序，基于 Node.js 编写，广泛用于于在 Node.js 应用中连接和操作 MySQL 数据库。

它支持大多数 MySQL 版本（包括 5.7、8.0 等），并提供丰富的的 API 接口，能够满足各类开发需求。

### 主要特性

- 兼容 连接：支持连接池（Connection Pool），提升高性能与资源利用率。
- 事务处理：支持完整的事务管理，确保数据一致性。
- 预处理语句：支持参数化查询，避免 SQL 注入风险。
- 多语句查询：可一次性执行多个 SQL语句，提高效率。
- 异步支持：同时支持 Promise 和 Callback 两种方式处理异步操作，灵活适配不同编程风格。
- 流式查询：支持大结果集的流式读取，节省内存。
- 自动重连：网络中断时可自动尝试重连，增强稳定性。

> github 地址： https://github.com/sidorares/node-mysql2

### 使用步骤

```bash
pnpm install --save mysql2
```

```ts
// ~/server/utils/mysql2-test.ts
import mysql from "mysql2";
const connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "123456",
  database: "jbook",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});
```

![alt text](image-11.png)

完整代码

```ts
// ~/server/utils/mysql2-test.ts
import mysql from "mysql2";
const connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "123456",
  database: "jbook",
});
// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL database!');
// });

// 查询数据
// connection.query('SELECT * FROM users', (err, results) => {
//     if (err) throw err;
//     console.log(results); // 输出查询结果，数组中包含所有记录
// });

// 插入数据
// const data = { nickname: 'John Doe', phone: '13866666666' };
// connection.query('INSERT INTO users SET ?', data, (err, result) => {
//     if (err) throw err;
//     console.log('Number of records inserted: ' + result.affectedRows); // Number of records inserted: 1
// });

// 更新数据
// const data = { phone: '13866666667' };
// connection.query('UPDATE users SET ? WHERE nickname = ?', [data, 'John Doe'], (err, result) => {
//     if (err) throw err;
//     console.log('Number of records updated: ' + result.affectedRows); // Number of records updated: 1
// });

// 删除数据
connection.query(
  "DELETE FROM users WHERE nickname = ?",
  "John Doe",
  (err, result) => {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows); // Number of records deleted: 1
  },
);
```

### 使用连接池

使用连接池可以提高Node MySQL2模块的性能和效率。连接池是一组预先创建的数据库连接，可以在需要时重复使用这些连接，而不是每次都创建一个新的连接。这可以减少连接数据库的时间和资源消耗，从而提高应用程序的性能。

以下是使用连接池的示例代码:

```ts
// ~/server/utils/mysql2-pool.ts
import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "123456",
  database: "jbook",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  connection.query("SELECT * FROM users", (error, results) => {
    connection.release(); // 释放连接回连接池
    if (error) throw error;
    console.log(results);
  });
});
```

运行命令

```bash
node mysql2-pool.ts
```

### .promise()函数

使用.promise() 函数可以将Node MySQL2中的回调函数转换为Promise，从而可以使用 async/await 语法来编写更简洁和易于理解的异步代码。

以下是使用.promise()函数的示例代码:

```ts
// ~/server/utils/mysql2-pool-promise.ts
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "123456",
  database: "jbook",
});

const query = "SELECT * FROM users";
connection
  .promise()
  .query(query)
  .then(([rows, fields]) => {
    console.log(rows);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    connection.end();
  });
```

运行命令

```bash
node mysql2-pool-promise.ts
```

在上面的代码中，我们使用.promise()函数将query 方法转换为Promise。我们使用.then()方法处理查询结果，使用 .catch()方法处理错误，使用.finally()方法关闭数据库连接。

```ts
// ~/server/utils/db/mysql/index.ts
import mysql from "mysql2";
//连接池
export const getDB = () => {
  return mysql
    .createPool({
      host: "127.0.0.1", //数据库地址
      port: "3307", //数据库端口
      database: "jbook", //数据库名称
      user: "root", //数据库用户名
      password: "123456", //数据库密码
      waitForConnections: true, //等待连接池分配连接
      connectionLimit: 10, //连接池最大连接数
      queueLimit: 0, //当连接池中的所有连接都被占用时，新的请求将无限期等待，直到有连接释放出来，而不会立即报错
    })
    .promise();
};
```

创建 /server/api/user.ts

```ts
import { getDB } from "../utils/db/mysql";

export default defineEventHandler(async () => {
  const [rows, fields] = await getDB().query("SELECT * FROM users");
  console.log(123455, rows);
  return rows;
});
```

## 注册接口

在`server/api`目录下创建 `auth/`目录存放我们用户相关的接口。创建一个注册接口文件`register.post.ts`

首先梳理一下注册流程:
`接收客户端传来的参数`->`参数校验`->`判断账号是否存在`->`已存在则提示登录`，`未存在则创建账号`。

### 参数校验库joi

官网文档：https://joi.dev/

安装：

```bash
pnpm add joi
```

使用：

```ts
// ~/server/api/auth/register.post.ts

import Joi from "joi";

// 定义输入数据的验证规则
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18),
});

// 验证输入数据
const { error, value } = schema.validate({
  username: "danilo",
  email: "danilo@example.com",
  age: 28,
});
```

### 密码加密库md5

https://github.com/pvorb/node-md5

安装：

```bash
pnpm add md5
```

### 封装responseJson接口返回函数

`~/server/utils/helper` 目录下创建`index.ts` 文件:

```ts
// ~/server/utils/helper/index.ts
export const responseJson = (code: number, msg: string, data: any) => {
  return {
    code: code,
    msg: msg,
    data: data,
  };
};
```

### 完整注册代码

```ts
// ~/server/api/auth/register.post.ts
import Joi from "joi";
import md5 from "md5";
import { responseJson } from "~~/server/utils/helper";
import { getDB } from "~~/server/utils/db/mysql";
import type { ResultSetHeader } from "mysql2/promise"; // 引入类型定义

/**
 * 用户注册接口 (POST /api/auth/register)
 */
export default defineEventHandler(async (event) => {
  // 获取请求体中的数据
  const body = await readBody(event);
  console.log("🚀 ~ body:", body);

  try {
    // 校验数据
    const schema = Joi.object({
      nickname: Joi.string().min(2).max(20).required().messages({
        "string.min": "昵称至少2个字符",
        "string.max": "昵称最多20个字符",
        "string.empty": "昵称不能为空", // 处理空字符串情况
        "any.required": "昵称不能为空", // 处理字段缺失情况
      }),
      phone: Joi.string()
        .required()
        .pattern(/^1[3-9]\d{9}$/)
        .messages({
          "string.pattern.base": "手机号格式不正确",
          "string.empty": "手机号不能为空",
          "any.required": "手机号不能为空",
        }),
      password: Joi.string().min(6).max(20).required().messages({
        "string.min": "密码至少6个字符",
        "string.max": "密码最多20个字符",
        "string.empty": "密码不能为空",
        "any.required": "密码不能为空",
      }),
    });

    // validateAsync 成功时返回 value，失败时抛出异常
    // abortEarly: false 确保收集所有错误
    await schema.validateAsync(body, { abortEarly: false });
  } catch (error: any) {
    // 如果是 Joi 校验错误
    if (error.isJoi) {
      // 提取所有错误信息，用逗号分隔
      // error.details 是一个数组，每个元素包含 message, path, type 等
      const messages = error.details
        .map((detail: any) => detail.message)
        .join(", ");
      console.warn("🚀 ~ 校验失败:", messages);
      return responseJson(400, messages, null);
    }
    // 其他未知错误
    console.error("🚀 ~ 校验过程异常:", error);
    return responseJson(400, "参数格式错误", null);
  }

  // 注意：生产环境建议使用 bcrypt 等更强加密，而非 MD5 + 硬编码盐值
  const salt = "$2b$10$killsldksjfslskfsdjlfxmv";
  const password = md5(md5(body.password) + salt);

  const con = getDB();
  try {
    // 查询数据库，判断手机号是否已经注册
    // execute 返回 [rows, fields]，这里只需要 rows
    const [rows] = await con.execute(
      "SELECT * FROM `users` WHERE `phone` = ?",
      [body.phone],
    );

    // 确保 rows 是数组且长度大于0
    if (Array.isArray(rows) && rows.length > 0) {
      return responseJson(400, "手机号已被注册", null);
    }

    // 创建账号，插入新用户
    // execute 返回 [ResultSetHeader, FieldPacket[]]
    const [result] = (await con.execute(
      "INSERT INTO `users` (`nickname`, `phone`, `password` ) VALUES (?, ?, ?)",
      [body.nickname, body.phone, password],
    )) as [ResultSetHeader, any]; // 类型断言，明确 result 是 ResultSetHeader

    if (result.affectedRows === 1) {
      return responseJson(200, "注册成功", null);
    }
  } catch (error) {
    console.error("🚀 ~ error:", error);
    return responseJson(500, "服务器内部错误", null);
  } finally {
    // 连接池会自动管理连接生命周期，通常不需要手动关闭连接。他会自动回收连接，除非你明确需要关闭整个连接池。
    //  connection.release()
  }
});
```

### 接口test

在 `~/test` 目录下创建 `test.http` 文件,安装 `VSCode REST Client` 插件：

```bash
### 注册
POST http://localhost:3000/api/auth/register HTTP/1.1
Content-Type: application/json

{
    "nickname": "张三",
    "phone": "13800138000",
    "password": "123456"
}
```

### 封装并优化接口

```ts
// ~/server/utils/helper/index.ts
import { CONSTANTS } from "~~/server/utils/constants";
import { createError } from "h3";

/** 统一 API 响应结构 */
export interface ApiResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}

/**
 * 构建标准 JSON 响应体
 * @param code 业务状态码，建议使用 `CONSTANTS` 常量
 * @param msg  提示信息
 * @param data 返回数据
 */
export const responseJson = <T = any>(
  code: number,
  msg: string,
  data: T,
): ApiResponse<T> => {
  return { code, msg, data };
};

/**
 * 抛出一个标准业务错误，会被全局错误处理器捕获并格式化
 * @param code - 业务状态码（来自 CONSTANTS 常量）
 * @param msg  - 错误提示信息
 */
export function throwBusinessError(code: number, msg: string): never {
  throw createError({
    statusCode: CONSTANTS.BAD_REQUEST, // 业务错误统一 HTTP 400
    statusMessage: "Business Error",
    data: { code, msg, data: null },
  });
}
```

```ts
// ~/server/utils/db/mysql/index.ts
import mysql from "mysql2";
import { responseJson } from "~~/server/utils/helper";
import { CONSTANTS } from "~~/server/utils/constants";
import type { PoolConnection } from "mysql2/promise";

//连接池
export const getDB = () => {
  return mysql
    .createPool({
      host: "127.0.0.1", //数据库地址
      port: "3307", //数据库端口
      database: "jbook", //数据库名称
      user: "root", //数据库用户名
      password: "123456", //数据库密码
      waitForConnections: true, //等待连接池分配连接
      connectionLimit: 10, //连接池最大连接数
      queueLimit: 0, //当连接池中的所有连接都被占用时，新的请求将无限期等待，直到有连接释放出来，而不会立即报错
    })
    .promise();
};

type TransactionCallback<T = any> = (connection: PoolConnection) => Promise<T>;

/**
 * 自动管理事务、连接和错误处理的执行器
 * @param callback - 你的业务逻辑，接收一个 connection 参数
 * @param pool - 可选，默认使用 getDB() 返回的连接池
 * @returns 业务逻辑的返回值（通常是 responseJson 结果）
 */
export async function executeWithTransaction<T = any>(
  callback: TransactionCallback<T>,
  pool = getDB(),
): Promise<T> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error: any) {
    await connection.rollback();

    // 业务错误或 H3 错误 → 继续上抛（给全局错误处理器）
    if (error.statusCode) {
      throw error;
    }

    // 未预期错误 → 记录日志并返回通用服务器错误
    console.error("[DB Transaction Error]", {
      message: error?.message,
      stack: import.meta.dev ? error?.stack : undefined,
      timestamp: new Date().toISOString(),
    });
    return responseJson(CONSTANTS.SERVER_ERROR, "服务器内部错误", null) as T;
  } finally {
    connection.release();
  }
}
```

```ts
// ~/server/utils/constants/index.ts
/**
 * 业务状态码常量
 * 与 HTTP 状态码对齐或自定义错误细分
 */
export const CONSTANTS = {
  /** 操作成功 */
  SUCCESS: 200,
  /** 请求错误 */
  BAD_REQUEST: 400,
  /** 未登录 / Token 失效 */
  UNAUTHORIZED: 401,
  /** 资源不存在 */
  NOT_FOUND: 404,
  /** 服务器内部未知错误 */
  SERVER_ERROR: 500,
  /** 业务错误：手机号已被注册 */
  PHONE_ALREADY_EXISTS: 40001,
} as const;
```

配置plugins

```ts
// ~/server/plugins/error-handler.ts

/** 统一的错误响应格式 */
interface ApiErrorResponse {
  code: number;
  msg: string;
  data: any;
}
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("error", (error: any, context) => {
    const event = context?.event;
    if (!event || !event.path.startsWith("/api/")) {
      return; // 非 API 请求交给 Nuxt 默认处理
    }

    // ========== 1. 默认错误结构 ==========
    let statusCode = 500;
    let responseBody: ApiErrorResponse = {
      code: 500,
      msg: "服务器内部错误",
      data: null,
    };

    // ========== 2. 判断是否为我们主动抛出的业务错误 ==========
    if (error?.data && typeof error.data.code === "number") {
      statusCode = error.statusCode || 400;
      responseBody = {
        code: error.data.code,
        msg: error.data.msg || "未知错误",
        data: error.data.data || null,
      };
    } else {
      // ========== 3. 非预期错误（运行时错误、数据库异常等）==========
      // 记录详细日志，生产环境可接入 ELK / Sentry
      console.error("[API Internal Error]", {
        path: event.path,
        method: event.method,
        message: error?.message,
        // 生产环境不输出 stack，开发环境保留
        stack: import.meta.dev
          ? error?.stack?.split("\n").slice(0, 3).join("\n")
          : undefined,
        timestamp: new Date().toISOString(),
      });

      // 开发环境返回具体错误消息方便调试，生产环境仅返回通用错误
      if (import.meta.dev) {
        responseBody.msg = error?.message || "内部错误";
      }
    }

    // ========== 4. 设置响应并结束 ==========
    event.node.res.statusCode = statusCode;
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(responseBody));

    // 返回 true 阻止 H3 默认渲染（否则还会输出 stack 等）
    return true;
  });
});
```

简化后的 `register.post.ts`

使用 `bcryptjs` 做密码加密

```bash
pnpm add bcryptjs
```

```ts
// ~/server/api/auth/register.post.ts
import Joi from "joi";
import bcrypt from "bcryptjs";
import { responseJson, throwBusinessError } from "~~/server/utils/helper";
import { validateBody } from "~~/server/utils/validator";
import { CONSTANTS } from "~~/server/utils/constants";
import { executeWithTransaction } from "~~/server/utils/db/mysql";
import type { ResultSetHeader } from "mysql2/promise";

const registerSchema = Joi.object({
  nickname: Joi.string().min(2).max(20).required().messages({
    "string.empty": "昵称不能为空",
    "string.min": "昵称至少2个字符",
    "string.max": "昵称最多20个字符",
    "any.required": "昵称不能为空",
  }),
  phone: Joi.string()
    .pattern(/^1[3-9]\d{9}$/)
    .required()
    .messages({
      "string.empty": "手机号不能为空",
      "string.pattern.base": "手机号格式不正确",
      "any.required": "手机号不能为空",
    }),
  password: Joi.string().min(6).max(20).required().messages({
    "string.empty": "密码不能为空",
    "string.min": "密码至少6个字符",
    "any.required": "密码不能为空",
  }),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // 校验请求体，失败会自动抛出 400 错误并返回详细信息
  const validBody = await validateBody<{
    nickname: string;
    phone: string;
    password: string;
  }>(body, registerSchema);

  // 一行搞定事务、错误处理、连接释放
  return executeWithTransaction(async (connection) => {
    // 1. 检查手机号
    const [rows] = await connection.execute(
      "SELECT * FROM `users` WHERE `phone` = ? FOR UPDATE",
      [validBody.phone],
    );
    if (Array.isArray(rows) && rows.length > 0) {
      throwBusinessError(CONSTANTS.PHONE_ALREADY_EXISTS, "手机号已注册");
    }

    // 2. 密码加密
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(validBody.password, saltRounds);

    // 3. 插入用户
    const [result] = (await connection.execute(
      "INSERT INTO `users` (`nickname`, `phone`, `password`) VALUES (?, ?, ?)",
      [validBody.nickname, validBody.phone, hashedPassword],
    )) as [ResultSetHeader, any];

    if (result.affectedRows === 1) {
      return responseJson(CONSTANTS.SUCCESS, "注册成功", null);
    }
    throw new Error("Insert failed");
  });
});
```

### 为什么要使用 `SELECT ... FOR UPDATE`（解决竞态条件）

> 如果没有 `FOR UPDATE`，在并发注册同一手机号时可能发生竞态条件（Race Condition），导致数据重复或逻辑错误。

---

#### 1. 没有 `FOR UPDATE` 时的竞态条件

假设两个用户（A、B）同时用手机号 `13800000000` 注册：

| 步骤 | 用户 A 的线程                                                                   | 用户 B 的线程                                                                                    |
| ---- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1    | `SELECT * FROM users WHERE phone = '13800000000'` → **返回空**（因 A 尚未插入） | —                                                                                                |
| 2    | —                                                                               | `SELECT * FROM users WHERE phone = '13800000000'` → **返回空**（同样还没数据）                   |
| 3    | 判定“未注册”，执行 `INSERT` → **成功**                                          | —                                                                                                |
| 4    | —                                                                               | 判定“未注册”，执行 `INSERT` →                                                                    |
|      |                                                                                 | • 若有唯一索引：数据库抛异常（难以转为友好的业务错误）<br>• 若无唯一索引：两条重复记录，数据错误 |

---

#### 2. 加上 `FOR UPDATE` 后的执行流

`SELECT ... FOR UPDATE` 会对查询到的行（或范围）加排他锁（X 锁），直到事务提交才释放，从而让并发操作**串行化**。

| 步骤 | 用户 A 的线程                                                | 用户 B 的线程                                                      |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------------ |
| 1    | 开始事务，执行 `SELECT ... FOR UPDATE` → 获得锁，返回空 `[]` | —                                                                  |
| 2    | —                                                            | 开始事务，执行 `SELECT ... FOR UPDATE` → **被阻塞**，等待 A 释放锁 |
| 3    | 继续：检查 `rows.length > 0` → `false`                       | （挂起中）                                                         |
| 4    | 加密密码，执行 `INSERT INTO users ...` → 成功                | （挂起中）                                                         |
| 5    | 事务 `COMMIT` → **释放锁**                                   | —                                                                  |
| 6    | —                                                            | 锁被释放，B 恢复，重新执行查询 → 返回 A 刚插入的记录               |
| 7    | —                                                            | 检查 `rows.length > 0` → `true`                                    |
| 8    | —                                                            | 抛出业务错误：“手机号已注册”，事务回滚                             |

---

#### 3. 具体例子（手机号 `13912345678`，users 表初始为空）

- **T1**：请求 A 进入事务  
  `SELECT * FROM users WHERE phone = '13912345678' FOR UPDATE;`  
  数据库对该记录范围加 X 锁，结果为空 `[]`。

- **T2**：请求 B 进入事务，执行相同语句  
  发现该范围已被 A 锁定，B 挂起等待。

- **T3**：请求 A 继续执行业务逻辑
  - 判断 `rows.length` 不成立
  - 加密密码
  - `INSERT INTO users (...) VALUES (...)`
  - `COMMIT` → 释放锁

- **T4**：请求 B 恢复执行
  - 查询发现手机号已存在
  - 执行 `throwBusinessError(CODE.PHONE_ALREADY_EXISTS, '手机号已注册')`
  - `ROLLBACK`

---

#### 4. 总结

`SELECT ... FOR UPDATE` 是保证数据一致性和业务正确性的关键手段，尤其适用于：

- 没有数据库唯一约束，或希望在应用层精细控制错误提示的场景。
- 即使有唯一索引，它也能先进行业务校验再抛出友好错误，避免数据库底层异常直接暴露给用户。

## 登录接口

安装 `jsonwebtoken`,npm网址： https://www.npmjs.com/package/jsonwebtoken

### JWT介绍

JWT登录是一种基于令牌的身份验证方式，其优点包括:

- 无需在服务器端存储会话状态，降低了服务器的负担。
- 令牌可以在多个服务中共享，提高了系统的可扩展性。
- 令牌包含了用户信息，可以在客户端进行解析，减少了对服务器端的请求。
- JWT令牌是经过加密的，可以提高系统的安全性。
- JWT令牌可以设置过期时间，增强了系统的安全性。

```bash
pnpm add jsonwebtoken
pnpm add -D @types/jsonwebtoken
```

```ts
// ~/server/api/auth/login.post.ts
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { responseJson, throwBusinessError } from "~~/server/utils/helper";
import { validateBody } from "~~/server/utils/validator";
import { CONSTANTS } from "~~/server/utils/constants";
import { executeWithTransaction } from "~~/server/utils/db/mysql";
// 从环境变量获取 JWT Secret，如果没有可以硬编码但不推荐
const JWT_SECRET = process.env.JWT_SECRET || "eifuisedfuvs";

const loginSchema = Joi.object({
  phone: Joi.string()
    .pattern(/^1[3-9]\d{9}$/)
    .required()
    .messages({
      "string.empty": "手机号不能为空",
      "string.pattern.base": "手机号格式不正确",
      "any.required": "手机号不能为空",
    }),
  password: Joi.string().required().messages({
    "string.empty": "密码不能为空",
    "any.required": "密码不能为空",
  }),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // 1. 校验请求体
  const validBody = await validateBody<{
    phone: string;
    password: string;
  }>(body, loginSchema);

  // 2. 数据库查询与验证
  return executeWithTransaction(async (connection) => {
    // 查询用户信息
    const [rows] = (await connection.execute(
      "SELECT * FROM `users` WHERE `phone` = ?",
      [validBody.phone],
    )) as [any[], any];

    if (!Array.isArray(rows) || rows.length === 0) {
      throwBusinessError(CONSTANTS.LOGIN_FAILED, "账号不存在或密码错误");
    }

    const user = rows[0];

    // 3. 密码比对
    const isPasswordValid = await bcrypt.compare(
      validBody.password,
      user.password,
    );

    if (!isPasswordValid) {
      throwBusinessError(CONSTANTS.LOGIN_FAILED, "账号不存在或密码错误");
    }

    // 4. 生成 Token
    const token = jwt.sign(
      {
        uid: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1小时过期
      },
      JWT_SECRET,
    );

    // 5. 返回结果
    return responseJson(CONSTANTS.SUCCESS, "登录成功", {
      accessToken: token,
      userInfo: {
        id: user.id,
        nickname: user.nickname,
        phone: user.phone,
        avatar: user.avatar,
      },
    });
  });
});
```

```bash
### 注册
POST http://localhost:3000/api/auth/register HTTP/1.1
Content-Type: application/json

{
    "nickname": "",
    "phone": "13800138001",
    "password": "123456"
}

### 登录
POST http://localhost:3000/api/auth/login HTTP/1.1
Content-Type: application/json

{
    "phone": "13800138001",
    "password": "123456"
}

```

## 服务端中间件鉴权

### 中间件鉴权

我们在`server/middleware` 目录下创建`auth.ts`来写我们的中间件。一般的中间件可以在请求到达应用程序之前或之后对请求进行处理。
但是`nuxt` 的这个中间件处理程序不应该返回任何东西(也不关闭或响应请求)并且只检查或扩展请求上下文或抛出错误。
我们先来梳理一下流程:
从`请求头中获取JWTToken`->`判断有无Token`->`验证JWT token是否正确`

鉴权中间件完整代码：

以下代码，我们通过`getHeader`函数获取到`token`,`getHeader`需要传入两个参数，分别是:`event` 和 `Authorization`
判断是否有`token`，然后通过`replace`方法去掉`Bearer`
通过`jwt.verify`进行验证，传入我们登录的时候使用的`secret`
通过上下文 `event.context.auth`判断是否有 `uid`，`uid` 为`O`则是未登录，反则已登录。

```ts
// ~/server/middleware/auth.ts
import jwt from "jsonwebtoken";

// 建议将 Secret 提取到环境变量或统一的配置文件中
const JWT_SECRET = process.env.JWT_SECRET || "eifuisedfuvs";

// 定义不需要鉴权的公开路径白名单
const PUBLIC_PATHS = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/public/", // 如果有其他公开接口
];

export default defineEventHandler(async (event) => {
  const path = event.path;

  // 1. 如果是公开路径，跳过鉴权，直接放行
  if (PUBLIC_PATHS.some((p) => path.startsWith(p))) {
    return;
  }

  // 2. 获取 Token
  const authHeader = getHeader(event, "Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createError({ statusCode: 401, message: "未提供认证令牌" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    // 3. 验证 Token
    // jwt.verify 返回的就是 sign 时传入的对象 { uid, exp }
    const decoded = jwt.verify(token, JWT_SECRET) as {
      uid: number | string;
      exp: number;
    };

    // 4. 将用户信息挂载到 context 中，供后续接口使用
    event.context.auth = {
      uid: decoded.uid,
    };
  } catch (error) {
    throw createError({ statusCode: 401, message: "令牌无效或已过期" });
  }
});
```

### 如何在业务接口中使用？

在受保护的接口（如获取用户信息）中，你可以这样安全地获取用户 `ID`：

在 ~/server/utils/helper/index.ts,封装一个获取用户ID的函数

```ts
/**
 * 获取当前登录用户的 UID
 * @param event - H3 事件对象
 * @returns 当前登录用户的 UID，未登录时返回 0
 */
export const getLoginUid = (event: H3Event) => {
  return event.context.auth ? event.context.auth.uid : 0;
};
```

```ts
// server/api/user/profile.get.ts
import { getLoginUid } from "~~/server/utils/helper";
export default defineEventHandler(async (event) => {
  const uid = getLoginUid(event);
  console.log("uid", uid);

  // 2. 正常业务逻辑
  const [rows] = await connection.execute("SELECT * FROM users WHERE id = ?", [
    uid,
  ]);
  // ...
});
```

## 创建文集接口

```ts
// ~/server/api/notebook/notebook.post.ts
/**
 * 创建文集接口业务逻辑：
 * 1. 获取用户身份：从中间件注入的 context 中获取已登录用户的 UID。
 * 2. 接收并校验请求体：确保文集名称 name 存在且不为空。
 * 3. 开启数据库事务：保证创建操作的原子性。
 * 4. 创建文集：在 notebooks 表中插入一条新记录，包含名称和所属用户 ID。
 * 5. 返回结果：操作成功后返回新创建的文集 ID。
 */
import Joi from "joi";
import {
  getLoginUid,
  responseJson,
  throwBusinessError,
} from "~~/server/utils/helper";
import { validateBody } from "~~/server/utils/validator";
import { executeWithTransaction } from "~~/server/utils/db/mysql";
import type { ResultSetHeader } from "mysql2/promise";
import { CONSTANTS } from "~~/server/utils/constants";

// 定义校验 Schema
const createNotebookSchema = Joi.object({
  name: Joi.string().min(1).max(50).required().messages({
    "string.empty": "文集名称不能为空",
    "string.min": "文集名称至少1个字符",
    "string.max": "文集名称最多50个字符",
    "any.required": "文集名称不能为空",
  }),
});

export default defineEventHandler(async (event) => {
  // 1. 获取登录用户ID
  const uid = getLoginUid(event);

  // 防御性检查：虽然中间件已拦截，但防止内部调用或中间件配置变更
  if (!uid) {
    throwBusinessError(CONSTANTS.UNAUTHORIZED, "请先登录");
  }

  // 2. 获取并校验请求体
  const body = await readBody(event);
  const validBody = await validateBody<{
    name: string;
  }>(body, createNotebookSchema);

  // 3. 数据库事务操作
  return executeWithTransaction(async (connection) => {
    // 4. 创建文集
    const [insertResult] = (await connection.execute(
      "INSERT INTO `notebooks` (`name`, `uid`) VALUES (?, ?)",
      [validBody.name, uid],
    )) as [ResultSetHeader, any];

    if (insertResult.affectedRows === 0) {
      throw new Error("创建文集记录失败");
    }

    const notebookId = insertResult.insertId;

    // 5. 返回成功结果
    return responseJson(CONSTANTS.SUCCESS, "创建成功", {
      notebookId: notebookId,
    });
  });
});
```

```bash
### 登录
POST http://localhost:3000/api/auth/login HTTP/1.1
Content-Type: application/json

{
    "phone": "13800138001",
    "password": "123456"
}

### 变量
@access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjcsImV4cCI6MTc3NzUzNzkxMCwiaWF0IjoxNzc3NTM0MzEwfQ.x2yCLOYFzssyFAatlCjtzsLYDu7IxZBJ6A2PbDrwKt0


### 创建文集 (需要先登录获取 Token)
POST http://localhost:3000/api/notebook/notebook HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{access_token}}

{
    "name": "我的技术笔记"
}

```

## 修改文集接口

```ts
// ~/server/api/notebook/notebook.put.ts
/**
 * 修改文集接口业务逻辑：
 * 1. 获取用户身份：从中间件注入的 context 中获取已登录用户的 UID。
 * 2. 接收并校验请求体：确保文集 ID (notebookId) 和名称 (name) 存在且符合格式。
 * 3. 开启数据库事务：保证更新操作的原子性。
 * 4. 执行更新：根据 id 和 uid 更新文集名称。
 * 5. 返回结果：操作成功后返回成功标识。
 */
import Joi from "joi";
import {
  getLoginUid,
  responseJson,
  throwBusinessError,
} from "~~/server/utils/helper";
import { validateBody } from "~~/server/utils/validator";
import { executeWithTransaction } from "~~/server/utils/db/mysql";
import type { ResultSetHeader } from "mysql2/promise";
import { CONSTANTS } from "~~/server/utils/constants";

// 定义校验 Schema
const updateNotebookSchema = Joi.object({
  notebookId: Joi.number().required().messages({
    "number.base": "文集ID必须是数字",
    "any.required": "文集ID不能为空",
  }),
  name: Joi.string().min(1).max(50).required().messages({
    "string.empty": "文集名称不能为空",
    "string.min": "文集名称至少1个字符",
    "string.max": "文集名称最多50个字符",
    "any.required": "文集名称不能为空",
  }),
});

export default defineEventHandler(async (event) => {
  // 1. 获取登录用户ID
  const uid = getLoginUid(event);

  // 防御性检查：虽然中间件已拦截，但防止内部调用或中间件配置变更
  if (!uid) {
    throwBusinessError(CONSTANTS.UNAUTHORIZED, "请先登录");
  }

  // 2. 获取并校验请求体
  const body = await readBody(event);
  const validBody = await validateBody<{
    notebookId: number;
    name: string;
  }>(body, updateNotebookSchema);

  // 3. 数据库事务操作
  return executeWithTransaction(async (connection) => {
    // 4. 执行更新
    // 注意：WHERE 条件必须包含 uid，防止越权修改他人文集
    const [updateResult] = (await connection.execute(
      "UPDATE `notebooks` SET `name` = ? WHERE `id` = ? AND `uid` = ?",
      [validBody.name, validBody.notebookId, uid],
    )) as [ResultSetHeader, any];

    // 5. 检查影响行数
    if (updateResult.affectedRows === 0) {
      // 可能原因：文集不存在，或者文集不属于当前用户，或者名称未改变
      throwBusinessError(
        CONSTANTS.NOT_FOUND,
        "文集不存在、无权修改或名称未变更",
      );
    }

    // 6. 返回成功结果
    return responseJson(CONSTANTS.SUCCESS, "修改成功", null);
  });
});
```

```bash
### 创建文集 (需要先登录获取 Token)
POST http://localhost:3000/api/notebook/notebook HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{access_token}}

{
    "name": "我的技术笔记"
}

### 修改文集 (需要先登录获取 Token)
PUT http://localhost:3000/api/notebook/notebook HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{access_token}}

{
    "notebookId": 1,
    "name": "修改后的技术笔记"
}
```

## 删除文集接口

```ts
// ~/server/api/notebook/notebook.delete.ts
/**
 * 删除文集接口业务逻辑：
 * 1. 获取用户身份：从中间件注入的 context 中获取已登录用户的 UID。
 * 2. 接收并校验请求体：确保文集 ID (notebookId) 存在且为数字类型。
 * 3. 开启数据库事务：保证删除操作的原子性。
 * 4. 检查关联文章：检查该文集中是否还包含文章，若有则禁止删除。
 * 5. 执行删除：从 notebooks 表中删除指定 ID 且属于当前用户的文集。
 * 6. 返回结果：操作成功后返回成功标识。
 */
import Joi from "joi";
import {
  getLoginUid,
  responseJson,
  throwBusinessError,
} from "~~/server/utils/helper";
import { validateBody } from "~~/server/utils/validator";
import { executeWithTransaction } from "~~/server/utils/db/mysql";
import type { ResultSetHeader } from "mysql2/promise";
import { CONSTANTS } from "~~/server/utils/constants";

// 定义校验 Schema
const deleteNotebookSchema = Joi.object({
  notebookId: Joi.number().required().messages({
    "number.base": "文集ID必须是数字",
    "any.required": "文集ID不能为空",
  }),
});

export default defineEventHandler(async (event) => {
  // 1. 获取登录用户ID
  const uid = getLoginUid(event);

  // 防御性检查：虽然中间件已拦截，但防止内部调用或中间件配置变更
  if (!uid) {
    throwBusinessError(CONSTANTS.UNAUTHORIZED, "请先登录");
  }

  // 2. 获取并校验请求体
  const body = await readBody(event);
  const validBody = await validateBody<{
    notebookId: number;
  }>(body, deleteNotebookSchema);

  // 3. 数据库事务操作
  return executeWithTransaction(async (connection) => {
    // 4. (可选但推荐) 检查文集中是否还有文章
    // 如果业务允许直接级联删除文章，可以跳过此步，直接删文集再删关联表
    // 这里采用保守策略：非空文集不允许直接删除
    const [countResult] = (await connection.execute(
      "SELECT COUNT(*) as count FROM `notebook_notes` WHERE `notebook_id` = ?",
      [validBody.notebookId],
    )) as [{ count: number }[], any];

    if (countResult[0]!.count > 0) {
      throwBusinessError(
        CONSTANTS.BAD_REQUEST,
        "该文集中包含文章，请先清空或删除文章后再删除文集",
      );
    }

    // 5. 执行删除
    // 注意：WHERE 条件必须包含 uid，防止越权删除他人文集
    const [deleteResult] = (await connection.execute(
      "DELETE FROM `notebooks` WHERE `id` = ? AND `uid` = ?",
      [validBody.notebookId, uid],
    )) as [ResultSetHeader, any];

    // 6. 检查影响行数
    if (deleteResult.affectedRows === 0) {
      // 可能原因：文集不存在，或者文集不属于当前用户
      throwBusinessError(CONSTANTS.NOT_FOUND, "文集不存在或无权删除");
    }

    // 7. 返回成功结果
    return responseJson(CONSTANTS.SUCCESS, "删除成功", null);
  });
});
```

```bash
### 删除文集 (需要先登录获取 Token)
DELETE http://localhost:3000/api/notebook/notebook HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{access_token}}

{
    "notebookId": 1
}

```

## 获取用户文集接口

```ts
// ~/server/api/notebook/notebook.get.ts
/**
 * 获取当前登录用户的文集列表
 * 1. 获取用户身份：从中间件注入的 context 中获取已登录用户的 UID。
 * 2. 查询文集：根据 uid 查询 notebooks 表，按 ID 倒序排列。
 * 3. 返回结果：返回文集列表。
 */
import {
  getLoginUid,
  responseJson,
  throwBusinessError,
} from "~~/server/utils/helper";
import { executeWithTransaction } from "~~/server/utils/db/mysql";
import { CONSTANTS } from "~~/server/utils/constants";

export default defineEventHandler(async (event) => {
  // 1. 获取登录用户ID
  const uid = getLoginUid(event);

  // 防御性检查：虽然中间件已拦截，但防止内部调用或中间件配置变更
  if (!uid) {
    throwBusinessError(CONSTANTS.UNAUTHORIZED, "请先登录");
  }

  // 2. 数据库查询操作
  return executeWithTransaction(async (connection) => {
    // 查询当前用户的文集，按 ID 倒序 （或者创建时间也行）
    const [rows] = (await connection.execute(
      "SELECT * FROM `notebooks` WHERE `uid` = ? ORDER BY `id` DESC",
      [uid],
    )) as [any[], any];

    // 3. 返回成功结果
    // 即使列表为空，也返回成功状态，data 为空数组
    return responseJson(CONSTANTS.SUCCESS, "获取文集成功", {
      list: rows,
    });
  });
});
```

```bash
### 获取文集列表 (需要先登录获取 Token)
GET http://localhost:3000/api/notebook/notebook HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{access_token}}
```

## 获取所有文集接口

```ts
// ~/server/api/notebook/notebooks.get.ts
/**
 * 获取所有文集列表（公开接口）
 * 注意：如果此接口仅用于测试或后台管理，请确保有相应的权限控制
 */
import { responseJson, throwBusinessError } from "~~/server/utils/helper";
import { executeWithTransaction } from "~~/server/utils/db/mysql";
import { CONSTANTS } from "~~/server/utils/constants";

export default defineEventHandler(async (event) => {
  return executeWithTransaction(async (connection) => {
    // 查询所有文集，按 ID 倒序排列
    const [rows] = (await connection.execute(
      "SELECT * FROM `notebooks` ORDER BY `id` DESC",
    )) as [any[], any];

    // 返回成功结果，包含文集列表
    return responseJson(CONSTANTS.SUCCESS, "获取文集成功", {
      list: rows,
    });
  });
});
```

```bash
### 获取所有文集列表
GET http://localhost:3000/api/notebook/notebooks HTTP/1.1
Content-Type: application/json
```

## 创建文章接口

```ts
// ~/server/api/note/note.post.ts
/**
 * 创建文章接口业务逻辑：
 * 1. 获取用户身份：从中间件注入的 context 中获取已登录用户的 UID。
 * 2. 接收并校验请求体：确保传入的 notebookId（文集ID）存在且为数字类型。
 * 3. 开启数据库事务：保证文章创建与关联关系的原子性，要么全成功，要么全回滚。
 * 4. 校验文集有效性：检查文集是否存在且属于当前用户。
 * 5. 创建文章草稿：在 notes 表中插入一条新记录，初始化标题、空内容、草稿状态及所属用户。
 * 6. 建立关联关系：在 notebook_notes 关联表中插入记录，将新创建的文章绑定到指定文集。
 * 7. 返回结果：操作成功后返回新创建的文章 ID。
 */
import Joi from "joi";
import {
  genTitle,
  getLoginUid,
  responseJson,
  throwBusinessError,
} from "~~/server/utils/helper";
import { validateBody } from "~~/server/utils/validator";
import { executeWithTransaction } from "~~/server/utils/db/mysql";
import type { ResultSetHeader } from "mysql2/promise";
import { CONSTANTS } from "~~/server/utils/constants";

const noteSchema = Joi.object({
  notebookId: Joi.number().required().messages({
    "number.base": "文集ID必须是数字",
    "any.required": "文集ID不能为空",
  }),
});

export default defineEventHandler(async (event) => {
  // 1. 获取登录用户ID
  const uid = getLoginUid(event);

  // 防御性检查
  if (!uid) {
    throwBusinessError(CONSTANTS.UNAUTHORIZED, "请先登录");
  }

  // 2. 获取并校验请求体
  const body = await readBody(event);
  const validBody = await validateBody<{
    notebookId: number;
  }>(body, noteSchema);

  // 3. 数据库事务操作
  return executeWithTransaction(async (connection) => {
    // 校验文集是否存在且属于当前用户
    // 使用 FOR UPDATE 锁定该行，防止并发删除文集时的竞态条件（可选，视业务严谨度而定）
    const [notebookRows] = (await connection.execute(
      "SELECT `id` FROM `notebooks` WHERE `id` = ? AND `uid` = ?",
      [validBody.notebookId, uid],
    )) as [any[], any];

    if (!Array.isArray(notebookRows) || notebookRows.length === 0) {
      throwBusinessError(CONSTANTS.NOT_FOUND, "文集不存在或无权访问");
    }

    // 4. 创建文章草稿 (state=1) state2=已发布
    const [insertNoteResult] = (await connection.execute(
      "INSERT INTO `notes` (`title`, `content_md`, `state`, `uid`) VALUES (?, ?, ?, ?)",
      [genTitle(), "", 1, uid],
    )) as [ResultSetHeader, any];

    if (insertNoteResult.affectedRows === 0) {
      throw new Error("创建文章记录失败");
    }

    const noteId = insertNoteResult.insertId;

    // 5. 关联文集表
    const [insertRelationResult] = (await connection.execute(
      "INSERT INTO `notebook_notes` (`notebook_id`, `note_id`) VALUES (?, ?)",
      [validBody.notebookId, noteId],
    )) as [ResultSetHeader, any];

    if (insertRelationResult.affectedRows === 0) {
      throw new Error("关联文集失败");
    }

    // 6. 返回成功结果
    return responseJson(CONSTANTS.SUCCESS, "创建成功", {
      noteId: noteId,
    });
  });
});
```

```bash
### 创建文章 (需要先登录获取 Token)
POST http://localhost:3000/api/note/note HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{access_token}}

{
    "notebookId": 1
}
```

## 修改文章接口

```ts
// ~/server/api/note/note.put.ts
/**
 * 修改文章接口业务逻辑：
 * 1. 获取用户身份：从中间件注入的 context 中获取已登录用户的 UID。
 * 2. 接收并校验请求体：确保 noteId、title、content_md、state 符合格式。
 * 3. 开启数据库事务：保证更新操作的原子性。
 * 4. 执行更新：根据 noteId 和 uid 更新文章标题、内容和状态。
 * 5. 返回结果：操作成功后返回成功标识。
 */
import Joi from "joi";
import {
  getLoginUid,
  responseJson,
  throwBusinessError,
} from "~~/server/utils/helper";
import { validateBody } from "~~/server/utils/validator";
import { executeWithTransaction } from "~~/server/utils/db/mysql";
import type { ResultSetHeader } from "mysql2/promise";
import { CONSTANTS } from "~~/server/utils/constants";

// 定义校验 Schema
const updateNoteSchema = Joi.object({
  noteId: Joi.number().required().messages({
    "number.base": "文章ID必须是数字",
    "any.required": "文章ID不能为空",
  }),
  title: Joi.string().allow("").optional().messages({
    "string.base": "标题必须是字符串",
  }),
  content_md: Joi.string().allow("").optional().messages({
    "string.base": "内容必须是字符串",
  }),
  state: Joi.number().valid(1, 2).required().messages({
    "number.base": "状态必须是数字",
    "any.only": "状态只能是 1(草稿) 或 2(发布)",
    "any.required": "状态不能为空",
  }),
});

export default defineEventHandler(async (event) => {
  // 1. 获取登录用户ID
  const uid = getLoginUid(event);

  // 防御性检查：虽然中间件已拦截，但防止内部调用或中间件配置变更
  if (!uid) {
    throwBusinessError(CONSTANTS.UNAUTHORIZED, "请先登录");
  }

  // 2. 获取并校验请求体
  const body = await readBody(event);
  const validBody = await validateBody<{
    noteId: number;
    title?: string;
    content_md?: string;
    state: number;
  }>(body, updateNoteSchema);

  // 3. 数据库事务操作
  return executeWithTransaction(async (connection) => {
    // 4. 执行更新
    // 注意：WHERE 条件必须包含 uid，防止越权修改他人文章
    const [updateResult] = (await connection.execute(
      "UPDATE `notes` SET `title` = ?, `content_md` = ?, `state` = ? WHERE `id` = ? AND `uid` = ?",
      [
        validBody.title ?? "",
        validBody.content_md ?? "",
        validBody.state,
        validBody.noteId,
        uid,
      ],
    )) as [ResultSetHeader, any];

    // 5. 检查影响行数
    if (updateResult.affectedRows === 0) {
      // 可能原因：文章不存在，或者文章不属于当前用户
      throwBusinessError(CONSTANTS.NOT_FOUND, "文章不存在或无权修改");
    }

    // 6. 返回成功结果
    return responseJson(CONSTANTS.SUCCESS, "修改成功", null);
  });
});
```

```bash
### 修改文章 (需要先登录获取 Token)
PUT http://localhost:3000/api/note/note HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{access_token}}

{
    "noteId": 1,
    "title": "修改后的标题",
    "content_md": "# 新的内容",
    "state": 2
}
```

## 删除文章接口

```ts
// ~/server/api/note/note.delete.ts
/**
 * 删除文章接口业务逻辑：
 * 1. 获取用户身份：从中间件注入的 context 中获取已登录用户的 UID。
 * 2. 接收并校验请求体：确保 noteId 存在且为数字类型。
 * 3. 开启数据库事务：保证删除操作的原子性。
 * 4. 删除关联关系：先从 notebook_notes (中间表) 中删除该文章的关联记录，解除与文集的绑定。
 * 5. 删除文章：从 notes (文章表) 中删除指定 ID 且属于当前用户的文章。
 * 6. 返回结果：操作成功后返回成功标识。
 */
import Joi from "joi";
import {
  getLoginUid,
  responseJson,
  throwBusinessError,
} from "~~/server/utils/helper";
import { validateBody } from "~~/server/utils/validator";
import { executeWithTransaction } from "~~/server/utils/db/mysql";
import type { ResultSetHeader } from "mysql2/promise";
import { CONSTANTS } from "~~/server/utils/constants";

// 定义校验 Schema
const deleteNoteSchema = Joi.object({
  noteId: Joi.number().required().messages({
    "number.base": "文章ID必须是数字",
    "any.empty": "文章ID不能为空",
    "any.required": "文章ID不能为空",
  }),
});

export default defineEventHandler(async (event) => {
  // 1. 获取登录用户ID
  const uid = getLoginUid(event);

  // 防御性检查
  if (!uid) {
    throwBusinessError(CONSTANTS.UNAUTHORIZED, "请先登录");
  }

  // 2. 获取并校验请求体
  const body = await readBody(event);
  const validBody = await validateBody<{
    noteId: number;
  }>(body, deleteNoteSchema);

  // 3. 数据库事务操作
  return executeWithTransaction(async (connection) => {
    // 4. 删除中间表关联记录 (解除文集与文章的绑定)
    // 即使没有外键约束，先清理中间表也是良好的编程习惯
    await connection.execute(
      "DELETE FROM `notebook_notes` WHERE `note_id` = ?",
      [validBody.noteId],
    );

    // 5. 删除文章主记录
    // 注意：WHERE 条件必须包含 uid，防止越权删除他人文章
    const [deleteResult] = (await connection.execute(
      "DELETE FROM `notes` WHERE `id` = ? AND `uid` = ?",
      [validBody.noteId, uid],
    )) as [ResultSetHeader, any];

    // 6. 检查影响行数
    if (deleteResult.affectedRows === 0) {
      // 可能原因：文章不存在，或者文章不属于当前用户
      throwBusinessError(CONSTANTS.NOT_FOUND, "文章不存在或无权删除");
    }

    // 7. 返回成功结果
    return responseJson(CONSTANTS.SUCCESS, "删除成功", null);
  });
});
```

```bash
### 删除文章 (需要先登录获取 Token)
DELETE http://localhost:3000/api/note/note HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{access_token}}

{
    "noteId": 1
}
```

## 获取用户文章详情接口

```ts
// ~/server/api/note/note.get.ts
/**
 * 获取当前登录用户的特定文章详情
 * 1. 获取用户身份：从中间件注入的 context 中获取已登录用户的 UID。
 * 2. 接收并校验查询参数：确保 noteId 存在且为数字。
 * 3. 查询文章：根据 uid 和 noteId 查询 notes 表。
 * 4. 返回结果：返回文章详情。
 */
import Joi from "joi";
import {
  getLoginUid,
  responseJson,
  throwBusinessError,
} from "~~/server/utils/helper";
import { executeWithTransaction } from "~~/server/utils/db/mysql";
import { CONSTANTS } from "~~/server/utils/constants";

// 定义查询参数校验 Schema
const noteQuerySchema = Joi.object({
  noteId: Joi.number().required().messages({
    "number.base": "文章ID必须是数字",
    "any.required": "文章ID不能为空",
  }),
});

export default defineEventHandler(async (event) => {
  // 1. 获取登录用户ID
  const uid = getLoginUid(event);

  // 防御性检查
  if (!uid) {
    throwBusinessError(CONSTANTS.UNAUTHORIZED, "请先登录");
  }

  // 2. 获取并校验查询参数
  const query = getQuery(event);

  const validQuery = await validateBody<{
    noteId: number;
  }>(query, noteQuerySchema);

  // 3. 数据库查询操作
  return executeWithTransaction(async (connection) => {
    // 查询指定用户的指定文章
    // 注意：WHERE 条件必须包含 uid，防止越权查看他人文章
    const [rows] = (await connection.execute(
      "SELECT `id`, `title`, `content_md`, `state`, `created_at`, `updated_at` FROM `notes` WHERE `id` = ? AND `uid` = ?",
      [validQuery.noteId, uid],
    )) as [any[], any];

    // 检查文章是否存在
    if (!Array.isArray(rows) || rows.length === 0) {
      throwBusinessError(CONSTANTS.NOT_FOUND, "文章不存在或无权限访问");
    }

    // 4. 返回成功结果
    return responseJson(CONSTANTS.SUCCESS, "获取文章成功", {
      detail: rows[0],
    });
  });
});
```

```bash
### 获取用户文章详情接口 (需要先登录获取 Token)
GET http://localhost:3000/api/note/note?noteId=3 HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{access_token}}
```

## 获取已发布的文章列表（分页）

```ts
// ~/server/middleware/auth.ts

// 定义不需要鉴权的公开路径白名单
const PUBLIC_PATHS = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/public/", // 如果有其他公开接口
  "/api/notebook/notebooks", // 获取所有文集的接口
  "/api/home/notes", // 获取已发布的文章列表（分页）
];
```

```ts
// ~/server/api/home/notes.get.ts
/**
 * 获取已发布的文章列表（分页）
 * 1. 接收分页参数：page (页码), pageSize (每页数量)。
 * 2. 查询已发布(state=2)的文章，关联用户昵称。
 * 3. 数据后处理：生成摘要、提取封面图、脱敏内容。
 * 4. 返回结果：返回处理后的文章列表及精确分页信息。
 */
import {
  responseJson,
  throwBusinessError,
  getFirstImage,
  trimMarkdown,
} from "~~/server/utils/helper";
import { executeWithTransaction } from "~~/server/utils/db/mysql";
import { CONSTANTS } from "~~/server/utils/constants";
import { getQuery } from "h3"; // 确保引入 getQuery

export default defineEventHandler(async (event) => {
  // 1. 获取并处理查询参数
  const query = getQuery(event);

  // 设置默认值，防止无效参数
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;

  // 简单的参数校验，防止负数
  const currentPage = page > 0 ? page : 1;
  const currentPageSize = pageSize > 0 ? pageSize : 10;

  // 计算偏移量
  const offset = (currentPage - 1) * currentPageSize;

  // 2. 数据库查询操作
  return executeWithTransaction(async (connection) => {
    try {
      // 2.1 查询总条数 (Count Query)
      // 注意：WHERE 条件必须与下面的列表查询保持一致
      const [countRows] = (await connection.execute(
        "SELECT COUNT(*) as total FROM `notes` WHERE `notes`.`state` = ?",
        [2],
      )) as [any[], any];

      // 获取总记录数
      const total = (countRows[0] as any).total;

      // 如果总条数为 0，直接返回空列表，避免不必要的列表查询
      if (total === 0) {
        return responseJson(CONSTANTS.SUCCESS, "获取文章成功", {
          list: [],
          pagination: {
            page: currentPage,
            pageSize: currentPageSize,
            total: 0,
          },
        });
      }

      // 2.2 查询当前页的数据列表 (List Query)
      const [rows] = (await connection.execute(
        "SELECT `notes`.`id`, `notes`.`title`, `notes`.`content_md`, `notes`.`uid`, `users`.`nickname` " +
          "FROM `notes` " +
          "LEFT JOIN `users` ON `notes`.`uid` = `users`.`id` " +
          "WHERE `notes`.`state` = ? LIMIT ? OFFSET ?",
        [2, currentPageSize, offset],
      )) as [any[], any];

      // 3. 数据后处理
      const list = rows.map((item: any) => {
        return {
          id: item.id,
          title: item.title,
          nickname: item.nickname || "未知用户", // 防止昵称为 null
          uid: item.uid,
          subTitle: trimMarkdown(item.content_md, 300), // 生成摘要
          cover: getFirstImage(item.content_md), // 提取首图
          like: 45, // 模拟点赞数
          flag: false, // 模拟标记
          content_md: "", // 不返回完整正文
        };
      });

      // 4. 返回成功结果
      return responseJson(CONSTANTS.SUCCESS, "获取文章成功", {
        list: list,
        pagination: {
          page: currentPage,
          pageSize: currentPageSize,
          total: total, // 使用精确的总条数
        },
      });
    } catch (error) {
      console.error("获取文章列表失败:", error);
      throwBusinessError(CONSTANTS.SERVER_ERROR, "服务器内部错误");
    }
  });
});
```

```ts
// ~/server/utils/helper/index.ts
/**
 * 截取文章
 * @param content - Markdown 格式的内容
 * @param maxLength - 最大长度
 * @returns - 截取后的内容，如果内容长度超过 maxLength，则截取 maxLength 个字符并添加 "..."
 */
export const trimMarkdown = (content: string, maxLength: number): string => {
  // 1. 参数校验
  if (!content || maxLength <= 0) return "";

  // 2. 更彻底的 Markdown 清理
  let strippedContent = content
    // 移除图片 ![alt](url)
    .replace(/!\[.*?\]\(.*?\)/g, "")
    // 移除链接 [text](url)，保留文本内容 (可选：如果只想彻底移除，用 '')
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    // 移除标题符号 #, ##, ### 等
    .replace(/^#+\s*/gm, "")
    // 移除粗体/斜体符号 *, _, __, **
    .replace(/(\*\*|__|\*|_)/g, "")
    // 移除行内代码符号 `
    .replace(/`/g, "")
    // 移除列表符号 -, *, +, 1. 等 (行首)
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    // 移除引用符号 >
    .replace(/^\s*>\s*/gm, "")
    // 移除水平线 ---, ***
    .replace(/^\s*[-*_]{3,}\s*$/gm, "")
    // 将换行符、制表符替换为空格
    .replace(/[\n\r\t]+/g, " ")
    // 合并多个连续空格为一个
    .replace(/\s+/g, " ")
    // 去除首尾空格
    .trim();

  // 如果清理后为空，直接返回
  if (!strippedContent) return "";

  // 3. 智能截取
  if (strippedContent.length > maxLength) {
    // 先截取到 maxLength + 1，以便观察下一个字符
    let truncated = strippedContent.slice(0, maxLength);

    // 尝试在最后一个空格或标点处截断，避免切断单词
    // 查找最后一个空格的位置
    const lastSpaceIndex = truncated.lastIndexOf(" ");

    // 如果找到空格，且位置不是太靠前（例如至少保留了 maxLength 的一半），则在空格处截断
    // 否则，直接硬截断
    if (lastSpaceIndex > maxLength / 2) {
      truncated = truncated.slice(0, lastSpaceIndex);
    }

    // 添加省略号
    return truncated + "...";
  }

  return strippedContent;
};

/**
 * 获取文章第一张图片
 * @param content - markdown格式的内容
 * @returns - 第一张图片的 URL，如果没有图片则返回 null
 */
export const getFirstImage = (content: string): string | null | undefined => {
  // 在 .* 后加 ? 变为非贪婪，匹配到第一个 ]( 就停止
  const regex = /!\[.*?\]\((.*?)\)/;
  const match = content.match(regex);
  if (match) {
    return match[1];
  }
  return null;
};
```

```bash
### 获取已发布的文章列表（分页）
GET http://localhost:3000/api/home/notes?page=1&pageSize=10 HTTP/1.1
Content-Type: application/json

```

## 上传用户头像 接口

```ts
// ~/server/api/user/avatar.post.ts
/**
 * 上传头像接口业务逻辑：
 * 1. 获取用户身份：从中间件注入的 context 中获取已登录用户的 UID。
 * 2. 接收并校验请求体：确保上传了符合格式的图片文件。
 * 3. 保存文件：将图片保存到服务器指定目录。
 * 4. 更新数据库：在 users 表中更新对应用户的 avatar 字段。
 * 5. 返回结果：操作成功后返回新的头像 URL。
 */

import {
  getLoginUid,
  responseJson,
  throwBusinessError,
} from "~~/server/utils/helper";
import { executeWithTransaction } from "~~/server/utils/db/mysql";
import type { ResultSetHeader } from "mysql2/promise";
import { CONSTANTS } from "~~/server/utils/constants";
import path from "path";
import fs from "fs/promises";
import { mkdir } from "fs/promises";

// 定义允许的 MIME 类型
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export default defineEventHandler(async (event) => {
  // 1. 获取登录用户ID
  const uid = getLoginUid(event);

  // 防御性检查
  if (!uid) {
    throwBusinessError(CONSTANTS.UNAUTHORIZED, "请先登录");
  }

  // 2. 获取 multipart 表单数据
  const formData = await readMultipartFormData(event);

  if (!formData || formData.length === 0) {
    throwBusinessError(400, "请上传头像");
  }

  // 3. find 方法会遍历数组，找到第一个 name 属性为 'avatar' 且包含数据的部分
  const file = formData.find((part) => part.name === "avatar" && part.data);

  if (!file) {
    throwBusinessError(400, '未找到名为 "avatar" 的有效文件字段');
  }

  // 校验文件类型
  if (!file.type || !ALLOWED_MIME_TYPES.includes(file.type)) {
    throwBusinessError(400, "请上传 jpg/png/jpeg 类型的图片");
  }

  if (!file.filename) {
    throwBusinessError(400, "文件名缺失");
  }

  // 4. 保存文件到服务器
  // 生成唯一文件名，防止冲突
  const ext = path.extname(file.filename) || ".jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`;

  // 确保目录存在 (存储路径为 public/img)
  const uploadDir = path.join("./public", "img");
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (e) {
    // 目录已存在或其他错误，忽略或记录日志
    console.warn("Directory creation warning:", e);
  }

  const filePath = path.join(uploadDir, fileName);

  try {
    // 异步写入文件
    await fs.writeFile(filePath, file.data);
  } catch (err) {
    console.error("File save error:", err);
    throwBusinessError(500, "图片保存失败");
  }

  // 构建访问 URL
  const avatarUrl = `/img/${fileName}`;

  // 5. 数据库事务操作更新用户头像
  return executeWithTransaction(async (connection) => {
    const [updateResult] = (await connection.execute(
      "UPDATE `users` SET `avatar` = ? WHERE `id` = ?",
      [avatarUrl, uid],
    )) as [ResultSetHeader, any];

    if (updateResult.affectedRows === 0) {
      throwBusinessError(500, "更新头像信息失败");
    }

    // 6. 返回成功结果
    return responseJson(CONSTANTS.SUCCESS, "上传成功", {
      avatar: avatarUrl,
    });
  });
});
```

```bash
### 上传用户头像 (手动 Boundary)
# 注意：
# 1. Content-Type 中的 boundary 必须与下方分隔符完全一致
# 2. 分隔符前后需严格遵循 HTTP  multipart 规范（换行符、横杠）
# 3. < 符号后留一个空格，并指向绝对路径或者相对路径

POST http://localhost:3000/api/user/avatar HTTP/1.1
Authorization: Bearer {{access_token}}
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="avatar"; filename="test-avatar.jpg"
Content-Type: image/jpeg

< ./assets/test-avatar.jpg
------WebKitFormBoundary7MA4YWxkTrZu0gW--

```

## 修改用户昵称
```ts
// ~/server/api/user/profile.put.ts (建议文件名)
/**
 * 修改用户昵称接口业务逻辑：
 * 1. 获取用户身份：从中间件注入的 context 中获取已登录用户的 UID。
 * 2. 接收并校验请求体：确保 nickname 存在且符合格式。
 * 3. 开启数据库事务：保证更新操作的原子性。
 * 4. 执行更新：根据 uid 更新 users 表的 nickname 字段。
 * 5. 返回结果：操作成功后返回成功标识。
 */
import Joi from "joi";
import { getLoginUid, responseJson, throwBusinessError } from "~~/server/utils/helper";
import { validateBody } from '~~/server/utils/validator'; // 假设你有一个统一的校验工具，如果没有可以使用 Joi 直接校验
import { executeWithTransaction } from '~~/server/utils/db/mysql';
import type { ResultSetHeader } from 'mysql2/promise';
import { CONSTANTS } from '~~/server/utils/constants';

// 定义校验 Schema
const updateProfileSchema = Joi.object({
    nickname: Joi.string().required().messages({
        'string.base': '昵称必须是字符串',
        'string.empty': '昵称不能为空',
        'any.required': '昵称不能为空'
    })
});

export default defineEventHandler(async (event) => {
    // 1. 获取登录用户ID
    const uid = getLoginUid(event);

    // 防御性检查
    if (!uid) {
        throwBusinessError(CONSTANTS.UNAUTHORIZED, '请先登录');
    }

    // 2. 获取并校验请求体
    const body = await readBody(event);

    const validBody = await validateBody<{
        nickname: string
    }>(body, updateProfileSchema);

    // 3. 数据库事务操作
    return executeWithTransaction(async (connection) => {
        // 4. 执行更新
        const [updateResult] = await connection.execute(
            'UPDATE `users` SET `nickname` = ? WHERE `id` = ?',
            [validBody.nickname, uid]
        ) as [ResultSetHeader, any];

        // 5. 检查影响行数
        if (updateResult.affectedRows === 0) {
            throwBusinessError(CONSTANTS.BAD_REQUEST, '修改失败，数据未变更');
        }

        // 6. 返回成功结果
        return responseJson(CONSTANTS.SUCCESS, '修改成功', null);
    });
});
```
```bash
### 修改用户昵称 (需要先登录获取 Token)
PUT http://localhost:3000/api/user/user HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{access_token}}

{
    "nickname": "新的昵称"
}
```

## 获取当前登录用户指定文集下的文章列表

```ts
// ~/server/api/note/notes.get.ts
/**
 * 获取当前登录用户指定文集下的文章列表
 * 1. 获取用户身份：从中间件注入的 context 中获取已登录用户的 UID。
 * 2. 接收并校验查询参数：确保 notebookId 存在且为数字。
 * 3. 查询文章：先查文集关联表获取 note_id 列表，再查笔记详情。
 * 4. 返回结果：返回文章列表。
 */
import Joi from "joi";
import {
  getLoginUid,
  responseJson,
  throwBusinessError,
} from "~~/server/utils/helper";
import { executeWithTransaction } from "~~/server/utils/db/mysql";
import { CONSTANTS } from "~~/server/utils/constants";

// 定义查询参数校验 Schema
const listQuerySchema = Joi.object({
  notebookId: Joi.number().required().messages({
    "number.base": "文集ID必须是数字",
    "number.empty": "文集ID不能为空",
    "any.required": "文集ID不能为空",
  }),
});

export default defineEventHandler(async (event) => {
  // 1. 获取登录用户ID
  const uid = getLoginUid(event);

  // 防御性检查
  if (!uid) {
    throwBusinessError(CONSTANTS.UNAUTHORIZED, "请先登录");
  }

  // 2. 获取并校验查询参数
  const query = getQuery(event);

  const validQuery = await validateBody<{
    notebookId: number;
  }>(query, listQuerySchema);

  // 3. 数据库查询操作
  return executeWithTransaction(async (connection) => {
    // 第一步：查询文集关联的文章ID列表
    const [notebookRows] = (await connection.execute(
      "SELECT `note_id` FROM `notebook_notes` WHERE `notebook_id` = ?",
      [validQuery.notebookId],
    )) as [any[], any];

    // 如果文集下没有文章，直接返回空列表
    if (!Array.isArray(notebookRows) || notebookRows.length === 0) {
      return responseJson(CONSTANTS.SUCCESS, "获取文章成功", {
        list: [],
      });
    }

    // 提取 note_id 列表
    const noteIdList = notebookRows.map((row: any) => row.note_id);

    // 第二步：根据 note_id 列表和 uid 查询文章详情
    // 使用 IN 查询，并确保只查询当前用户的文章（防止越权）

    const [notesRows] = (await connection.query(
      "SELECT `id`, `title` FROM `notes` WHERE `uid` = ? AND `id` IN (?) ORDER BY `id` DESC",
      [uid, noteIdList],
    )) as [any[], any];

    // 4. 返回成功结果
    return responseJson(CONSTANTS.SUCCESS, "获取文章成功", {
      list: notesRows,
    });
  });
});
```

```bash
### 获取当前登录用户指定文集下的文章列表 (需要先登录获取 Token)
# 接口路径: /api/note/notes
# 参数: notebookId (Query Parameter)
GET http://localhost:3000/api/note/notes?notebookId=2 HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{access_token}}
```


## 获取已发布文章详情接口

```ts
// ~/server/api/home/detail.get.ts
/**
 * 获取已发布文章详情
 * 1. 接收查询参数：noteId。
 * 2. 校验参数合法性。
 * 3. 查询数据库：关联用户信息，仅查询 state=2 (已发布) 的文章。
 * 4. 数据后处理：生成摘要、提取作者信息。
 * 5. 返回结果：返回文章详情及作者信息。
 */
import Joi from "joi";
import { responseJson, throwBusinessError, getFirstImage, trimMarkdown } from "~~/server/utils/helper";
import { validateBody } from '~~/server/utils/validator'; // 假设存在此工具函数
import { executeWithTransaction } from '~~/server/utils/db/mysql';
import { CONSTANTS } from '~~/server/utils/constants';
import { getQuery } from 'h3';

// 定义校验 Schema
const noteDetailSchema = Joi.object({
    noteId: Joi.number().required().messages({
        'number.base': '文章ID必须是数字',
        'any.required': '文章ID不能为空'
    })
});

export default defineEventHandler(async (event) => {
    // 1. 获取并校验查询参数
    const query = getQuery(event);

    const validQuery = await validateBody<{
        noteId: number
    }>(query, noteDetailSchema);

    // 2. 数据库查询操作
    return executeWithTransaction(async (connection) => {
        // 查询文章详情及作者信息
        // 注意：WHERE 条件必须包含 state = 2，确保只返回已发布的文章
        const [rows] = await connection.execute(
            'SELECT `notes`.`id`, `notes`.`title`, `notes`.`content_md`, `notes`.`uid`, `notes`.`created_at`, ' +
            '`users`.`nickname`, `users`.`avatar` ' +
            'FROM `notes` ' +
            'LEFT JOIN `users` ON `notes`.`uid` = `users`.`id` ' +
            'WHERE `notes`.`state` = ? AND `notes`.`id` = ?',
            [2, validQuery.noteId]
        ) as [any[], any];

        // 检查文章是否存在
        if (!Array.isArray(rows) || rows.length === 0) {
            throwBusinessError(CONSTANTS.NOT_FOUND, '文章不存在或未发布');
        }

        const item = rows[0];

        // 3. 数据后处理与组装
        const result = {
            id: item.id,
            title: item.title,
            // 详情页通常也需要摘要用于分享卡片或预览，视需求而定
            subTitle: trimMarkdown(item.content_md, 300),
            cover: getFirstImage(item.content_md), // 可选：提取封面
            author: {
                id: item.uid,
                nickname: item.nickname || '未知用户',
                avatar: item.avatar || '' // 防止 null
            },
            content_md: item.content_md, // 详情页返回完整内容
            created_at: item.created_at,
            // 可以补充点赞数等模拟数据，保持与列表页结构兼容
            like: 0,
            flag: false
        };

        // 4. 返回成功结果
        return responseJson(CONSTANTS.SUCCESS, '获取文章成功', {
            detail: result
        });
    });
});
```

```bash
### 获取已发布文章详情 (公开接口，无需 Token)
# 接口路径: /api/home/detail
# 参数: noteId (Query Parameter)
# 注意：只能查询 state=2 (已发布) 的文章
GET http://localhost:3000/api/home/detail?noteId=3 HTTP/1.1
Content-Type: application/json
```

修改中间件
```ts
// ~/server/middleware/auth.ts
// 定义不需要鉴权的公开路径白名单
const PUBLIC_PATHS = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/public/', // 如果有其他公开接口
    '/api/notebook/notebooks', // 获取所有文集的接口
    '/api/home/notes', // 获取已发布的文章列表（分页）
    '/api/home/detail', // 获取文章详情
];
```

## 安装 ant-design-vue

```bash
npx nuxt@latest module add ant-design-vue
pnpm add -D sass-embedded    
```

```ts
// nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@ant-design-vue/nuxt',
  ],
  antd: {
    // 可选配置，例如启用样式提取以避免 CSS 闪烁
    extractStyle: true,
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
})

```

`app.vue` 中包裹  `<A-Extract-Style>` 标签，解决样式闪烁问题

```vue
<template>
  <div>
    <A-Extract-Style>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </A-Extract-Style>
  </div>
</template>

```

修改服务端中间件 `auth.ts`
```ts
// ~/server/middleware/auth.ts
// ★ 新增：只拦截 API 请求，其他路径（页面、静态资源）直接放行
    if (!path.startsWith('/api/')) {
        return;
    }
```

使用：

```vue
<!-- ~/app/pages/ant-design-vue.vue -->
<template>
    <div>
     <a-button type="primary">Primary Button</a-button>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
```

## 安装图标库
文档：https://nuxt.com.cn/modules/icon

### 1.安装模块
```bash
npx nuxi module add icon
# 或者通过下面的方式进行安装
pnpm add @nuxt/icon
# 更新 nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/icon'
  ]
})
```

### 2.在组件中使用图标
任意 `.vue` 文件中，直接使用 `<Icon>` 组件，通过 `name` 属性指定图标名：

```vue
<!-- ~/app/pages/ant-design-vue.vue -->
<template>
  <Icon name="uil:github" style="color: black" />
</template>
```
图标名格式一般是 `集合前缀:图标名`，例如 `mdi:home`、`heroicons:search`。你可以在 [icones.js.org](https://icones.js.org/) 上浏览所有可用图标。

### 3. 本地安装图标集合（强烈推荐）
虽然模块可以从 `CDN` 动态获取图标数据，但为了速度和离线可靠性，最好把常用的图标集合安装到本地：

```bash
pnpm add -D @iconify-json/uil    # 安装 Unicons 图标集
pnpm add -D @iconify-json/mdi    # 安装 Material Design Icons
```
这样图标数据就会随你的服务端代码一起部署，加载更快，也不会受外部 `CDN` 影响。

### 4.配置本地安装好的图标
```ts{13-17}
// nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@ant-design-vue/nuxt',
    '@nuxt/icon',
  ],
  icon: {
    serverBundle: {
      collections: ['uil', 'mdi'] 
    }
  },
  antd: {
    // 可选配置，例如启用样式提取以避免 CSS 闪烁
    extractStyle: true,
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
})
```

### 5.图标属性
```bash
props：

name（必填）：图标名称或全局组件名称
size：图标大小（默认：`1em`）
mode： 图标渲染模式（`svg` 或 `css`，默认：`css`）
```

### 6.Nuxt Icon 与 Tailwind CSS v4 集成配置说明

#### 背景

当你在项目中同时使用 **Tailwind CSS v4** 和 **Nuxt Icon 的 CSS 渲染模式** 时，需要告诉 Nuxt Icon 将其生成的 CSS 样式注入到 Tailwind CSS 的 `base` 层中。

#### 为什么要这样做？

Tailwind CSS v4 引入了原生的 CSS 层叠层（`@layer`）机制，其样式规则被组织在不同优先级的层里（`base`、`components`、`utilities` 等）。

如果你不指定 `cssLayer`，Nuxt Icon 生成的 CSS 可能会被插入到无法预期或优先级不合适的位置，导致图标样式被 Tailwind 的工具类覆盖（比如颜色、大小不生效），或者产生意料之外的“样式闪烁”。

通过设置 `cssLayer: 'base'`，你可以确保：

- 图标的默认样式被放置在 Tailwind 的 `base` 层，该层的优先级最低。
- 之后在组件上应用 Tailwind 的工具类（如 `text-red-500`、`text-xl`）时，这些工具类来自 `utilities` 层，**优先级更高**，可以正常覆盖图标的基础样式，符合预期。

#### 什么时候需要配置？

- 使用 **Tailwind CSS v4**（或任何已启用 CSS `@layer` 的项目）。
- Nuxt Icon 的渲染模式为 **`css`**（这是默认值）。
- 希望避免图标样式被意外覆盖，或希望图标能适配 Tailwind 的变体样式。

> **注意**：如果使用的是 `svg` 渲染模式，则不需要关心此配置。

#### 完整配置

在项目根目录的 `nuxt.config.ts` 文件中添加以下内容：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  icon: {
    mode: 'css',        // 使用 CSS 模式（默认值）
    cssLayer: 'base'    // 将图标 CSS 注入到 Tailwind 的 base 层
  }
})
```
#### 使用svg渲染模式(推荐)

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  icon: {
    mode: 'svg',        // 使用 svg 模式
  }
})
```

## 重置样式表
```css
/* ~/app/styles/normalize.css */
/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

* {
  box-sizing: border-box;
}

html {
  line-height: 1.15;
  /* 1 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
  box-sizing: border-box;
}

/* Sections
   ========================================================================== */

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0;
  box-sizing: border-box;
}

/**
 * Render the `main` element consistently in IE.
 */

main {
  display: block;
}

/**
 * Correct the font size and margin on `h1` elements within `section` and
 * `article` contexts in Chrome, Firefox, and Safari.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box;
  /* 1 */
  height: 0;
  /* 1 */
  overflow: visible;
  /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

pre {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none;
  /* 1 */
  text-decoration: underline;
  /* 2 */
  text-decoration: underline dotted;
  /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

code,
kbd,
samp {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/* Forms
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  line-height: 1.15;
  /* 1 */
  margin: 0;
  /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input {
  /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select {
  /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from `fieldset` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    `fieldset` elements in all browsers.
 */

legend {
  box-sizing: border-box;
  /* 1 */
  color: inherit;
  /* 2 */
  display: table;
  /* 1 */
  max-width: 100%;
  /* 1 */
  padding: 0;
  /* 3 */
  white-space: normal;
  /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box;
  /* 1 */
  padding: 0;
  /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */

summary {
  display: list-item;
}

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10+.
 */

template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */

[hidden] {
  display: none;
}
```
### 修改app.vue

```vue
<template>
  <div>
    <A-Extract-Style>
      <a-config-provider :theme="theme">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </a-config-provider>
    </A-Extract-Style>
  </div>
</template>
<script setup>
// antd 主题配置
const theme = {
  token: {
    colorPrimary: '#ea6f5a', // 主色改为绿色
    // borderRadius: 6,      // 圆角也可以改
  }
}
</script>
<style>
/* 样式重置 */
@import "./styles/normalize.css";
</style>

```

## 登录页面实现
```ts
// ~/app/composables/useHttpFetch.ts

/**
 * 登录
 */
export const loginFetch = (opt: myFetchOptions) => {
    return useHttpFetch('/api/auth/login', opt)
}
```

```ts
// ~/app/pages/sign_in.vue
<template>
  <div class="login">
    <a-row>
      <div class="logo">
        <NuxtLink href="#" class="">
          <img src="/images/logo.png" alt="logo" />
        </NuxtLink>
      </div>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col :span="16">
        <a-row>
          <a-col :span="12">
            <a-row class="login-left" type="flex" justify="end">
              <img class="sign_bg" src="/images/sign_bg.png" alt="sign_bg" />
              <a-row>
                <a-button
                  style="width: 250px; height: 45px"
                  shape="round"
                  size="large"
                  type="primary"
                  >下载简书APP</a-button
                >
                <a-popover placement="topRight">
                  <template #content>
                    <div class="page_download">
                      <img
                        style="width: 100px"
                        src="/images/login_page_download.png"
                        alt="download"
                      />
                    </div>
                  </template>
                  <div class="page_download">
                    <img src="/images/login_page_download.png" alt="download" />
                  </div>
                </a-popover>
              </a-row>
            </a-row>
          </a-col>
          <a-col :span="12">
            <div class="login-right">
              <div class="login-form">
                <a-row type="flex" justify="center" class="tag-title">
                  <NuxtLink to="/sign_in" class="active">登录</NuxtLink>
                  <b>·</b>
                  <NuxtLink to="/sign_up" class="sign_up">注册</NuxtLink>
                </a-row>
                <div class="form">
                  <a-form :model="formState">
                    <a-form-item>
                      <a-input
                        style="
                          border: none;
                          background-color: #f7f7f7 !important;
                          height: 50px;
                        "
                        placeholder="手机号或邮箱"
                        v-model:value="formState.phone"
                      >
                        <template #prefix>
                     
                           <Icon name="mdi:account" style="color: #969696" size="18"/>
                        </template>
                      </a-input>
                    </a-form-item>
                    <a-form-item style="border-top: 1px solid #c8c8c8">
                      <a-input
                        style="
                          border: none;
                          background-color: #f7f7f7 !important;
                          height: 50px;
                        "
                        placeholder="密码"
                        type="password"
                        v-model:value="formState.password"
                      >
                        <template #prefix>
                           <Icon name="mdi:lock" style="color: #969696" size="18"/>
                        </template>
                      </a-input>
                    </a-form-item>
                  </a-form>
                </div>
                <a-row type="flex" justify="space-between">
                  <a-checkbox v-model:checked="checked">记住我</a-checkbox>
                  <span>登录遇到问题?</span>
                </a-row>
                <a-row type="flex" justify="center" class="sign_in_btn">
                  <a-button @click="login" shape="round"> 登录 </a-button>
                </a-row>
                <div class="more-sign">
                  <h6>社交帐号登录</h6>
                  <a-row type="flex" justify="center" style="margin-top: 30px">
                    <div>
                      <Icon
                        name="ant-design:weibo-outlined"
                        style="color: #e05344"
                        size="30"
                      />
                    </div>
                    <div style="margin: 0 30px">
                      <Icon
                        name="ant-design:wechat-outlined"
                        style="color: #00bb29"
                        size="30"
                      />
                    </div>
                    <div>
                      <Icon
                        name="ant-design:qq-outlined"
                        style="color: #498ad5"
                        size="30"
                      />
                    </div>
                  </a-row>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { loginFetch } from "~/composables/useHttpFetch";

const checked = ref(false);
const formState = reactive({
  phone: "13800138001",
  password: "123456",
});
//登录
const login = () => {
  //数据校验

  if (formState.phone === "") {
    message.error("手机号不能为空哦~");
    return;
  }
  if (formState.password === "") {
    message.error("密码不能为空哦~");
    return;
  }
  //请求登录接口
  loginFetch({
    method: "POST",
    body: {
      phone: formState.phone,
      password: formState.password,
    },
    server: false,
    key: "loginFetch",
  }).then(({ data }) => {
    console.log(data);
    if (data.value.code !== 200) {
      message.error(data.value.msg);
      return;
    }
    //存到useCookie里
    const accessTokenCookie = useCookie("accessToken", {
      maxAge: 60 * 60 * 24 * 7,
    });
    accessTokenCookie.value = data.value.data.accessToken;
    //存用户信息
    const userInfoCookie = useCookie("userInfo", { maxAge: 60 * 60 * 24 * 7 });
    userInfoCookie.value = data.value.data.userInfo;

    // navigateTo('/')
    window.location.href = "/";
  });
};
</script>

<style lang="scss" scoped>
.login {
  background: #f1f1f1;
  height: 100vh;
  .logo {
    margin-left: 50px;
    padding-top: 50px;
    img {
      width: 100px;
    }
  }
  .login-left {
    padding: 20px;
    .sign_bg {
      width: 70%;
      margin-bottom: 40px;
    }
    .page_download {
      background: #ffffff;
      margin-left: 20px;
      padding: 5px;
      img {
        width: 46px;
      }
    }
  }
  .login-right {
    padding: 20px;
    .login-form {
      width: 400px;
      margin: 0 auto;
      padding: 50px 50px 30px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 0 8px rgb(0 0 0 / 10%);
      vertical-align: middle;
      display: inline-block;
      .tag-title {
        font-size: 18px;
        font-family:
          Georgia,
          Times New Roman,
          Times,
          Songti SC,
          serif;
        NuxtLink:hover {
          border-bottom: 2px solid #ea6f5a;
        }
        .active {
          font-weight: 700;
          color: #ea6f5a;
          border-bottom: 2px solid #ea6f5a;
          padding: 5px 10px;
        }
        b {
          padding: 5px 15px;
          color: #969696;
          font-weight: 700;
        }
        .sign_up {
          padding: 5px 10px;
          color: #969696;
        }
      }
      .form {
        margin-top: 30px;
        background-color: #f7f7f7;
        border: 1px #c8c8c8 solid;
        border-radius: 6px;
        margin-bottom: 20px;
        .ant-form-item {
          margin-bottom: 0 !important;
        }
      }
      .more-sign {
        margin-top: 50px;
        text-align: center;
      }
      .more-sign h6 {
        position: relative;
        margin: 0 0 10px;
        font-size: 12px;
        color: #b5b5b5;
      }
      .more-sign h6:before,
      .more-sign h6:after {
        content: "";
        border-top: 1px solid #b5b5b5;
        display: block;
        position: absolute;
        width: 60px;
        top: 8px;
      }
      .more-sign h6:before {
        left: 30px;
      }
      .more-sign h6:after {
        right: 30px;
      }
    }
  }
}
.login {
  .ant-input {
    background-color: #f7f7f7 !important;
    height: 40px !important;
    border-radius: 6px;
    outline: none !important;
  }
  .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: #c8c8c8 !important;
    border-right-width: 1px !important;
    z-index: 1;
  }
  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused {
    border-color: #c8c8c8 !important;
    box-shadow: none !important;
    border-right-width: 1px !important;
  }
  .ant-input-affix-wrapper {
    border-radius: 6px !important;
  }
  .ant-input-prefix {
    margin-right: 8px;
  }
  .sign_in_btn {
    margin-top: 20px;
    .ant-btn {
      height: 45px !important;
      width: 100% !important;
      background-color: #3194d0 !important;
      color: #ffffff !important;
    }
    .ant-btn:hover,
    .ant-btn:focus {
      color: #3194d0;
      border-color: #3194d0;
    }
  }
}
</style>

```

