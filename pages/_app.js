import Head from "next/head";

import "../styles/global.css";
import "../styles/carbon.css";

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width" />
      <link rel="canonical" href="https://canidev.tools/" />
  
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@CanIDevTools" />
      <meta name="twitter:creator" content="@pankajparashar" />
      
      <meta name='application-name' content="Can I DevTools?" />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content={"Can I DevTools?"} />
      
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='msapplication-config' content='/browserconfig.xml' />
      <meta name='msapplication-TileColor' content='#2B5797' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='theme-color' content='#000000' />
    </Head>
    <Component {...pageProps} />
  </>
  );
  
  export default MyApp