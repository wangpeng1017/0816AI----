#!/bin/bash

# AI识花小程序部署脚本

echo "🌸 开始部署AI识花小程序..."

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
