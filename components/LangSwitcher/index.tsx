import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import style from "./style.module.scss";
import Image from "next/image";

const langs = [
  { langIndex: "uk", langName: "UA" },
  { langIndex: "en", langName: "ENG" },
];

const LangSwitcher = () => {
  const { i18n, t } = useTranslation();
  const router = useRouter();

  const [active, setActive] = useState(router.locale);

  const [showSubMenu, setShowSubmenu] = useState(false);

  const handleClick = (lang: string) => {
    setActive(lang);
    setShowSubmenu(false);
    console.log(lang);
  };

  const openSubmenu = () => {
    setShowSubmenu(!showSubMenu);
  };

  const closeSubmenu = () => {
    setShowSubmenu(false);
  };

  return (
    <>
      <div className={style.lang__switch}>
        <div className={style.active} onClick={openSubmenu}>
          <span style={{ marginRight: "13px" }}>
            {langs.find((lang) => lang.langIndex === active).langName}
          </span>
          <Image
            src={`/images/${showSubMenu ? "arrow-top.svg" : "arrow-down.svg"}`}
            alt="Check Mark"
            width={11}
            height={11}
          />
        </div>

        {showSubMenu && (
          <>
            <div className={style.submenu}>
              {langs.map((lang) => (
                <Link
                  key={lang.langIndex}
                  href={`/${lang.langIndex}${router.asPath}`}
                  locale={lang.langIndex}
                >
                  <div
                    className={style.submenu__item}
                    onClick={() => handleClick(lang.langIndex)}
                  >
                    <a
                      className={`${style.lang__item} ${
                        active === lang.langIndex && style.lang__active
                      }`}
                    >
                      {t(lang.langName)}
                    </a>

                    {active === lang.langIndex && (
                      <Image
                        src="/images/check.svg"
                        alt="Check Mark"
                        width={20}
                        height={20}
                        priority={true}
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <div className={style.overlay} onClick={closeSubmenu}></div>
          </>
        )}
      </div>
    </>
  );
};

export default LangSwitcher;
