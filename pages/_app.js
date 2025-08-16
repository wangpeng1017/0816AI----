import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* 基础meta标签 */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* 预加载关键资源 */}
        <link rel="preload" href="/fonts/system-font.woff2" as="font" type="font/woff2" crossOrigin="" />
        
        {/* 性能优化 */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* 安全性 */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' https://open.bigmodel.cn;" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
