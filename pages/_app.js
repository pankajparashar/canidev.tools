import "../styles/global.css";
import "../styles/carbon.css";
import Head from "next/head";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Can I DevTools?</title>
        <meta name="title" content="Can I Devtools?" />
        <meta name="viewport" content="width=device-width, initial-scale=0.9, maximum-scale=0.9" />
        <meta property="twitter:url" content="https://canidev.tools/" />
        <meta property="twitter:title" content="Can I Devtools?" />
        <meta
          name="description"
          content="Can I DevTools is like Can I Use but for the browser devtools. It's created and curated by Pankaj Parashar."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
