import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta property="twitter:url" content="https://canidev.tools/" />
          <meta property="twitter:title" content="Can I Devtools?" />

          <meta
            name="description"
            content="Can I DevTools is like Can I Use but for the browser devtools. It's created and curated by Pankaj Parashar."
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
          <meta
            name="google-site-verification"
            content="2yd7PjEmLRyLyn7nmV_UuDCCeZSK-n6eQdlYuNwZBMM"
          />
          <link rel="canonical" href="https://canidev.tools/" />
          <meta name="apple-mobile-web-app-title" content="Can I DevTools?" />
          <meta name="application-name" content="Can I DevTools?" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#ffffff" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://canidev.tools/" />
          <meta property="og:title" content="Can I Devtools?" />
          <meta
            property="og:description"
            content="Can I DevTools is like Can I Use but for the browser devtools. It's created and curated by Pankaj Parashar."
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/canidevtools/image/upload/v1652023254/social-media-image.png"
          />
          <meta property="twitter:card" content="summary_large_image" />

          <meta
            property="twitter:description"
            content="It's like @CanIUse but for the browser devtools. Created by Pankaj Parashar & curated by community."
          />
          <meta
            property="twitter:image"
            content="https://res.cloudinary.com/canidevtools/image/upload/v1652023254/social-media-image.png"
          />
          <meta name="viewport" content="width=device-width, initial-scale=0.9, maximum-scale=0.9" />
          <meta name="twitter:site" content="@CanIDevTools" />
          <meta name="twitter:creator" content="@pankajparashar" />
          <script
            data-goatcounter="https://canidevtools.goatcounter.com/count"
            async
            src="//gc.zgo.at/count.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
