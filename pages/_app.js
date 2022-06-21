import "../styles/global.css";
import "../styles/carbon.css";
import Head from "next/head";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Can I Devtools?</title>
        <meta name="title" content="Can I Devtools?" />
        <meta name="viewport" content="width=device-width, initial-scale=0.9, maximum-scale=0.9" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
