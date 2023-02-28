import Image from 'next/image'
import Link from "next/link";
import { useTranslation } from 'next-i18next'; 
import style from "./style.module.scss";
import parse from 'html-react-parser';

const About = ({about}) => {

	 const { t, i18n } = useTranslation("common");


   console.log(about.Text)

    const text = '<p>' + about.Text.replace(/\n/g, "</p>\n<p>") + '</p>'

 


	return (
	<div className={style.about}>
        <div className={style.about__left}>
        <h3>{t("about")}</h3>
        <div>{parse(text)}</div>
        </div>
        <div className={style.about__right}><img src={about.Image.data.attributes.url} /></div>
      </div>

	);
}

export default About;

// sizes="(max-width: 768px) 102px, (min-width: 769px) 128px, 128px"
 