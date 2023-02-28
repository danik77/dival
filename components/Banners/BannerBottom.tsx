import Image from "next/image";
import { useRouter } from "next/router";
import ContactButton from "../ContactForm/ContactButton";
import { useContext } from "react";
import style from "./style.module.scss";
import DivalContext from '../../context'


const BannerBottom = ({ homepage, theme }) => {
	const router = useRouter();

	const context = useContext(DivalContext)

	console.log(homepage)
console.log(context)


	const base = context.homepage[router.locale].data.attributes.BannerBottom;

	return (
		<div className={style.bannerBottom}>
			<div className={`${style.bannerBottom__left} ${theme && style[theme]}`}>
				<h3 className={style.bannerBottom__title}>{base.bannerBottomText}</h3>
				<ContactButton />
			</div>
			<div className={style.bannerBottom__right}>
				<Image
					src={base.bannerBottomImage.data.attributes.url}
					alt="Image"
					layout="fill"
					objectFit="cover"
				/>
			</div>
		</div>
	);
};

export default BannerBottom;
