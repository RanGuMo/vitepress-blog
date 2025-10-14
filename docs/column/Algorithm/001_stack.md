---
# prev:
#   text: '上一页'
#   link: '/guide/markdown'
# next:
#   text: '下一页'
#   link: '/guide/markdown'

# 控制当前页面的 最后更新时间，是否显示
# lastUpdated: true
---

# 栈

https://vitepress.yiov.top/
## Stack
A stack is a linear data structure that follows the Last In First Out (LIFO) principle. It is a collection of elements where the last element added is the first element to be removed.
Here is a simple implementation of a stack in Python:
```python
class Stack:
    def __init__(self):
        self.stack = []
        self.top = -1
        self.size = 0
        self.max_size = 10
        self.is_full = False
        self.is_empty = True
        self.push_count = 0
        self.pop_count = 0
        self.peek_count = 0
        self.is_empty_count = 0
        self.is_full_count = 0
        self.size_count = 0
        self.clear_count = 0
        self.print_count = 0
        self.push_time = 0
        self.pop_time = 0
        self.peek_time = 0
        self.clear_time = 0
        self.print_time = 0
        self.is_empty_time = 0
        self.is_full_time = 0
        self.size_time = 0
        
        def push(self, item):
```

Here is a simple implementation of a stack in Python:
