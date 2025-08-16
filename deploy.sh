#!/bin/bash

# AI花草识别小程序部署脚本 (Next.js版本)

echo "🌸 开始部署AI花草识别小程序..."

# 检查Node.js版本
echo "📋 检查Node.js版本..."
node_version=$(node -v)
echo "当前Node.js版本: $node_version"

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 构建项目
echo "🔨 构建Next.js项目..."
npm run build

# 检查是否安装了Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI未安装，正在安装..."
    npm install -g vercel
fi

# 检查环境变量
if [ -z "$ZHIPU_API_KEY" ]; then
    echo "⚠️  警告: ZHIPU_API_KEY环境变量未设置"
    echo "请在Vercel控制台中设置此环境变量"
fi

# 部署到Vercel
echo "🚀 正在部署到Vercel..."
vercel --prod

echo "✅ 部署完成！"
echo "📱 请在Vercel控制台中查看部署状态和访问链接"
echo "🔧 记得在Vercel项目设置中配置ZHIPU_API_KEY环境变量"
echo "🔍 SEO优化已启用，包含sitemap.xml和robots.txt"
