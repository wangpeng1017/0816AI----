#!/usr/bin/env node

/**
 * Vercel部署诊断脚本
 * 用于检查Next.js应用的部署配置和常见问题
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 AI花草识别小程序 - Vercel部署诊断');
console.log('=====================================\n');

// 检查必要文件
const requiredFiles = [
  'package.json',
  'next.config.js',
  'vercel.json',
  'pages/index.js',
  'pages/_app.js',
  'api/identify.js'
];

console.log('📁 检查必要文件...');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) {
    console.log(`   ⚠️  缺少必要文件: ${file}`);
  }
});

// 检查package.json配置
console.log('\n📦 检查package.json配置...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  console.log(`✅ 项目名称: ${packageJson.name}`);
  console.log(`✅ Next.js版本: ${packageJson.dependencies?.next || '未安装'}`);
  console.log(`✅ React版本: ${packageJson.dependencies?.react || '未安装'}`);
  
  // 检查构建脚本
  const buildScript = packageJson.scripts?.build;
  if (buildScript === 'next build') {
    console.log('✅ 构建脚本配置正确');
  } else {
    console.log(`❌ 构建脚本配置错误: ${buildScript}`);
    console.log('   应该是: "next build"');
  }
  
} catch (error) {
  console.log('❌ package.json解析失败:', error.message);
}

// 检查Next.js配置
console.log('\n⚙️  检查Next.js配置...');
try {
  const nextConfigPath = 'next.config.js';
  if (fs.existsSync(nextConfigPath)) {
    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
    
    // 检查是否有静态导出配置（这会导致404）
    if (nextConfigContent.includes('output:') && nextConfigContent.includes('export')) {
      console.log('❌ 发现静态导出配置，这可能导致404错误');
      console.log('   建议移除 output: "export" 配置');
    } else {
      console.log('✅ Next.js配置看起来正常');
    }
    
    // 检查图片配置
    if (nextConfigContent.includes('unoptimized: true')) {
      console.log('✅ 图片优化已禁用（适合静态部署）');
    }
  }
} catch (error) {
  console.log('❌ Next.js配置检查失败:', error.message);
}

// 检查Vercel配置
console.log('\n🚀 检查Vercel配置...');
try {
  const vercelJson = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  
  console.log(`✅ Vercel版本: ${vercelJson.version}`);
  console.log(`✅ 项目名称: ${vercelJson.name}`);
  
  if (vercelJson.framework === 'nextjs') {
    console.log('✅ 框架配置正确');
  } else {
    console.log('⚠️  建议添加 "framework": "nextjs"');
  }
  
  if (vercelJson.functions && vercelJson.functions['api/identify.js']) {
    console.log('✅ API函数配置正确');
  } else {
    console.log('⚠️  API函数配置可能有问题');
  }
  
} catch (error) {
  console.log('❌ vercel.json解析失败:', error.message);
}

// 检查pages目录结构
console.log('\n📄 检查pages目录结构...');
const pagesDir = 'pages';
if (fs.existsSync(pagesDir)) {
  const pages = fs.readdirSync(pagesDir);
  console.log('✅ 发现的页面:');
  pages.forEach(page => {
    console.log(`   - ${page}`);
  });
  
  // 检查index.js
  if (pages.includes('index.js')) {
    console.log('✅ 主页文件存在');
  } else {
    console.log('❌ 缺少主页文件 (index.js)');
  }
} else {
  console.log('❌ pages目录不存在');
}

// 检查API目录
console.log('\n🔌 检查API目录...');
const apiDir = 'api';
if (fs.existsSync(apiDir)) {
  const apis = fs.readdirSync(apiDir);
  console.log('✅ 发现的API:');
  apis.forEach(api => {
    console.log(`   - ${api}`);
  });
} else {
  console.log('❌ api目录不存在');
}

console.log('\n🔧 建议的修复步骤:');
console.log('1. 确保所有必要文件都存在');
console.log('2. 检查vercel.json配置是否正确');
console.log('3. 运行 "npm run build" 确保构建成功');
console.log('4. 重新部署到Vercel');
console.log('5. 检查Vercel控制台的构建日志');

console.log('\n📞 如果问题持续存在:');
console.log('- 检查Vercel项目设置中的框架预设');
console.log('- 确认自定义域名配置正确');
console.log('- 查看Vercel函数日志');
console.log('- 尝试删除.vercel目录后重新部署');

console.log('\n✅ 诊断完成！');
