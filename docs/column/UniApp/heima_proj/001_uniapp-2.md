## 2. tabBar

### 2.0 创建 tabBar 分支

运行如下的命令，基于 `master` 分支在本地创建 `tabBar` 子分支，用来开发和 `tabBar` 相关的功能：

```bash
git checkout -b tabbar
```

### 2.1 创建 tabBar 页面

在 `pages` 目录中，创建首页(`home`)、分类(`cate`)、购物车(`cart`)、我的(`my`) 这 4 个 `tabBar` 页面。在 `HBuilderX` 中，可以通过如下的两个步骤，快速新建页面：

在 `pages` 目录上鼠标右键，选择新建页面

在弹出的窗口中，填写页面的名称、勾选 `scss` 模板之后，点击创建按钮。截图如下：
![alt text](./assets/13-image.png)

### 2.2 配置 tabBar 效果

1. 将 资料 目录下的 `static` 文件夹 拷贝一份，替换掉项目根目录中的 `static` 文件夹

2. 修改项目根目录中的 `pages.json` 配置文件，新增 `tabBar` 的配置节点如下：

```json
{
  "tabBar": {
    "selectedColor": "#C00000",
    "list": [
      {
        "pagePath": "pages/home/home",
        "text": "首页",
        "iconPath": "static/tab_icons/home.png",
        "selectedIconPath": "static/tab_icons/home-active.png"
      },
      {
        "pagePath": "pages/cate/cate",
        "text": "分类",
        "iconPath": "static/tab_icons/cate.png",
        "selectedIconPath": "static/tab_icons/cate-active.png"
      },
      {
        "pagePath": "pages/cart/cart",
        "text": "购物车",
        "iconPath": "static/tab_icons/cart.png",
        "selectedIconPath": "static/tab_icons/cart-active.png"
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的",
        "iconPath": "static/tab_icons/my.png",
        "selectedIconPath": "static/tab_icons/my-active.png"
      }
    ]
  }
}
```

### 2.3 删除默认的 index 首页

1. 在 `HBuilderX` 中，把 `pages` 目录下的 `index`首页文件夹 删除掉

2. 同时，把 `page.json` 中记录的 `index` 首页 路径删除掉

3. 为了防止小程序运行失败，在微信开发者工具中，手动删除 `pages` 目录下的 `index` 首页文件夹

4. 同时，把 `components` 目录下的 `uni-link` 组件文件夹 删除掉

### 2.4 修改导航条的样式效果

1. 打开 `pages.json` 这个全局的配置文件

2. 修改 `globalStyle` 节点如下：

```json
{
  "globalStyle": {
    "navigationBarTextStyle": "white",
    "navigationBarTitleText": "黑马优购",
    "navigationBarBackgroundColor": "#C00000",
    "backgroundColor": "#FFFFFF"
  }
}
```

### 2.5 分支的提交与合并

1. 将本地的 `tabbar` 分支进行本地的 `commit` 提交：

```bash
git add .
git commit -m "完成了 tabBar 的开发"
```

2. 将本地的 `tabbar` 分支推送到远程仓库进行保存：

```bash
git push -u origin tabbar
```

3. 将本地的 `tabbar` 分支合并到本地的 `master` 分支：

```bash
git checkout master
git merge tabbar
```

4. 删除本地的 `tabbar` 分支：

```bash
git branch -d tabbar
```
