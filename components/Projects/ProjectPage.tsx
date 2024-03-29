import Gallery from "../Gallery";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
///окремий модуль

import Pagination from "../Pagination";

import style from "./style.module.scss";

const ProjectPage = ({ project }: any) => {
	const router = useRouter();
	const { t } = useTranslation("common"); 

	const projectId = project.id;

	//const data = atrr.localizations.data.find(item => item.attributes.locale === router.locale)

	const projectDataLocalization = project.attributes.localizations.data.find(
		(item: any) => item.attributes.locale === router.locale
	);

	const { Name, Location, Area, Description, year, Author } =
		router.locale === "uk"
			? project.attributes
			: projectDataLocalization.attributes;  
	const gallery = project.attributes.Gallery.data;


	return (
		<div className={style.projectPage}>
			{/* LINK */}

			<div className={style.header}></div>
			<div className={`${style.paddingTop} container`}>
				<div className="breadcrumbs">
					<Link href="/projects">
						<a className="btn btn-transparent arrow-left">
							{t("all-projects")}
						</a>
					</Link>
				</div>

				<div className="narrow">
					<h3 className="textAlignLeft">
						<a href={`/projects/${projectId}`}>{Name}</a>
					</h3>
					{/*  ! */}
					<div className={style.projectData}>
						<div className={style.projectData__stats}>
							{Location && (
								<div>
									<p>{t("location")}</p> <h4>{Location}</h4>
								</div>
							)}
							{year && (
								<div>
									<p>{t("year")}</p> <h4>{year}</h4>
								</div>
							)}
							{Area && (
								<div className={style.projectData__area}>
									<p>{t("space")}</p> <h4>{Area}</h4>
								</div>
							)}
							{Author && (
								<div className={style.projectData__author}>
									<p>{t("designer")}</p> <h4>{Author}</h4>
								</div>
							)}
						</div>
						{/* <div className={style.projectData__desc}>{Description}</div> */}
					</div>
					{gallery && <Gallery gallery={gallery} />}
					{/* <Pagination currentProjectId={projectId} /> */}
				</div>
			</div>
		</div>
	);
};

export default ProjectPage;

//Gallery.atttibutes
