import { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.NavItem[] = [
  {
    text: '首页',
    link: '/' // 表示docs/index.md
  },
  {
    text: '我的博客搭建',
    link: '/column/MyBlog/' 
  },
  {
    text: '前端专栏',
    items: [
      {
        text: 'HTML',
        link: '/column/HTML/' // 表示docs/column/HTML/index.md
      },
      {
        text: 'CSS',
        link: '/column/HTML/' // 表示docs/column/CSS/index.md
      },
       {
        text: '数据结构与算法',
        link: '/column/Algorithm/' // 对应docs/column/Algorithm下的index.md文件
      }
    ]
  },
  {
    text: '关于我',
    items: [
      { text: 'Github', link: 'https://github.com/RanGuMo' },
      {
        text: 'CSDN',
        link: 'https://blog.csdn.net/qq_43322436?spm=1010.2135.3001.5343'
      }
    ]
  }
];