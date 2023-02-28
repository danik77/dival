import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { GetStaticProps } from "next";

import { useTranslation } from "next-i18next";

export default function Custom404() {

	 const { t } = useTranslation("common");

  return (
  	  <div className={`container page`}><h3>{t("404-error")}</h3></div>

)}


export const getStaticProps = async ({ locale }) => {
 

  //https://dival-backend.herokuapp.com/api/homepage?populate=deep&locale=en
  //https://dival-backend.herokuapp.com/api/homepage?populate=deep&locale=uk


  return {
    props: {
 
      ...(await serverSideTranslations(locale || "", ["common"])),
    },
  };
};