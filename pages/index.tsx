import Head from "next/head";
import Intro from "../components/intro/intro";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Synthetic Nerd</title>
        <meta name='description' content='Synthetic Nerd Portfolio and Blog' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Intro />
      </main>
      <footer></footer>
    </div>
  );
}
