import type { NextPage } from "next";
import { useEffect } from "react";
import AOS from "aos";
import Navbar from "../components/organism/Navbar";
import MainBanner from "../components/organism/MainBanner";
import TransactionsStep from "../components/organism/TransactionsStep";
import FeaturedGames from "../components/organism/FeaturedGames";
import Reached from "../components/organism/Reached";
import Footer from "../components/organism/Footer";
import Story from "../components/organism/Story";
import Head from "next/head";
const Home: NextPage = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Head>
        <title>StoreGG - Get a New Experience in Gaming</title>
        <meta
          name="description"
          content="Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati"
        />
        <meta
          property="og:title"
          content="StoreGG - Get a New Experience in Gaming"
        />
        <meta
          property="og:description"
          content="Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati"
        />
        {/* <meta property="og:image" content="https://imageurlkalian" /> */}
        <meta property="og:url" content="https://topupgame.com" />
      </Head>
      <Navbar />
      <MainBanner />
      <TransactionsStep />
      <FeaturedGames />
      <Reached />
      <Story />
      <Footer />
    </>
  );
};

export default Home;
