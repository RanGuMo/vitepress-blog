# pnpm：更高效、更安全的前端包管理器

## 🚀 什么是 pnpm？

> `pnpm`（全称：`performant npm`）是一个现代化的 `JavaScript` 包管理器，它的设计目标是解决传统包管理器（`npm/yarn`）的一些核心痛点：**安装速度慢和磁盘空间浪费**。

### ✨ 核心优势

#### 1. ⚡️ 极快的安装速度

> 相比传统的包管理器，`pnpm` 的安装速度通常快 2-3 倍，尤其是在项目中已有依赖缓存的情况下。

#### 2. 💾 高效的磁盘空间利用

这是 `pnpm` 的“杀手锏”功能：

传统包管理器的问题：

- 如果你有 `100` 个项目都依赖 `lodash`，那么 `lodash` 会被安装 `100` 次

- 磁盘中会有 `100` 个重复的 `lodash 副本`

`pnpm` 的解决方案：

- 相同的包只安装一次，存储在全局存储区

- 项目中通过硬链接（`hardlink`）引用这些包

- 即使包的不同版本，`pnpm` 也会最大化地复用已有代码

📊 举个例子：

- 假设 `lodash` 有 `100` 个文件，新版增加了一个文件：

- `npm/yarn`：重新写入 `101` 个文件

- `pnpm`：保留原来 `100` 个文件的硬链接，只新增那个新文件

#### 3. 🏗️ 原生支持 Monorepo

`pnpm` 内置了对 `Monorepo` 项目的支持，命令设计得非常人性化：

```bash

# 为所有子包添加依赖
pnpm add axios -r

# 只给特定子包添加依赖
pnpm add axios --filter my-package

# 运行所有子包的构建命令
pnpm -r run build
```

#### 4. 🔒 更高的安全性

传统包管理器（`npm/yarn`）使用`扁平化的 node_modules` 结构，会带来`幽灵依赖`问题：

```javascript
// 项目 A 依赖包 B，包 B 依赖包 C
// 在 npm/yarn 中，项目 A 可以"非法"访问包 C（即使没有声明依赖 C）
// 这可能导致版本冲突和安全问题
```

`pnpm` 采用符号链接的方式组织 `node_modules`，每个包只能访问自己明确声明的依赖，从根本上杜绝了非法访问。

## 🔄 从 npm/yarn 迁移到 pnpm

迁移过程非常简单，只需几步：

### 步骤 1：全局安装 pnpm

```bash
npm i -g pnpm
# 或使用其他安装方式：https://pnpm.io/installation
```

### 步骤 2：删除 node_modules

```bash
rm -rf node_modules
# Windows: rmdir /s node_modules
```

### 步骤 3：转换 lock 文件

```bash
# 自动从 package-lock.json 或 yarn.lock 生成 pnpm-lock.yaml
pnpm import
```

### 步骤 4：重新安装依赖

```bash
pnpm install
```

### 步骤 5：确保团队统一使用（可选但推荐）

在 `package.json` 中添加 `preinstall` 脚本，防止误用其他包管理器：

```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

## 📁 pnpm 的 node_modules 结构

理解 `pnpm` 特殊的 `node_modules` 结构有助于更好地使用它：

```text
node_modules/
├── .pnpm/ # 所有依赖的实际存储位置
│ ├── lodash@4.17.21/
│ └── react@18.2.0/
├── react -> .pnpm/react@18.2.0/node_modules/react # 符号链接
└── .modules.yaml # pnpm 的内部配置文件
```

这种结构保证了：

✅ 没有幽灵依赖：每个包只能访问自己声明的依赖

✅ 依赖隔离：不同版本的包互不干扰

✅ 空间复用：相同的包只存储一次

## 🛠️ 常用命令速查

## 🛠️ 常用命令速查

| 命令           | 功能       | 示例                          |
| -------------- | ---------- | ----------------------------- |
| `pnpm install` | 安装依赖   | `pnpm i`                      |
| `pnpm add`     | 添加依赖   | `pnpm add axios`              |
| `pnpm remove`  | 删除依赖   | `pnpm rm axios`               |
| `pnpm update`  | 更新依赖   | `pnpm up`                     |
| `pnpm run`     | 运行脚本   | `pnpm run dev`                |
| `pnpm dlx`     | 临时执行包 | `pnpm dlx create-vite@latest` |

## 💡 最佳实践建议

### 1. 新项目首选 pnpm

如果你要开始一个新项目，直接使用 `pnpm` 初始化：

```bash
pnpm create vite@latest my-app
```

### 2. 利用 workspace 功能

对于多包项目，使用 `pnpm` 的 `workspace` 功能：

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/\*\*'
  - 'apps/\*\*'
  - "!**/test/**"
```

### 3. 配置 .npmrc

创建项目级的 `.npmrc` 文件进行配置：

```ini
# 使用淘宝镜像加速
registry=https://registry.npmmirror.com/

# 设置全局存储路径（可选）
store-dir=~/.pnpm-store

# 自动安装 peerDependencies
auto-install-peers=true
```

## ⚠️ 注意事项

备份重要项目：虽然迁移过程平滑，但建议先备份重要项目

- `CI/CD` 环境：确保 `CI/CD` 环境中也安装了 `pnpm`
- `Docker` 构建：可以利用 `pnpm` 的存储特性优化 `Docker` 镜像构建
- `IDE` 支持：主流 `IDE（VSCode、WebStorm`）都已支持 `pnpm`

## 🌟 为什么选择 pnpm？

| 特性          | npm        | yarn     | pnpm       |
| ------------- | ---------- | -------- | ---------- |
| 安装速度      | ⭐⭐       | ⭐⭐⭐   | ⭐⭐⭐⭐⭐ |
| 磁盘利用      | ⭐⭐       | ⭐⭐     | ⭐⭐⭐⭐⭐ |
| Monorepo 支持 | 需要工具   | 需要插件 | 原生支持   |
| 安全性        | ⭐⭐       | ⭐⭐⭐   | ⭐⭐⭐⭐⭐ |
| 社区生态      | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐   |

## 📚 了解更多

- 官方文档 [https://pnpm.io/zh/](https://pnpm.io/zh/)
- `pnpm vs npm vs yarn` 性能对比 [https://pnpm.io/benchmarks](https://pnpm.io/benchmarks)
- `GitHub` 仓库 [https://github.com/pnpm/pnpm](https://github.com/pnpm/pnpm)

> 总结：如果你关心项目的安装速度、磁盘空间、构建稳定性，或者正在使用/计划使用 `Monorepo`，那么 `pnpm` 无疑是当前最佳的选择。它的迁移成本低，收益明显，值得一试！

> 💡 小贴士：许多大型项目（如 `Vue`、`Vite`、`Nuxt`、`Prisma` 等）已经转向使用 pnpm，这充分证明了它的可靠性和优越性。
