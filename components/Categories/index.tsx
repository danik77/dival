import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import style from "./style.module.scss";

const Category = ({ category }) => {
	const router = useRouter();

	const categoryDataLocalization = category.attributes.localizations.data.find(
		(item: any) => item.attributes.locale === router.locale
	);

	const categoryName = "";

	return (
		<li
			key={category.id}
			className={`${style.categories__item} ${
				activeCategory === category.id && style.categories__active
			}`}
			onClick={() => handleClick(category.id)}
		>
			{categoryName}
		</li>
	);
};

const Categories = ({ categories, filterByСategory }: any) => {
	const [activeCategory, setActiveCategory] = useState("all");
	const router = useRouter();
	const { t } = useTranslation("common");


	const categoriesList = categories.data.filter(
		(item) => item.attributes.projects.data.length
	);

	const handleClick = (categoryId) => {
		if (categoryId === "all") {
			filterByСategory(null);
			setActiveCategory("all");
		}

		if (categoryId !== "all") {
			filterByСategory(categoryId);
			setActiveCategory(categoryId);
		}
	};

	return (
		<div className={style.categories}>
			<ul className={style.categories__list}>
				<li
					key="all"
					className={`${style.categories__item} ${
						activeCategory === "all" && style.categories__active
					}`}
					onClick={() => handleClick("all")}
				>
					{t("all")}
				</li>

				{categoriesList &&
					categoriesList.map((category) => (
						<li
							key={category.id}
							className={`${style.categories__item} ${
								activeCategory === category.id && style.categories__active
							}`}
							onClick={() => handleClick(category.id)}
						>
							{router.locale === "uk"
								? category.attributes.Name
								: category.attributes.localizations.data.find(
										(item: any) => item.attributes.locale === router.locale
								  ).attributes.Name}
						</li>
					))}
			</ul>
		</div>
	);
};

export default Categories;
