import ContactPopup from "./ContactPopup";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import style from "./style.module.scss";

const CallbackButton = (props: any) => {
	const { t } = useTranslation("common");

	const [showForm, setShowForm] = useState(false);

	const onClickHandler = () => {
		showForm ? null : setShowForm(true);
	};

	const closeForm = () => {
		setShowForm(false);
	};

	return (
		<>
			<button
				className={`btn  btn-red arrow-right-white  ${props.className && props.className}`}
				onClick={onClickHandler}
			>
				{t("contact-us")}
			</button>
			{showForm && <ContactPopup closeForm={closeForm} />}
		</>
	);
};

export default CallbackButton;
