import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <link rel="icon" type="image/svg" sizes="16x16" href="/pokeball.svg" />
        <meta name="author" content="Minabel Añez" />
        <meta charset="utf-8" />
        <meta
          name="description"
          content="La Pokedex es una enciclopedia de todas las especies de la primera generacion"
        />
        <meta name="keywords" content="Pokedex, Pokemon, Minabel" />
        <meta name="copyright" content="Minabel Añez" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
