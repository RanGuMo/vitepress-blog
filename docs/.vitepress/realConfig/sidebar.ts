import { DefaultTheme } from 'vitepress';
export const sidebar: DefaultTheme.Sidebar = {
  // /column/DevelopmentTooling/表示对这个文件夹下的所有md文件做侧边栏配置
  '/column/DevelopmentTooling/': [
    // 第一部分
    {
      text: '包管理工具',
      collapsed: false, // 可折叠
      items: [
        {
          text: 'pnpm',
          link: '/column/DevelopmentTooling/001_pnpm'
        },
        {
          text: 'npm',
          link: '/column/DevelopmentTooling/002_npm'
        },
        {
          text: 'yarn',
          link: '/column/DevelopmentTooling/003_yarn'
        },
      ]
    },
    // 第二部分
    {
      text: '构建工具',
      collapsed: false, // 可折叠
      items: [
        {
          text: 'Webpack',
          link: '/column/DevelopmentTooling/004_webpack'
        },
        {
          text: 'Vite',
          link: '/column/DevelopmentTooling/005_vite'
        },
        {
          text: 'Rollup',
          link: '/column/DevelopmentTooling/006_rollup'
        }
      ]
    },
    {
      text: '项目管理模式',
      collapsed: false, // 可折叠
      items: [
        {
          text: 'Monorepo',
          link: '/column/DevelopmentTooling/007_monorepo'
        },
      ]
    }
  ],
  '/column/TypeScript/': [
    {
      text: 'TypeScript',
      items: [
        {
          text: 'TypeScript 起步',
          link: '/column/TypeScript/001_ts_basic'
        },
        {
          text: 'TypeScript 核心',
          link: '/column/TypeScript/002_ts_core'
        },
        {
          text: 'TypeScript 进阶',
          link: '/column/TypeScript/003_ts_advanced'
        }
      ]
    }
  ],
  '/column/Vue/': [
    // 第一部分
    {
      text: 'Vue',
      items: [
        {
          text: 'Vue2',
          link: '/column/Vue/001_vue2'
        },
        {
          text: 'Vuex',
          link: '/column/Vue/002_vuex'
        },
        {
          text: 'Pinia',
          link: '/column/Vue/003_pinia'
        },
      ]
    },
  ],
  '/column/UniApp/': [
    {
      text: '黑马优购项目',
      collapsed: false, // 可折叠
      items: [
        {
          text: '1. 起步',
          link: '/column/UniApp/heima_proj/001_uniapp-1'
        },
        {
          text: '2. tabBar',
          link: '/column/UniApp/heima_proj/001_uniapp-2'
        },
        {
          text: '3. 首页',
          link: '/column/UniApp/heima_proj/001_uniapp-3'
        },
        {
          text: '4. 分类',
          link: '/column/UniApp/heima_proj/001_uniapp-4'
        },
        {
          text: '5. 搜索',
          link: '/column/UniApp/heima_proj/001_uniapp-5'
        },
        {
          text: '6. 商品列表',
          link: '/column/UniApp/heima_proj/001_uniapp-6'
        },
        {
          text: '7. 商品详情',
          link: '/column/UniApp/heima_proj/001_uniapp-7'
        },
        {
          text: '8. 加入购物车',
          link: '/column/UniApp/heima_proj/001_uniapp-8'
        },
        {
          text: '9. 购物车页面',
          link: '/column/UniApp/heima_proj/001_uniapp-9'
        },
        {
          text: '10. 登录与支付',
          link: '/column/UniApp/heima_proj/001_uniapp-10'
        },
        {
          text: '11. 发布',
          link: '/column/UniApp/heima_proj/001_uniapp-11'
        },
      ]
    },
    {
      text: 'uniapp 相关',
      collapsed: false, // 可折叠
      items: [
        {
          text: '1. Android 本地离线打包',
          link: '/column/UniApp/uniapp/001_android_package'
        },
        
      ]
    },
  ],
  '/column/Nextjs/': [
    // 第一部分
    {
      text: '入门',
      items: [
        {
          text: '开始使用',
          link: '/column/Nextjs/001_start'
        },
        {
          text: '项目搭建',
          link: '/column/Nextjs/002_create'
        }
      ]
    },
    {
      text: '路由',
      items: [
        {
          text: 'App Router',
          link: '/column/Nextjs/003_app_router'
        },
        {
          text: '路由导航',
          link: '/column/Nextjs/004_router'
        },
        {
          text: '动态路由',
          link: '/column/Nextjs/005_dynamic_router'
        },
        {
          text: '平行路由',
          link: '/column/Nextjs/006_parallel_router'
        },
        {
          text: '路由组',
          link: '/column/Nextjs/007_route_groups'
        },
        {
          text: '拦截路由',
          link: '/column/Nextjs/008_intercepting_routes'
        },
        {
          text: '路由处理',
          link: '/column/Nextjs/009_route_handler'
        },
        {
          text: 'VSCode 插件 Restful Client',
          link: '/column/Nextjs/010_restful_client'
        }
      ]
    },
    {
      text: 'Proxy代理',
      items: [
        {
          text: 'Proxy代理',
          link: '/column/Nextjs/011_proxy'
        }
      ]
    }
  ],
  '/column/StudyRoute/': [{
    text: '基础阶段',
    items: [
      {
        text: 'git',
        link: '/column/StudyRoute/001_git'
      },
      {
        text: 'mysql',
        link: '/column/StudyRoute/002_mysql'
      },
      {
        text: 'Linux',
        link: '/column/StudyRoute/003_linux'
      }
    ]
  }],
};