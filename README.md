# AI花草识别小程序

一个基于智谱AI GLM-4.5V模型的专业花草识别应用，采用Next.js框架开发，具备完整的SEO优化功能。用户可以通过上传图片快速识别花朵名称。

## 功能特性

- 📷 支持拍照和相册选择
- 🌸 智能花草识别，支持数千种植物
- 📱 响应式设计，完美适配移动端
- ⚡ 快速识别，2-5秒内获得结果
- 🎨 现代化UI设计，用户体验优秀
- 🔍 全面SEO优化，搜索引擎友好
- 📊 结构化数据标记，提升搜索可见性
- 🚀 PWA支持，可安装到桌面

## 技术栈

- **前端**: Next.js 14, React 18, CSS3
- **后端**: Vercel Serverless Functions (Node.js)
- **AI模型**: 智谱AI GLM-4.5V
- **部署**: Vercel
- **SEO**: 结构化数据、sitemap、robots.txt

## 项目结构

```
├── pages/
│   ├── index.js           # 主页面 (SEO优化)
│   ├── about.js           # 关于页面
│   ├── sitemap.xml.js     # 动态sitemap生成
│   └── _app.js            # Next.js应用入口
├── components/
│   └── FlowerIdentifier.js # 花朵识别组件
├── styles/
│   └── globals.css        # 全局样式
├── public/
│   ├── robots.txt         # 搜索引擎爬虫配置
│   ├── sitemap.xml        # 站点地图
│   ├── manifest.json      # PWA配置
│   └── favicon.svg        # 网站图标
├── api/
│   └── identify.js        # Vercel云函数 (保持不变)
├── next.config.js         # Next.js配置
├── vercel.json           # Vercel部署配置
├── package.json          # 项目配置
└── README.md             # 项目说明
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
SITE_URL=http://localhost:3000
```

4. 启动开发服务器
```bash
# Next.js开发模式
npm run dev

# 或使用Vercel开发模式（推荐，支持API函数）
npx vercel dev
```

5. 访问 http://localhost:3000

## SEO功能

### 关键词优化
- **核心关键词**: AI花草识别
- **长尾关键词**: 花识别、花草识别、智谱花草识别、AI识花、花朵识别

### SEO特性
- ✅ 优化的页面标题和描述
- ✅ 结构化数据标记 (JSON-LD)
- ✅ 自动生成sitemap.xml
- ✅ 搜索引擎友好的robots.txt
- ✅ Open Graph和Twitter Card支持
- ✅ 语义化HTML结构
- ✅ 图片alt属性优化
- ✅ 页面加载性能优化

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

### v2.0.0 (2025-08-16) - Next.js SEO优化版本
- 🚀 **重大升级**: 迁移到Next.js 14框架
- 🔍 **全面SEO优化**: 实现专业的搜索引擎优化
- 📊 **结构化数据**: 添加JSON-LD标记提升搜索可见性
- 🌐 **多页面支持**: 新增关于页面，丰富内容深度
- ⚡ **性能提升**: SSG模式，显著提升加载速度
- 📱 **PWA支持**: 可安装的Web应用体验
- 🎯 **关键词优化**: 针对"AI花草识别"等核心关键词优化
- 🤖 **智能sitemap**: 动态生成sitemap.xml
- 🔧 **开发体验**: 现代化的React组件开发

### v1.0.0 (2025-08-16)
- 初始版本发布
- 支持花朵图片识别
- 响应式设计
- Vercel部署支持
