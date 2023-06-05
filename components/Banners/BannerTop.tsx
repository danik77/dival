  import Image from 'next/image'
  import { useTranslation } from "next-i18next";
  import { useRouter } from "next/router";

   import ContactButton from '../ContactForm/ContactButton';

  import style from "./style.module.scss";

const BannerTop = ({homepage} :any) => {

	const { t } = useTranslation("common");



	const router = useRouter();
 

 
const base = homepage[router.locale].data?.attributes?.BannerTop;
 
	return (
		<div className={style.bannerTop}>

			  <div className={style.bannerTop__caption}>
		  	<h2>{base?.bannerTopTitle} </h2>
		  	<p>{base?.bannerTopDesc}</p>
		  	<ContactButton /> 
		  </div>

	  <div className={`${style.bannerTop__image} ${style.bannerTop__first}`}>
	  </div>

	  <div className={style.bannerTop__image} style={{backgroundImage: `url(${base?.bannerTopImage1.data.attributes.url})`, backgroundSize: "cover"}}>
	  </div>

	  <div className={`${style.bannerTop__image} ${style.bannerTop__third}`}>
	  	<div style={{backgroundImage: `url(${base?.bannerTopImage2.data.attributes.url})`, height: "50%", backgroundSize: "cover"}}></div>
	  	<div style={{backgroundImage: `url(${base?.bannerTopImage3.data.attributes.url})`, height: "50%", backgroundSize: "cover"}}></div>
	  </div>

		 

  
	 
		</div>
	);
}

export default BannerTop;