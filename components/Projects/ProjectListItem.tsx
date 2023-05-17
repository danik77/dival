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

	console.log(project.attributes)
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

						{project?.attributes?.Image?.data?.attributes?.formats?.medium?.url &&
						<Image
							className={style.projectListItem__image}
							src={project?.attributes?.Image?.data?.attributes?.formats?.medium?.url}
							alt=""
							width={468}
							height={354}
							objectFit="cover"
						/>
					}
					{!project?.attributes?.Image?.data?.attributes?.formats?.medium?.url &&
						<div style={{width: "468px", height: "354px", display: "flex", alignItems: "center", justifyContent: "center",     background: "#f3f3f3"}}>
						<Image
						src="/images/logo_dival.svg"
						alt="Dival Logo"
						width={128}
						height={40}
					/></div>
					}
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
