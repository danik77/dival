import type { NextPage } from "next";
import { useContext } from 'react'
import { GetServerSideProps } from "next";

import ProjectList from "../../components/Projects/ProjectList";
import ProjectBlock from "../../components/Projects/ProjectBlock"; //////////

import BannerBottom from "../../components/Banners/BannerBottom";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DivalContext from '../../context'


const Projects: NextPage = ({ projects, categories }: any) => {


 const context = useContext(DivalContext)


  return (
    <>
      <div className="page">
        <ProjectBlock projects={projects.data} categories={context.categories} />
        <div className="container"></div>
      </div>
      <div className="container">
      <BannerBottom /> 
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {

  
  const resProjects = await fetch(
    process.env.NEXT_PUBLIC_DIVAL_BACKEND +
      "/projects?sort[0]=year%3Adesc&populate[localizations]populate=*&populate[Image]populate=*"
  ); //change
  const projects = await resProjects.json();

/*
  const resCategories = await fetch(
    process.env.NEXT_PUBLIC_DIVAL_BACKEND + "/categories?populate=*"
  ); //change
  const categories = await resCategories.json();
 */
  return {
    props: {
      projects,
      //categories,
      ...(await serverSideTranslations(locale || "", ["common"])),
    },
  };
};

export default Projects;
