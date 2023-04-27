import type { NextPage } from "next";

import { GetServerSideProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import ProjectPage from "../../components/Projects/ProjectPage";

import Seo from "../../components/Seo";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import BannerBottom from "../../components/Banners/BannerBottom";

const Project: NextPage = ({ project, context }: any) => {
  const { t, i18n } = useTranslation("common");

  // ПЕРЕРОБИТИ !!! СТЯГУВАТИ ІТЛЬКИ ТО ЩО ТРЕБА !! в пропсах !
  //const projectData = i18n.language === "uk" ? project.data : project.data.attributes.localizations.data[0]

  // const { metaTitle, metaDesc, keywords } = project.data.attributes.seoProject;

  return (
    <>
      {/* <Seo metaTitle={metaTitle} metaDesc={metaDesc} keywords={keywords} />*/}
      <div className="fullwidth page">
        <ProjectPage project={project.data} />
        <div className="container"> </div>
      </div>
      <div className="container">
        <BannerBottom />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { project_id } = context.query;
  //const res = await fetch(`https://restcountries.eu/rest/v2/name/${id}`);
  const res = await fetch(
    process.env.NEXT_PUBLIC_DIVAL_BACKEND + `/projects/${project_id}?populate=*`
  ); //change populeat
  const project = await res.json();

  return {
    props: {
      project,
      context: context.locale,
      ...(await serverSideTranslations(context.locale || "", ["common"])),
    },
  };
};

export default Project;
