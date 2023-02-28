import { useTranslation } from "next-i18next";

import Link from "next/link";

import style from "./style.module.scss";

const ProjectsAllButton = (props: any) => {
	const { t } = useTranslation("common");

	return (
		<div className={style.projectsAllButton}>
			<Link className="btn" href="/projects">
				<a className="btn btn-white arrow-right">{t('see-all-projects')}</a>
			</Link>
		</div>
	);
};

export default ProjectsAllButton;
