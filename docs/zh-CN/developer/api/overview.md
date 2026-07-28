# API 概览

SmartTable 提供完整的 RESTful API，方便与其他系统集成。

## API 基础

### 基础 URL

```
https://your-domain.com/api/v1
```

### 认证方式

所有 API 请求需要在 Header 中携带认证令牌：

```http
Authorization: Bearer <your-token>
```

### 响应格式

所有响应均为 JSON 格式：

```json
{
  "success": true,
  "data": { ... },
  "message": "操作成功"
}
```

## API 分类

### 表格 API

- 获取表格列表
- 创建/更新/删除表格
- 获取表格结构

### 记录 API

- 获取记录列表
- 创建/更新/删除记录
- 批量操作

### 字段 API

- 获取字段列表
- 创建/更新/删除字段
- 字段类型配置

### 工作流 API

- 触发工作流
- 查询执行状态
- 工作流管理

## 请求限制

- 默认每分钟 100 次请求
- 支持批量请求优化
- 建议使用缓存

## 错误处理

### 错误响应格式

```json
{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN",
    "message": "认证令牌无效"
  }
}
```

### 常见错误码

- `INVALID_TOKEN`: 认证失败
- `PERMISSION_DENIED`: 权限不足
- `NOT_FOUND`: 资源不存在
- `VALIDATION_ERROR`: 参数验证失败

## 下一步

- [认证](/zh-CN/developer/api/authentication)
- [数据表 API](/zh-CN/developer/api/table)