# AI识花小程序 API 文档

## 概述

AI识花小程序提供RESTful API接口，用于花朵图片识别功能。API基于Vercel Serverless Functions构建，集成智谱AI GLM-4.5V模型。

## 基础信息

- **Base URL**: `https://your-domain.vercel.app`
- **API版本**: v1
- **认证方式**: 无需客户端认证（API密钥在服务端管理）
- **数据格式**: JSON
- **字符编码**: UTF-8

## 接口列表

### 1. 花朵识别接口

识别上传的花朵图片并返回花朵名称。

#### 请求信息

- **URL**: `/api/identify`
- **方法**: `POST`
- **Content-Type**: `application/json`

#### 请求参数

| 参数名 | 类型 | 必需 | 描述 |
|--------|------|------|------|
| image | string | 是 | Base64编码的图片数据，格式：`data:image/jpeg;base64,xxx` |
| prompt | string | 否 | 自定义识别提示词，默认为标准花朵识别提示 |

#### 请求示例

```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "prompt": "请识别并告诉我这张图里最主要的花是什么名字？只告诉我名字即可。"
}
```

#### 响应格式

##### 成功响应

**状态码**: `200 OK`

```json
{
  "success": true,
  "flowerName": "玫瑰",
  "originalResponse": "这是一朵美丽的红玫瑰"
}
```

##### 错误响应

**状态码**: `400 Bad Request`

```json
{
  "success": false,
  "error": "缺少图片数据"
}
```

**状态码**: `500 Internal Server Error`

```json
{
  "success": false,
  "error": "服务器内部错误，请稍后重试"
}
```

#### 响应字段说明

| 字段名 | 类型 | 描述 |
|--------|------|------|
| success | boolean | 请求是否成功 |
| flowerName | string | 识别出的花朵名称（仅成功时返回） |
| originalResponse | string | AI模型的原始响应（仅成功时返回） |
| error | string | 错误信息（仅失败时返回） |

## 错误码说明

| HTTP状态码 | 错误类型 | 描述 | 解决方案 |
|------------|----------|------|----------|
| 400 | 请求参数错误 | 缺少必需参数或参数格式错误 | 检查请求参数 |
| 401 | 认证失败 | API密钥无效 | 联系管理员检查API密钥配置 |
| 413 | 请求体过大 | 图片文件过大 | 压缩图片或选择更小的图片 |
| 429 | 请求频率过高 | API调用频率超限 | 稍后重试 |
| 500 | 服务器错误 | 内部服务错误 | 稍后重试或联系技术支持 |
| 502 | 网关错误 | 上游服务不可用 | 稍后重试 |
| 504 | 网关超时 | 请求处理超时 | 稍后重试 |

## 使用限制

### 请求限制

- **文件大小**: 最大5MB
- **文件格式**: JPG, PNG, WEBP
- **请求频率**: 建议不超过10次/分钟
- **超时时间**: 30秒

### 图片要求

- **分辨率**: 建议800x600以上
- **内容**: 图片应包含清晰可见的花朵
- **质量**: 光线充足，焦点清晰

## SDK和示例

### JavaScript/Node.js

```javascript
async function identifyFlower(imageBase64) {
  try {
    const response = await fetch('/api/identify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageBase64,
        prompt: "请识别并告诉我这张图里最主要的花是什么名字？只告诉我名字即可。"
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('识别结果:', result.flowerName);
      return result.flowerName;
    } else {
      console.error('识别失败:', result.error);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
}
```

### Python

```python
import requests
import base64

def identify_flower(image_path):
    # 读取图片并转换为base64
    with open(image_path, 'rb') as image_file:
        image_data = base64.b64encode(image_file.read()).decode('utf-8')
        image_base64 = f"data:image/jpeg;base64,{image_data}"
    
    # 发送请求
    response = requests.post(
        'https://your-domain.vercel.app/api/identify',
        json={
            'image': image_base64,
            'prompt': '请识别并告诉我这张图里最主要的花是什么名字？只告诉我名字即可。'
        },
        headers={'Content-Type': 'application/json'}
    )
    
    result = response.json()
    
    if result['success']:
        return result['flowerName']
    else:
        raise Exception(result['error'])
```

### cURL

```bash
curl -X POST https://your-domain.vercel.app/api/identify \
  -H "Content-Type: application/json" \
  -d '{
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    "prompt": "请识别并告诉我这张图里最主要的花是什么名字？只告诉我名字即可。"
  }'
```

## 最佳实践

### 1. 图片预处理

```javascript
// 压缩图片
function compressImage(file, maxWidth = 800, quality = 0.8) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    
    img.src = URL.createObjectURL(file);
  });
}
```

### 2. 错误处理

```javascript
function handleApiError(error) {
  if (error.message.includes('Failed to fetch')) {
    return '网络连接失败，请检查网络连接后重试';
  } else if (error.message.includes('500')) {
    return '服务器内部错误，请稍后重试';
  } else if (error.message.includes('429')) {
    return 'API调用频率过高，请稍后重试';
  } else {
    return error.message || '识别失败，请重试';
  }
}
```

### 3. 请求重试

```javascript
async function identifyWithRetry(imageBase64, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await identifyFlower(imageBase64);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

## 更新日志

### v1.0.0 (2025-08-16)
- 初始API版本
- 支持花朵图片识别
- 集成智谱AI GLM-4.5V模型

## 技术支持

如有API使用问题，请：

1. 查看本文档的常见问题部分
2. 检查请求格式和参数
3. 查看服务器日志
4. 联系技术支持团队

---

**注意**: 本API仅用于花朵识别，请勿上传其他类型的图片或敏感内容。
