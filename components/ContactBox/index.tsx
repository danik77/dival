import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import style from "./style.module.scss";

const ContactBox = ({ contacts }: any) => {
	const { t } = useTranslation("common");

	const router = useRouter();
 
	const { Email, Phone, Address, Worktime } =
		(router.locale === "uk"
			? contacts?.data?.attributes
			: contacts?.data?.attributes?.localizations?.data?.find(
					(item: any) => item.attributes.locale === router.locale
			  )?.attributes) || {}

	return (
		<div className={style.contactBox}>
			<h3>{t("contacts")}</h3>
			<div className={style.contactBox__item}>
				<h4 className={style.contactBoxItem__title}>{t("email")}</h4>
				<p>{Email}</p>
			</div>
			<div className={style.contactBox__item}>
				<h4 className={style.contactBoxItem__title}>{t("phone")}</h4>
				<a href={`tel:${Phone}`}>
					<p>{Phone}</p>
				</a>
			</div>
			<div className={style.contactBox__item}>
				<h4 className={style.contactBoxItem__title}>{t("address")}</h4>
				<p>{Address}</p>
				<p>{Worktime}</p>
			</div>
		</div>
	);
};

export default ContactBox;
