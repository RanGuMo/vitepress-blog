## 4. 分类

### 4.0 创建 cate 分支

运行如下的命令，基于 `master` 分支在本地创建 `cate` 子分支，用来开发分类页面相关的功能：

```bash
git checkout -b cate
```

### 4.1 渲染分类页面的基本结构

定义页面结构如下：

```html
<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view
        class="left-scroll-view"
        scroll-y
        :style="{height: wh + 'px'}"
      >
        <view class="left-scroll-view-item active">xxx</view>
        <view class="left-scroll-view-item">xxx</view>
        <view class="left-scroll-view-item">xxx</view>
        <view class="left-scroll-view-item">xxx</view>
        <view class="left-scroll-view-item">xxx</view>
        <view class="left-scroll-view-item"
          >多复制一些节点，演示纵向滚动效果...</view
        >
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view
        class="right-scroll-view"
        scroll-y
        :style="{height: wh + 'px'}"
      >
        <view class="left-scroll-view-item">zzz</view>
        <view class="left-scroll-view-item">zzz</view>
        <view class="left-scroll-view-item">zzz</view>
        <view class="left-scroll-view-item">zzz</view>
        <view class="left-scroll-view-item"
          >多复制一些节点，演示纵向滚动效果</view
        >
      </scroll-view>
    </view>
  </view>
</template>
```

动态计算窗口的剩余高度：

```js{5-6,10-13}
<script>
  export default {
    data() {
      return {
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        wh: 0
      };
    },
    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值
      this.wh = sysInfo.windowHeight
    }
  }
</script>
```

美化页面结构：

```scss
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: " ";
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
```

### 4.2 获取分类数据

在 `data` 中定义分类数据节点：

```js{3-4}
data() {
  return {
    // 分类数据列表
    cateList: []
  }
}
```

调用获取分类列表数据的方法：

```js{2-3}
onLoad() {
  // 调用获取分类列表数据的方法
  this.getCateList()
}
```

定义获取分类列表数据的方法：

```js{2-9}
methods: {
  async getCateList() {
    // 发起请求
    const { data: res } = await uni.$http.get('/api/public/v1/categories')
    // 判断是否获取失败
    if (res.meta.status !== 200) return uni.$showMsg()
    // 转存数据
    this.cateList = res.message
  }
}
```

### 4.3 动态渲染左侧的一级分类列表

循环渲染列表结构：

```html
<!-- 左侧的滚动视图区域 -->
<scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
  <block v-for="(item, i) in cateList" :key="i">
    <view class="left-scroll-view-item">{{item.cat_name}}</view>
  </block>
</scroll-view>
```

在 `data` 中定义默认选中项的索引：

```js{3-4}
data() {
  return {
    // 当前选中项的索引，默认让第一项被选中
    active: 0
  }
}
```

循环渲染结构时，为选中项动态添加 `.active` 类名：

```html{2}
<block v-for="(item, i) in cateList" :key="i">
  <view :class="['left-scroll-view-item', i === active ? 'active' : '']"
    >{{item.cat_name}}</view
  >
</block>
```

为一级分类的 `Item` 项绑定点击事件处理函数 `activeChanged`：

```html{4}
<block v-for="(item, i) in cateList" :key="i">
  <view
    :class="['left-scroll-view-item', i === active ? 'active' : '']"
    @click="activeChanged(i)"
    >{{item.cat_name}}</view
  >
</block>
```

定义 `activeChanged` 事件处理函数，动态修改选中项的索引：

```js{2-5}
methods: {
  // 选中项改变的事件处理函数
  activeChanged(i) {
    this.active = i
  }
}
```

### 4.4 动态渲染右侧的二级分类列表

在 `data` 中定义二级分类列表的数据节点：

```js{3-4}
data() {
  return {
    // 二级分类列表
    cateLevel2: []
  }
}
```

修改 `getCateList` 方法，在请求到数据之后，为二级分类列表数据赋值：

```js{5-6}
async getCateList() {
  const { data: res } = await uni.$http.get('/api/public/v1/categories')
  if (res.meta.status !== 200) return uni.$showMsg()
  this.cateList = res.message
  // 为二级分类赋值
  this.cateLevel2 = res.message[0].children
}
```

修改 `activeChanged` 方法，在一级分类选中项改变之后，为二级分类列表数据重新赋值：

```js{3-4}
activeChanged(i) {
  this.active = i
  // 为二级分类列表重新赋值
  this.cateLevel2 = this.cateList[i].children
}
```

循环渲染右侧二级分类列表的 `UI` 结构：

```html
<!-- 右侧的滚动视图区域 -->
<scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}">
  <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
    <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
  </view>
</scroll-view>
```

美化二级分类的标题样式：

```scss
.cate-lv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
```

### 4.5 动态渲染右侧的三级分类列表

在二级分类的 `<view>` 组件中，循环渲染三级分类的列表结构：

```html{5-18}
<!-- 右侧的滚动视图区域 -->
<scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}">
  <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
    <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
    <!-- 动态渲染三级分类的列表数据 -->
    <view class="cate-lv3-list">
      <!-- 三级分类 Item 项 -->
      <view
        class="cate-lv3-item"
        v-for="(item3, i3) in item2.children"
        :key="i3"
      >
        <!-- 图片 -->
        <image :src="item3.cat_icon"></image>
        <!-- 文本 -->
        <text>{{item3.cat_name}}</text>
      </view>
    </view>
  </view>
</scroll-view>
```

美化三级分类的样式：

```scss
.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 12px;
    }
  }
}
```

### 4.6 切换一级分类后重置滚动条的位置

在 `data` 中定义 滚动条距离顶部的距离：

```js{3-4}
data() {
  return {
    // 滚动条距离顶部的距离
    scrollTop: 0
  }
}
```

动态为右侧的 `<scroll-view>` 组件绑定 `scroll-top` 属性的值：

```html{6}
<!-- 右侧的滚动视图区域 -->
<scroll-view
  class="right-scroll-view"
  scroll-y
  :style="{height: wh + 'px'}"
  :scroll-top="scrollTop"
></scroll-view>
```

切换一级分类时，动态设置 `scrollTop` 的值：

```js{6-10}
// 选中项改变的事件处理函数
activeChanged(i) {
  this.active = i
  this.cateLevel2 = this.cateList[i].children

  // 让 scrollTop 的值在 0 与 1 之间切换
  this.scrollTop = this.scrollTop === 0 ? 1 : 0

  // 可以简化为如下的代码：
  // this.scrollTop = this.scrollTop ? 0 : 1
}
```

### 为什么不能直接赋值 0？

> `<scroll-view>` 组件的 `scroll-top` 是一个受控属性，只有当它的值发生变化时，才会触发滚动行为。
> 如果连续两次点击（比如点击同一分类两次），第一次点击时已经将 `scrollTop` 设为 `0`，第二次点击时 `scrollTop` 仍然是 `0`，值没有变化，组件就不会重新滚动到顶部。
> 同理，即使点击不同分类，如果当前 `scrollTop` 恰好已经是 `0`（例如之前某次滚动后没有变化），再次设为 `0` 也不会触发滚动。

> 这种写法存在问题，因为 `scrollTop` 的值在第一次点击时是 `0`，第二次点击时是 `1`，第三次点击时是 `0`，第四次点击时是 `1`，以此类推。连续点击同一个分类时，页面会有1px的跳动，导致用户体验感差。

### 使用 scroll-into-view（推荐）

此方案利用 `scroll-view` 的 `scroll-into-view` 属性，通过滚动到指定 `id` 的元素来实现精确回到顶部，不会有任何多余位移。

实现步骤

1. 在右侧 `scroll-view` 顶部添加一个隐藏的锚点元素,给它设置一个固定的 `id`，例如 "`top`"。

2. 将 `scroll-into-view` 属性绑定到一个动态变量（如 `intoView`）。

3. 切换分类时，先清空 `intoView`，再在下一帧设置为锚点 `id`，触发滚动。

代码修改
模板部分：

```html{4-6}
<scroll-view class="right-scroll-view"
              scroll-y
              :style="{height: wh + 'px'}"
              :scroll-into-view="intoView">   <!-- 使用 scroll-into-view -->
  <!-- 顶部锚点（不可见） -->
  <view id="top" style="height: 0; width: 0;"></view>

  <!-- 原有的分类内容 -->
  <view class="cate-lv2" v-for="...">...</view>
</scroll-view>
```

脚本部分：

```js{4,12-17}
data() {
  return {
    // ... 原有数据
    intoView: '',  // 控制滚动到的元素 id
  };
},
methods: {
  activeChanged(i) {
    this.active = i;
    this.cateLevel2 = this.cateList[i].children;

    // 先清空，确保下次设置能触发变化
    this.intoView = '';
    this.$nextTick(() => {
      // 滚动到顶部锚点
      this.intoView = 'top';
    });
  }
}
```

原理

- `scroll-into-view` 属性值变化时，`scroll-view` 会滚动到对应 `id` 的元素位置。

- 先清空再赋值，保证每次切换都能触发滚动（即使两次点击同一个分类）。

- 锚点元素高度为 `0`，不影响布局，且滚动目标就是顶部，没有 `1px` 偏移。

### 4.7 点击三级分类跳转到商品列表页面

为三级分类的 `Item` 项绑定点击事件处理函数如下：

```html{5}
<view
  class="cate-lv3-item"
  v-for="(item3, i3) in item2.children"
  :key="i3"
  @click="gotoGoodsList(item3)"
>
  <image :src="item3.cat_icon"></image>
  <text>{{item3.cat_name}}</text>
</view>
```

定义事件处理函数如下：

```js{1-6}
// 点击三级分类项跳转到商品列表页面
gotoGoodsList(item3) {
  uni.navigateTo({
    url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
  })
}
```

### 4.8 分支的合并与提交

1. 将 `cate` 分支进行本地提交：

```bash
git add .
git commit -m "完成了分类页面的开发"
```

2. 将本地的 `cate` 分支推送到码云：

```bash
git push -u origin cate
```

3. 将本地 `cate` 分支中的代码合并到 `master` 分支：

```bash
git checkout master
git merge cate
git push
```

4. 删除本地的 `cate` 分支：

```bash
git branch -d cate
```
