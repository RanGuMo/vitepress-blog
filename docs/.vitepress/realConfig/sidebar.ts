import { DefaultTheme } from 'vitepress';
export const sidebar: DefaultTheme.Sidebar = {
  // /column/DevelopmentTooling/表示对这个文件夹下的所有md文件做侧边栏配置
  '/column/DevelopmentTooling/': [
    // 第一部分
    {
      text: '包管理工具',
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
    }
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
  ]
};