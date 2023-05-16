import "../styles/globals.css";
import App from "next/app";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollButton from "../components/ScrollButton";
import { appWithTranslation } from "next-i18next";

import DivalContext from "../context";

import "react-image-gallery/styles/scss/image-gallery.scss";

function MyApp({
  Component,
  pageProps,
  contacts,
  categories,
  projects,
  homepage,
  seo,
}: AppProps) {
  return (
    <>
      <Head>
        <title>Dival</title>
      </Head>

      {/*body*/}

      <DivalContext.Provider value={{ categories, projects, contacts, seo, homepage }}>
        <Header contacts={contacts} />
        <Component {...pageProps} />
        <Footer contacts={contacts} homepage={homepage} />
        <ScrollButton />
      </DivalContext.Provider>
    </>
  );
}

MyApp.getInitialProps = async () => {
  //  const pageProps = await App.getInitialProps(contex);

  const resCategories = await fetch(
    process.env.NEXT_PUBLIC_DIVAL_BACKEND + "/categories?populate=deep"
  ); //change
  const categories = await resCategories.json();

  const res = await fetch(
    process.env.NEXT_PUBLIC_DIVAL_BACKEND + "/contact?populate=*"
  );
  const contacts = await res.json();

  const resProjects = await fetch(
    process.env.NEXT_PUBLIC_DIVAL_BACKEND +
      "/projects?populate=*&sort[0]=createdAt"
  ); //change
  const projects = await resProjects.json();

  //допереробити !!!!!!!!!!!!!!!!
  const resHomepageEn = await fetch(
    process.env.NEXT_PUBLIC_DIVAL_BACKEND + "/homepage?populate=deep&locale=en"
  ); //change
  const homepageEn = await resHomepageEn.json();

  const resHomepageUk = await fetch(
    process.env.NEXT_PUBLIC_DIVAL_BACKEND + "/homepage?populate=deep&locale=uk"
  ); //change
  const homepageUk = await resHomepageUk.json();

  const homepage = {
    en: homepageEn,
    uk: homepageUk,
  };

  //fetch seo
  const resSeo = await fetch(
    process.env.NEXT_PUBLIC_DIVAL_BACKEND + "/seo?populate=*"
  ); //change
  const seo = await resSeo.json();

  return {
    contacts,
    categories: categories.data,
    projects: projects.data,
    homepage,
    seo,
  };
};

/*
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const res = await fetch(process.env.NEXT_PUBLIC_DIVAL_BACKEND + "/contacts")
  const about = await res.json()

  return {
    props: {
      contacts,
    },
  }
}
*/

export default appWithTranslation(MyApp);
