import type { NextPage } from "next";

import { useContext } from 'react'

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { GetServerSideProps } from "next";

import ClientList from "../components/Clients/ClientList"; //Clients
import BannerTop from "../components/Banners/BannerTop";
import BannerMiddle from "../components/Banners/BannerMiddle";

import ProjectList from "../components/Projects/ProjectList";

import ProjectsAllButton from "../components/Projects/ProjectsAllButton";

import BannerBottom from "../components/Banners/BannerBottom";

import Seo from "../components/Seo"
import DivalContext from '../context'

const Home: NextPage = ({ about, clients, projects, homepage }: any) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation("common");

 const context = useContext(DivalContext)

 const {metaTitle, metaDesc, keywords} = context.seo.data.attributes.seoHomepage;

  return (

    <>
     <Seo metaTitle={metaTitle} metaDesc={metaDesc} keywords={keywords} />

    <div className={`${styles.container} page`}>
      <main className={styles.main}>
        {/* translate */}

      {/* переробити */}

        <BannerTop homepage={homepage} />
        <div className="container">
          <ClientList clients={clients} />
          <BannerMiddle homepage={homepage} />

          <div className="narrow">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ marginTop:"4px", marginBottom: "28px"}}>{t("recent-projects")}</h3>
            <Link href="/projects">
              <a className="btn btn-transparent arrow-right no-mobile" style={{marginTop: "0px", paddingRight: "0px"}}>
                {t("all-projects")}
              </a>
            </Link>
          </div>
          <ProjectList projects={projects.data} />

          <ProjectsAllButton />
          </div>

 
        </div>
      </main>
    </div>


      <div className="container"><BannerBottom /></div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const res = await fetch(process.env.NEXT_PUBLIC_DIVAL_BACKEND + "/about");
  const about = await res.json();

  const resClients = await fetch(
   process.env.NEXT_PUBLIC_DIVAL_BACKEND + "/clients?populate=*"

   //'http://dival-back.hevlfdn.com'
  ); //change
  const clients = await resClients.json();

  const resProjects = await fetch(
    process.env.NEXT_PUBLIC_DIVAL_BACKEND + "/projects?populate=*&sort[0]=createdAt"
  ); //change
  const projects = await resProjects.json();
 

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
    uk: homepageUk
  }
 

  return {
    props: {
      about,
      clients,
      projects,
      homepage,
      ...(await serverSideTranslations(locale || "", ["common"])),
    },
  };
};

export default Home;
