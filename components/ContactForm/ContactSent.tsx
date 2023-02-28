import React, { useState } from 'react';
import Image from 'next/image'
import { useTranslation } from "next-i18next";
import Link from 'next/link'
import { useRouter } from 'next/router'

import style from './style.module.scss'

const MessageSent = ({closePopup, type}) => {

		const { t } = useTranslation("common");
		const router = useRouter();

		console.log(router)


console.log(type)

//	const [ enabled, setEnabled ] = useState(true);

const handleClick = (e) => {
	e.preventDefault()

console.log("fdsfs")

	closePopup();


}

	return (
		<div className={`${style.contact__sentWrapper} ${type === "page" && style.contact__sent_Page}`}>
		<div className={`${style.contact__sent}`}>
		<div className={style.contact__sentInner}>
		<div className={style.contact__sentIcon}>
		 
									<Image
										src="/images/sent.svg"
										alt="sent"
										width={34}
										height={33} 
									/>
								</div>
				<h3>{t('message-sent')}</h3>
				</div>
			 
			  <Link href={`/`}>
					<a onClick={router.pathname === "/" && handleClick} className="btn btn-transparent arrow-right">{t("to-home")}</a>
				</Link> 
			</div>
			</div>
	);
}

export default MessageSent;

//	  { type === "popup" && <button className="btn btn-red" onClick={handleClick}>Ok</button> }