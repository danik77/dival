import { useState } from "react";
import Link from "next/link";
import ProjectListItem from "./ProjectListItem";
import style from "./style.module.scss";

import ProjectList from "./ProjectList";
import Categories from "../Categories";

import { useTranslation } from "next-i18next";

const ProjectBlock = ({ projects, categories }: any) => {
	const { t } = useTranslation("common");

	const [filteredProjects, setFilteredProjects] = useState(projects);

	const filterByСategory = (categoryId) => {
		if (!categoryId) {
			setFilteredProjects(projects);
		}

		if (categoryId) {
			const filtered = projects.filter(
				(item) => item.attributes.category.data.id === categoryId
			);
			setFilteredProjects(filtered);
		}

		//яяк тут зробити при різних ід категорій мультияз
	};

	return (
		<div className={style.projectBlock}>
			<div className={style.header}> </div>

			<div className={`${style.paddingTop} container`}>
				<div className="breadcrumbs">
					<Link href="/">
						<a className="btn btn-transparent arrow-left">{t("home")}</a>
					</Link>
				</div>

				<div className="narrow">
					<h3 className="textAlignLeft">{t("completed-projects")}</h3>
					<Categories
						categories={categories}
						filterByСategory={filterByСategory}
					/>
					<ProjectList projects={filteredProjects} />{" "}
				</div>
			</div>
		</div>
	);
};

export default ProjectBlock;
///add redux if from direct url
