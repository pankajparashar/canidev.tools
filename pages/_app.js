import "../styles/global.css";
import "../styles/carbon.css";
import Head from "next/head";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const title = "Can I DevTools?"
  const description = "It is like @CanIUse, but for the browser devtools, created and curated by Pankaj Parashar."

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="title" content={title} />
        <meta name="viewport" content="width=device-width, initial-scale=0.9" />
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
      </Head>
      <Component {...pageProps} />
    </>
  );
}
