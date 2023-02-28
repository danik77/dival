import Image from "next/image";
import Link from "next/link";

import style from "./style.module.scss";

const ClientListItem = ({ client }: any) => {
 

	const { Name, URL } = client.attributes;
	const image = client.attributes.Image.data.attributes.url;

	/// seo
	return (
		<div className={style.clients__item}>
 
					<Image src={image} alt={Name} width={178} height={96} objectFit="cover" />
 
		</div>
	);
};

export default ClientListItem;

// .<Image src="/images/logo.svg" alt="Dival Logo" width={110} height={24} /></a>
