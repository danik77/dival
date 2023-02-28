import Link from "next/link";
import router from 'next/router'
import { useTranslation } from "next-i18next";
import style from "./style.module.scss";




const Nav = () => {

    const { t } = useTranslation("common");


const currentRoute = router.pathname.split('/')[1];

 

  return (
    <div>
      <ul className={style.nav}>
        <li>
          <Link href="/projects">
            <a className={`${style.nav__link}  ${currentRoute === "projects" && style.nav__active}`}>{t("projects")}</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className={`${style.nav__link}  ${currentRoute === "about" && style.nav__active}`}>{t("about")}</a>
          </Link>
        </li>
        <li>
          <Link href="/contacts">
            <a className={`${style.nav__link}  ${currentRoute === "contacts" && style.nav__active}`}>{t("contacts")}</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;


/*
const router = useRouter();
const currentRoute = router.pathname;

 
<Link href="/some-path" 
     className={currentRoute === "/some-path" 
       ? "active-class-name" 
       : "non-active-class-name"}>
         Some Link
</Link>
*/