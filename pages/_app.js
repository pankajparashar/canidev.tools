import "../styles/global.css";
import "../styles/carbon.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  const title = "Can I DevTools?"
  const description = "It is like @CanIUse, but for the browser devtools, created and curated by Pankaj Parashar."

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="title" content={title} />
        <meta name="viewport" content="width=device-width, initial-scale=0.9, viewport-fit=cover" />
        <meta
          name="description"
          content={description}
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://canidev.tools/" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/canidevtools/image/upload/v1652023254/social-media-image.png"
        />
        <meta name="twitter:site" content="@CanIDevTools" />
        <meta name="twitter:creator" content="@pankajparashar" />
        
        <meta name='application-name' content={title} />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content={title} />
        <meta name='description' content={description} />
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
}
