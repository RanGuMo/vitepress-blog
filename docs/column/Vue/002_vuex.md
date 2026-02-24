# Vuex

## vuex 速记

本质： 全局状态（数据）管理工具
作用： 可以实现跨组件通信

**五大核心模块**：

- `state`：数据
- `Mutation`：修改数据（同步）
- `Actions`：处理异步行为
- `Getters`：计算属性
- `Modules`：数据分模块维护

## 五大核心模块

### State

作用：声明数据

语法：

```javascript
// 声明数据
state: {
  // 属性名就是数据变量名，类似data函数
  xxx: 值,
  zzz: 值,
}


// 组件内，获取数据
computed: {
	...mapState(['xxx'， 'zzz'])
}
```

### Mutation

作用：同步修改数据

语法：

```javascript
// 定义mutations函数
mutations: {
 // state是Vuex store的状态对象，payload是函数调用时传来的参数
 // state: Vuex store 的状态对象，用于访问和修改状态
  // payload: 调用mutation时传入的参数（可选）
  xxx(state, payload){

	}
}

// 获取mutations函数
methods: {
	...mapMutation(['xxx', 'yyy'])
}

// 调用mutations函数-当做methods调用
this.xxx(参数)
this.yyy(参数)
```

### Ations

作用：处理异步逻辑（发请求）

语法：

```javascript
// 定义actions函数
mutations: {
  xxx(state, payload){

	}
}

actions: {
  xxxAsync(context){
		context.commit('xxx')
	}
}

// 获取actions函数
methods: {
  ...mapActions(['xxxAsync'])
}

// 调用mutations函数-当做methods调用
this.xxxAsync(参数)
```

### getters

作用：计算属性

```javascript
// 声明数据
getters: {
  计算属性名(state){
    return ... // 一定要有返回值
  }
}

// 组件内，获取计算属性
computed: {
	...mapGetters(['计算属性名'])
}
```

### 阶段小结

```javascript
new Vuex.Store({
  state: {
    xxx: 90,
  },
  mutations: {
    updateXxx(state, payload) {
      state.xxx = payload;
    },
  },
  actions: {
    async updateXxxAsync(context, payload) {
      const res = await axios();
      context.commit("updateXxx", res);
    },
  },
  getters: {
    doubleXxx(state) {
      return state.xxx * 2;
    },
  },
});
```

```javascript
<script>
export default {
	computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount'])
  },
  methods: {
    ...mapMutations(['updateXxx']),
    ...mapActions(['updateXxxAsync'])
  }
}

</script>
```

### modules

作用：把数据和方法，放在不同的属性下

语法：

```javascript
new Vuex.Store({
  模块名: {
    // 开启命名空间
    namespaced: true,
    state: {
      xxx: 90,
    },
    mutations: {
      updateXxx(state, payload) {
        state.xxx = payload;
      },
    },
    actions: {
      async updateXxxAsync(context, payload) {
        const res = await axios();
        context.commit("updateXxx", res);
      },
    },
    getters: {
      doubleXxx(state) {
        return state.xxx * 2;
      },
    },
  },
});
```

```javascript
<script>
export default {
	computed: {
    ...mapState('模块名', ['count']),
    ...mapGetters('模块名', ['doubleCount'])
  },
  methods: {
    ...mapMutations('模块名', ['updateXxx']),
    ...mapActions('模块名', ['updateXxxAsync'])
  }
}

</script>
```

## 综合案例 - 购物车

需求：

1. 发请求动态渲染购物车，数据存`vuex` （存`cart`模块， 将来还会有`user`模块，`article`模块...）
2. 可以修改数据
3. 动态计算总价和总数量

### 构建 vuex-cart 模块

1. 新建 `store/modules/cart.js`

```js
export default {
  namespaced: true,
  state() {
    return {
      list: [],
    };
  },
};
```

2. 挂载到 `vuex` 仓库上 `store/index.js`

```js
import Vuex from "vuex";
import Vue from "vue";

import cart from "./modules/cart";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    cart,
  },
});

export default store;
```

## 准备后端接口服务环境(了解)

1. 安装全局工具 `json-server` （全局工具仅需要安装一次）

```bash
npm i json-server -g
```

2. 代码根目录新建一个 `db` 目录
3. 将资料 `index.json` 移入 `db` 目录

```json
{
  "cart": [
    {
      "id": "100001",
      "name": "低帮城市休闲户外鞋天然牛皮COOLMAX纤维",
      "price": 128,
      "count": 10,
      "thumb": "https://yanxuan-item.nosdn.127.net/3a56a913e687dc2279473e325ea770a9.jpg"
    },
    {
      "id": "100002",
      "name": "网易味央黑猪猪肘330g*1袋",
      "price": 39,
      "count": 1,
      "thumb": "https://yanxuan-item.nosdn.127.net/d0a56474a8443cf6abd5afc539aa2476.jpg"
    },
    {
      "id": "100003",
      "name": "KENROLL男女简洁多彩一片式室外拖",
      "price": 128,
      "count": 2,
      "thumb": "https://yanxuan-item.nosdn.127.net/eb1556fcc59e2fd98d9b0bc201dd4409.jpg"
    },
    {
      "id": "100004",
      "name": "云音乐定制IN系列intar民谣木吉他",
      "price": 589,
      "count": 3,
      "thumb": "https://yanxuan-item.nosdn.127.net/4d825431a3587edb63cb165166f8fc76.jpg"
    }
  ]
}
```

4. 进入 `db` 目录，执行命令，启动后端接口服务

```bash
json-server index.json
```

### 请求动态渲染数据

```bash
// 获取接口
// 请求方式：get
// 请求地址：http://localhost:3000/cart
```

1. 安装 `axios`

```bash
npm i axios -S
```

2. 准备`actions` 和 `mutations`

```js
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      list: [],
    };
  },
  mutations: {
    updateList(state, payload) {
      state.list = payload;
    },
  },
  actions: {
    async getList(ctx) {
      const res = await axios.get("http://localhost:3000/cart");
      ctx.commit("updateList", res.data);
    },
  },
};
```

3. `App.vue`页面中调用 `action`, 获取数据

```js
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    CartHeader,
    CartFooter,
    CartItem,
  },
  created() {
    this.$store.dispatch("cart/getList");
  },
  computed: {
    ...mapState("cart", ["list"]),
  },
};
```

4. 动态渲染

```html
<!-- 商品 Item 项组件 -->
<cart-item v-for="item in list" :key="item.id" :item="item"></cart-item>
```

`cart-item.vue`

```vue
<template>
  <div class="goods-container">
    <!-- 左侧图片区域 -->
    <div class="left">
      <img :src="item.thumb" class="avatar" alt="" />
    </div>
    <!-- 右侧商品区域 -->
    <div class="right">
      <!-- 标题 -->
      <div class="title">{{ item.name }}</div>
      <div class="info">
        <!-- 单价 -->
        <span class="price">￥{{ item.price }}</span>
        <div class="btns">
          <!-- 按钮区域 -->
          <button class="btn btn-light">-</button>
          <span class="count">{{ item.count }}</span>
          <button class="btn btn-light">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    item: Object,
  },
  methods: {},
};
</script>
```

### 修改数量

```js
// 请求方式：patch
// 请求地址：http://localhost:3000/cart/:id值  表示修改的是哪个对象
// 请求参数：
{
  name: '新值',  【可选】
  price: '新值', 【可选】
  count: '新值', 【可选】
  thumb: '新值'  【可选】
}
```

1. 注册点击事件

```js
<!-- 按钮区域 -->
<button class="btn btn-light" @click="onBtnClick(-1)">-</button>
<span class="count">{{item.count}}</span>
<button class="btn btn-light" @click="onBtnClick(1)">+</button>
```

2. 页面中 `dispatch` `action`

```js
methods: {
	...mapActions('cart', ['updateCountAsync'])
}

onBtnClick (step) {
  const newCount = this.item.count + step
  if (newCount < 1) return

  // 发送修改数量请求
  this.updateCountAsync({
    id: this.item.id,
    count: newCount
  })
}
```

3. 提供 `action` 函数

```js
async updateCountAsync (ctx, payload) {
  await axios.patch('http://localhost:3000/cart/' + payload.id, {
    count: payload.count
  })
  ctx.commit('updateCount', payload)
}
```

4. 提供 `mutations` 函数

```js
mutations: {
  ...,
  updateCount (state, payload) {
    const goods = state.list.find((item) => item.id === payload.id)
    goods.count = payload.count
  }
},
```

### 底部总价展示

1. 提供 `getters`

```js
getters: {
  total(state) {
    return state.list.reduce((p, c) => p + c.count, 0);
  },
  totalPrice (state) {
    return state.list.reduce((p, c) => p + c.count * c.price, 0);
  },
},

```

2. 动态渲染

```vue
<template>
  <div class="footer-container">
    <!-- 中间的合计 -->
    <div>
      <span>共 {{ total }} 件商品，合计：</span>
      <span class="price">￥{{ totalPrice }}</span>
    </div>
    <!-- 右侧结算按钮 -->
    <button class="btn btn-success btn-settle">结算</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CartFooter",
  computed: {
    ...mapGetters("cart", ["total", "totalPrice"]),
  },
};
</script>
```

代码位置： [https://gitee.com/RanGuMo/20230619vue-cart-demo](https://gitee.com/RanGuMo/20230619vue-cart-demo)
