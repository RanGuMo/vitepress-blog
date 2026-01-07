# 字典

## Dictionary
字典是一种数据结构，用于存储键值对。
键值对中的键是唯一的，值可以重复。

创建字典：
```python
dict = {'key1': 'value1', 'key2': 'value2'}
```
访问字典中的值：
```python
print(dict['key1'])
```
添加键值对：
```python
dict['key3'] = 'value3'
```
删除键值对：
```python
del dict['key1']
```
遍历字典：
```python
for key, value in dict.items():
    print(key, value)
    print(key + ': ' + value)
    print('%s: %s' % (key, value))
    print('{}: {}'.format(key, value))
    print(f'{key}: {value}')
    print('{0}: {1}'.format(key, value))
```
获取字典长度：
```python
print(len(dict))
```
判断键是否存在：
```python
if 'key1' in dict:
    print('存在')
else:
    print('不存在')
```
获取字典所有键：
```python
print(dict.keys())
```
获取字典所有值：
```python
print(dict.values())
```
获取字典所有键值对：
```python
print(dict.items())
```
获取字典的副本：
```python
copy_dict = dict.copy()
copy_dict = dict
copy_dict = dict(dict)
copy_dict = dict.fromkeys(dict)
```
