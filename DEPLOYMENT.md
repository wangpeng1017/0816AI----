# AI识花小程序部署指南

本指南将帮助您将AI识花小程序部署到Vercel平台。

## 前置要求

1. **Node.js环境**
   - Node.js 18.0.0 或更高版本
   - npm 或 yarn 包管理器

2. **Vercel账号**
   - 注册Vercel账号：https://vercel.com
   - 安装Vercel CLI

3. **智谱AI API密钥**
   - 注册智谱AI账号：https://bigmodel.cn
   - 获取API密钥

## 部署步骤

### 1. 准备项目

```bash
# 克隆项目（如果从Git仓库）
git clone <your-repository-url>
cd ai-flower-recognition

# 或者直接使用现有项目文件
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

创建 `.env.local` 文件（仅用于本地开发）：

```bash
# .env.local
ZHIPU_API_KEY=your_api_key_here
```

**注意**：不要将 `.env.local` 文件提交到Git仓库！

### 4. 本地测试

```bash
# 启动本地开发服务器
npx vercel dev

# 访问 http://localhost:3000 测试功能
```

### 5. 部署到Vercel

#### 方法一：使用Vercel CLI

```bash
# 安装Vercel CLI（如果未安装）
npm install -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel

# 生产环境部署
vercel --prod
```

#### 方法二：通过Git集成

1. 将代码推送到GitHub/GitLab/Bitbucket
2. 在Vercel控制台中导入项目
3. 连接Git仓库
4. 配置构建设置（通常自动检测）
5. 部署

### 6. 配置环境变量

在Vercel控制台中：

1. 进入项目设置
2. 选择"Environment Variables"
3. 添加以下变量：

| 变量名 | 值 | 环境 |
|--------|----|----|
| `ZHIPU_API_KEY` | 您的智谱AI API密钥 | Production, Preview, Development |

### 7. 验证部署

1. 访问Vercel提供的部署URL
2. 测试图片上传功能
3. 验证AI识别功能正常工作

## 自定义域名（可选）

### 1. 在Vercel中添加域名

1. 进入项目设置
2. 选择"Domains"
3. 添加您的自定义域名

### 2. 配置DNS

根据Vercel提供的说明配置您的DNS记录。

## 性能优化

### 1. 启用压缩

Vercel默认启用Gzip压缩，无需额外配置。

### 2. 缓存策略

在 `vercel.json` 中配置缓存：

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 3. 图片优化

考虑使用Vercel的图片优化功能或第三方CDN。

## 监控和日志

### 1. 查看部署日志

在Vercel控制台的"Functions"标签页中查看云函数日志。

### 2. 性能监控

使用Vercel Analytics监控应用性能。

### 3. 错误追踪

考虑集成Sentry等错误追踪服务。

## 故障排除

### 常见问题

1. **API密钥错误**
   - 检查环境变量是否正确设置
   - 确认API密钥有效且有足够额度

2. **部署失败**
   - 检查Node.js版本兼容性
   - 查看构建日志中的错误信息

3. **函数超时**
   - 检查网络连接
   - 优化API调用逻辑

4. **CORS错误**
   - 确认API函数中的CORS设置正确

### 调试技巧

1. **本地调试**
   ```bash
   vercel dev --debug
   ```

2. **查看函数日志**
   ```bash
   vercel logs
   ```

3. **检查环境变量**
   ```bash
   vercel env ls
   ```

## 安全考虑

1. **API密钥保护**
   - 永远不要在前端代码中暴露API密钥
   - 使用环境变量存储敏感信息

2. **请求限制**
   - 考虑添加请求频率限制
   - 监控API使用量

3. **输入验证**
   - 验证上传文件的类型和大小
   - 防止恶意文件上传

## 成本优化

1. **Vercel免费额度**
   - 了解Vercel的免费使用限制
   - 监控使用量避免超额费用

2. **API调用优化**
   - 实现图片压缩减少API调用成本
   - 考虑添加缓存机制

## 更新和维护

1. **代码更新**
   - 通过Git推送自动触发重新部署
   - 或使用Vercel CLI手动部署

2. **依赖更新**
   ```bash
   npm update
   npm audit fix
   ```

3. **监控和告警**
   - 设置Vercel的部署通知
   - 监控应用健康状态

## 支持

如果遇到部署问题：

1. 查看Vercel官方文档
2. 检查项目的GitHub Issues
3. 联系开发团队

---

**注意**：部署前请确保已经测试了所有功能，并且API密钥配置正确。
