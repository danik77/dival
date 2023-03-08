import Link from "next/link";
import Image from "next/image";
import style from "./style.module.scss";
import { useTranslation } from "next-i18next";

import { useRouter } from "next/router";

const ProjectListItem = ({ project, index }: any) => {
	const { t } = useTranslation("common");

	const router = useRouter();

	const projectId = project.id;

	const projectDataLocalization = project.attributes.localizations.data.find(
		(item: any) => item.attributes.locale === router.locale
	);


	const { Name, Location, Area, Description } = 
		router.locale === "uk"
			? project.attributes
			:  projectDataLocalization?.attributes;

	//const { Gallery } = project.attributes.gallery.data

	console.log(project.attributes.Gallery)
	return (
		<div
			key={projectId}
			className={`${style.projectListItem} ${
				!(index % 2) && style.projectListItem__marginTop
			}`}
		>
			<Link href={`/projects/${projectId}`}>
				<a>
					<div className={style.projectListItem__imageBlock}>
						<div className={style.projectListItem__discover}>
							<span className={style.projectListItem__discoverCaption}>
								{t("discover-more")}
							</span>
						</div>

						<Image
							className={style.projectListItem__image}
							src={project.attributes.Gallery.data[0].attributes.formats.medium.url}
							alt=""
							width={468}
							height={354}
							objectFit="cover"
						/>
					</div>
				</a>
			</Link>

			<div className={style.projectListItem__caption}>
				<Link href={`/projects/${projectId}`}>
					<a>
						<h4 className={style.projectListItem__title}>{Name}</h4>
					</a>
				</Link>

				<p className={style.projectListItem__data}>
					{Location}, {Area}
				</p>
			</div>
		</div>
	);
};

export default ProjectListItem;

//Gallery.atttibutes
