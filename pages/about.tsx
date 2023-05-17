import type { NextPage } from 'next'
import Link from 'next/link'

import {  GetServerSideProps } from 'next'

import { useTranslation } from 'next-i18next'; 
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; 
  import { useRouter } from "next/router";
import BannerBottom from "../components/Banners/BannerBottom"
import AboutBlock from '../components/About'
import BannerAbout from '../components/Banners/BannerAbout'

const About: NextPage = ({about}) => {

  console.log(about)


  const { t, i18n } = useTranslation("common");


  const router = useRouter();

  const base = about[router.locale].data.attributes;
const baseBanner = about[router.locale].data.attributes.BannerAbout;

	return(
    <>
		<div className="page">

    <div className="container" style={{paddingTop: "24px"}}>

      <div className="breadcrumbs">
          <Link href="/">
            <a className="btn btn-transparent arrow-left">
              {t("home")}
            </a>
          </Link>
        </div>

			 <AboutBlock about={base} />

       </div>
       <BannerAbout banner={baseBanner}/>
 

   <div className="container">  <BannerBottom  theme="mobileWhite" />  </div>
		</div>
    </>
	)
}


export const getServerSideProps: GetServerSideProps = async ({ locale }) => {

const resAboutEn = await fetch(
    process.env.NEXT_PUBLIC_DIVAL_BACKEND + "/about?populate=deep&locale=en"
  ); //change
  const aboutEn = await resAboutEn.json();

  const resAboutUk = await fetch(
    process.env.NEXT_PUBLIC_DIVAL_BACKEND + "/about?populate=deep&locale=uk"
  ); //change
  const aboutUk = await resAboutUk.json();

  const about = {
    en: aboutEn,
    uk: aboutUk,
  };

 
  return {
    props: { 
      about,
       ...(await serverSideTranslations(locale || "", ['common'])),
    },
  }
}



export default About;

/*  //допереробити !!!!!!!!!!!!!!!!
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
  */