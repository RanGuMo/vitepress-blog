# 队列

## queue
队列
队列是一种特殊的线性表，它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作。队列的插入和删除操作分别成为入队（enqueue）和出队（dequeue）。
队列的实现
队列的实现可以使用数组或者链表来实现。
队列的数组实现
队列的数组实现如下：
```c
#include <stdio.h>
#define MAXSIZE 100
typedef struct {
    int data[MAXSIZE];
    int front;
    int rear;
} SqQueue;
```
队列的链表实现
队列的链表实现如下：
```c
#include <stdio.h>
#include <stdlib.h>
typedef struct QNode {
    int data;
    struct QNode *next;
}QNode, *QueuePtr;

typedef struct {
    QueuePtr front;
    QueuePtr rear;
}LinkQueue;
``` 
