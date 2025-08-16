# AI识花小程序

一个基于智谱AI GLM-4.5V模型的花朵识别小程序，用户可以通过上传图片快速识别花朵名称。

## 功能特性

- 📷 支持拍照和相册选择
- 🌸 智能花朵识别
- 📱 响应式设计，适配移动端
- ⚡ 快速识别，结果准确
- 🎨 简洁美观的用户界面

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (原生)
- **后端**: Vercel Serverless Functions (Node.js)
- **AI模型**: 智谱AI GLM-4.5V
- **部署**: Vercel

## 项目结构

```
├── index.html          # 主页面
├── style.css          # 样式文件
├── script.js          # 前端逻辑
├── api/
│   └── identify.js    # Vercel云函数
├── vercel.json        # Vercel配置
├── package.json       # 项目配置
└── README.md          # 项目说明
```

## 本地开发

1. 克隆项目
```bash
git clone <repository-url>
cd ai-flower-recognition
```

2. 安装依赖
```bash
npm install
```

3. 设置环境变量
创建 `.env.local` 文件：
```
ZHIPU_API_KEY=your_api_key_here
```

4. 启动开发服务器
```bash
npx vercel dev
```

5. 访问 http://localhost:3000

## 部署到Vercel

1. 安装Vercel CLI
```bash
npm install -g vercel
```

2. 登录Vercel
```bash
vercel login
```

3. 部署项目
```bash
vercel
```

4. 设置环境变量
在Vercel控制台中设置 `ZHIPU_API_KEY` 环境变量

## 环境变量

| 变量名 | 描述 | 必需 |
|--------|------|------|
| `ZHIPU_API_KEY` | 智谱AI API密钥 | 是 |

## API文档

### POST /api/identify

识别上传的花朵图片

**请求体:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "prompt": "请识别并告诉我这张图里最主要的花是什么名字？只告诉我名字即可。"
}
```

**响应:**
```json
{
  "success": true,
  "flowerName": "玫瑰",
  "originalResponse": "这是一朵美丽的玫瑰花"
}
```

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.0.0 (2025-08-16)
- 初始版本发布
- 支持花朵图片识别
- 响应式设计
- Vercel部署支持
