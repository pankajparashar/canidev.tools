import "../styles/global.css";
import Head from "next/head";
import { useEffect } from "react";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.goatcounter = { no_onload: true };

    window.addEventListener("pushstate", function (e) {
      console.log(e);
      window.goatcounter.count({
        path:
          window.location.pathname +
          window.location.search +
          window.location.hash
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>Can I Devtools?</title>
        <meta name="title" content="Can I Devtools?" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
