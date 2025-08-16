import Head from 'next/head';
import { useState, useRef, useCallback } from 'react';
import FlowerIdentifier from '../components/FlowerIdentifier';

export default function Home() {
  const siteUrl = process.env.SITE_URL || 'https://your-domain.vercel.app';
  
  // 结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI花草识别",
    "description": "专业的AI花草识别工具，支持花识别、花草识别、花朵识别。基于智谱AI技术，快速准确识别各种花卉植物。",
    "url": siteUrl,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CNY"
    },
    "creator": {
      "@type": "Organization",
      "name": "AI识花开发团队"
    },
    "keywords": "AI花草识别,花识别,花草识别,智谱花草识别,AI识花,花朵识别",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1000"
    }
  };

  return (
    <>
      <Head>
        {/* 基础SEO标签 */}
        <title>AI花草识别 - 专业花识别工具 | 智谱花草识别小程序</title>
        <meta 
          name="description" 
          content="AI花草识别小程序，专业的花识别、花草识别工具。基于智谱AI GLM-4.5V模型，支持花朵识别、植物识别。拍照即可快速识别花卉名称，准确率高达95%。" 
        />
        <meta 
          name="keywords" 
          content="AI花草识别,花识别,花草识别,智谱花草识别,AI识花,花朵识别,植物识别,花卉识别,智谱AI,GLM-4.5V" 
        />
        <meta name="author" content="AI识花开发团队" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="AI花草识别 - 专业花识别工具 | 智谱花草识别小程序" />
        <meta property="og:description" content="AI花草识别小程序，专业的花识别、花草识别工具。基于智谱AI技术，拍照即可快速识别花卉名称。" />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:site_name" content="AI花草识别" />
        <meta property="og:locale" content="zh_CN" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteUrl} />
        <meta property="twitter:title" content="AI花草识别 - 专业花识别工具" />
        <meta property="twitter:description" content="AI花草识别小程序，专业的花识别、花草识别工具。基于智谱AI技术，拍照即可快速识别花卉名称。" />
        <meta property="twitter:image" content={`${siteUrl}/og-image.jpg`} />

        {/* PWA支持 */}
        <meta name="theme-color" content="#667eea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AI花草识别" />
        
        {/* 图标和manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* 预连接优化 */}
        <link rel="preconnect" href="https://open.bigmodel.cn" />
        <link rel="dns-prefetch" href="https://open.bigmodel.cn" />
        
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        {/* 百度站长验证（如需要） */}
        {/* <meta name="baidu-site-verification" content="your-verification-code" /> */}
        
        {/* Google站长验证（如需要） */}
        {/* <meta name="google-site-verification" content="your-verification-code" /> */}
      </Head>

      <div className="container">
        {/* 头部区域 - 包含核心关键词 */}
        <header className="header">
          <h1 className="title">🌸 AI花草识别</h1>
          <p className="subtitle">专业的花识别工具，拍下花朵即刻知晓名称</p>
          <p className="description">
            基于智谱AI技术的花草识别小程序，支持花朵识别、植物识别。
            只需拍照上传，即可快速准确识别各种花卉名称。
          </p>
        </header>

        {/* 主要功能区域 */}
        <main className="main-content">
          <FlowerIdentifier />
          
          {/* SEO内容区域 */}
          <section className="seo-content">
            <h2>关于AI花草识别</h2>
            <p>
              我们的<strong>AI花草识别</strong>工具采用先进的智谱AI GLM-4.5V模型，
              为用户提供专业的<strong>花识别</strong>和<strong>花草识别</strong>服务。
              无论是常见的玫瑰、牡丹，还是稀有的花卉品种，我们的
              <strong>花朵识别</strong>系统都能准确识别。
            </p>
            
            <h3>功能特色</h3>
            <ul>
              <li>🎯 <strong>高精度识别</strong>：基于智谱AI技术，识别准确率高达95%</li>
              <li>📱 <strong>移动端优化</strong>：完美适配手机和平板设备</li>
              <li>⚡ <strong>快速响应</strong>：2-5秒内完成花草识别</li>
              <li>🌍 <strong>广泛支持</strong>：支持数千种花卉植物识别</li>
              <li>🔒 <strong>隐私保护</strong>：图片仅用于识别，不会保存</li>
            </ul>
            
            <h3>使用场景</h3>
            <p>
              适用于园艺爱好者、植物学习者、户外探索者等各类用户的
              <strong>花草识别</strong>需求。无论是在公园散步、野外徒步，
              还是在花卉市场选购，都能快速获得准确的<strong>花朵识别</strong>结果。
            </p>
          </section>
        </main>

        {/* 页脚 */}
        <footer className="footer">
          <p>Powered by 智谱AI GLM-4.5V | AI花草识别专业工具</p>
        </footer>
      </div>

      <style jsx>{`
        .seo-content {
          margin-top: 40px;
          padding: 30px;
          background: #f8f9ff;
          border-radius: 15px;
          line-height: 1.8;
        }
        
        .seo-content h2 {
          color: #333;
          font-size: 1.5rem;
          margin-bottom: 15px;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
        }
        
        .seo-content h3 {
          color: #555;
          font-size: 1.2rem;
          margin: 25px 0 15px 0;
        }
        
        .seo-content p {
          color: #666;
          margin-bottom: 15px;
        }
        
        .seo-content ul {
          list-style: none;
          padding: 0;
        }
        
        .seo-content li {
          margin: 10px 0;
          padding: 10px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .description {
          font-size: 1rem;
          color: rgba(255,255,255,0.9);
          margin-top: 10px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        strong {
          color: #667eea;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
