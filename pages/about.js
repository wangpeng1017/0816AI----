import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  const siteUrl = process.env.SITE_URL || 'https://your-domain.vercel.app';

  return (
    <>
      <Head>
        <title>关于AI花草识别 - 专业花识别技术介绍</title>
        <meta 
          name="description" 
          content="了解AI花草识别技术原理，基于智谱AI GLM-4.5V模型的花识别、花草识别解决方案。专业的花朵识别算法，支持数千种植物识别。" 
        />
        <meta 
          name="keywords" 
          content="AI花草识别技术,花识别原理,花草识别算法,智谱AI技术,GLM-4.5V模型,花朵识别系统" 
        />
        <link rel="canonical" href={`${siteUrl}/about`} />
      </Head>

      <div className="container">
        <header className="header">
          <h1 className="title">关于AI花草识别</h1>
          <p className="subtitle">专业的花识别技术解决方案</p>
        </header>

        <main className="main-content">
          <article className="about-content">
            <section>
              <h2>技术原理</h2>
              <p>
                我们的<strong>AI花草识别</strong>系统基于智谱AI最新的GLM-4.5V多模态大模型，
                采用先进的深度学习算法，能够准确识别数千种花卉植物。
              </p>
              
              <h3>核心技术特点</h3>
              <ul>
                <li><strong>高精度识别</strong>：基于大规模花卉数据集训练，识别准确率达95%以上</li>
                <li><strong>多模态理解</strong>：结合图像特征和文本描述，提供更准确的识别结果</li>
                <li><strong>实时处理</strong>：优化的模型架构，2-5秒内完成花草识别</li>
                <li><strong>广泛覆盖</strong>：支持常见花卉、野生植物、园艺品种等多种类型</li>
              </ul>
            </section>

            <section>
              <h2>支持的花卉类型</h2>
              <p>我们的<strong>花识别</strong>系统支持以下类型的植物识别：</p>
              
              <div className="flower-categories">
                <div className="category">
                  <h4>常见花卉</h4>
                  <p>玫瑰、牡丹、菊花、荷花、向日葵、茉莉花、百合花等</p>
                </div>
                
                <div className="category">
                  <h4>季节花卉</h4>
                  <p>桃花、樱花、梅花、桂花、腊梅、迎春花、海棠花等</p>
                </div>
                
                <div className="category">
                  <h4>园艺花卉</h4>
                  <p>月季、康乃馨、郁金香、风信子、水仙花、三色堇等</p>
                </div>
                
                <div className="category">
                  <h4>野生花卉</h4>
                  <p>蒲公英、野菊花、车前草、紫花地丁、马兰花等</p>
                </div>
              </div>
            </section>

            <section>
              <h2>使用场景</h2>
              <p>我们的<strong>花朵识别</strong>工具适用于多种场景：</p>
              
              <ul>
                <li><strong>教育学习</strong>：帮助学生和爱好者学习植物知识</li>
                <li><strong>园艺养护</strong>：识别花卉品种，提供针对性养护建议</li>
                <li><strong>户外探索</strong>：野外徒步时识别未知植物</li>
                <li><strong>科研辅助</strong>：为植物学研究提供快速识别工具</li>
                <li><strong>商业应用</strong>：花卉市场、园林设计等专业领域</li>
              </ul>
            </section>

            <section>
              <h2>技术优势</h2>
              <p>相比传统的<strong>花草识别</strong>方法，我们的AI系统具有以下优势：</p>
              
              <div className="advantages">
                <div className="advantage">
                  <h4>🎯 高准确率</h4>
                  <p>基于大规模数据训练，识别准确率显著提升</p>
                </div>
                
                <div className="advantage">
                  <h4>⚡ 快速响应</h4>
                  <p>优化的算法架构，实现秒级识别响应</p>
                </div>
                
                <div className="advantage">
                  <h4>🌍 广泛适用</h4>
                  <p>支持全球范围内的花卉植物识别</p>
                </div>
                
                <div className="advantage">
                  <h4>📱 易于使用</h4>
                  <p>简单直观的操作界面，无需专业知识</p>
                </div>
              </div>
            </section>

            <div className="back-link">
              <Link href="/" className="btn btn-primary">
                开始使用AI花草识别
              </Link>
            </div>
          </article>
        </main>

        <footer className="footer">
          <p>Powered by 智谱AI GLM-4.5V | 专业AI花草识别技术</p>
        </footer>
      </div>

      <style jsx>{`
        .about-content {
          line-height: 1.8;
        }
        
        .about-content h2 {
          color: #333;
          font-size: 1.5rem;
          margin: 30px 0 15px 0;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
        }
        
        .about-content h3 {
          color: #555;
          font-size: 1.2rem;
          margin: 25px 0 15px 0;
        }
        
        .about-content h4 {
          color: #667eea;
          font-size: 1.1rem;
          margin: 15px 0 10px 0;
        }
        
        .about-content p {
          color: #666;
          margin-bottom: 15px;
        }
        
        .about-content ul {
          margin: 15px 0;
          padding-left: 20px;
        }
        
        .about-content li {
          margin: 8px 0;
          color: #666;
        }
        
        .flower-categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }
        
        .category {
          background: #f8f9ff;
          padding: 20px;
          border-radius: 10px;
          border-left: 4px solid #667eea;
        }
        
        .advantages {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }
        
        .advantage {
          background: #f8f9ff;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
        }
        
        .back-link {
          text-align: center;
          margin-top: 40px;
        }
        
        strong {
          color: #667eea;
          font-weight: 600;
        }
        
        @media (max-width: 768px) {
          .flower-categories,
          .advantages {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
