import { useTranslation } from "next-i18next";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import MyContext from "../../context";
import style from "./style.module.scss";

const Pagination = ({ currentProjectId }: any) => {
	const { t } = useTranslation("common");

	const context = useContext(MyContext);

	const [next, setNext] = useState(null);
	const [prev, setPrev] = useState(null);

	useEffect(() => {
		const index = context.projects.findIndex((i) => i.id === currentProjectId);

		if (index === 0) {
			setPrev(null);
			setNext(context.projects[index + 1].id);
		}

		if (index === context.projects.length - 1) {
			setPrev(context.projects[index - 1].id);
			setNext(null);
		}

		if (index !== 0 && index !== context.projects.length - 1) {
			setPrev(context.projects[index - 1].id);
			setNext(context.projects[index + 1].id);
		}
	});

	return (
		<div className={style.pagination}>
			{prev && (
				<Link href={`/projects/${prev}`}>
					<a className="pagin btn btn-transparent arrow-left" style={{textAlign: "right"}}>{t("prev-project")}</a>
				</Link>
			)}
			{next && (
				<Link href={`/projects/${next}`}>
					<a className="pagin btn btn-transparent arrow-right" style={{textAlign: "left"}}>{t("next-project")}</a>
				</Link>
			)}
		</div>
	);
};

export default Pagination;
