import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ContactForm from "../components/ContactForm/ContactForm";
import style from "../components/ContactForm/style.module.scss";
import Link from 'next/link'

const Contacts: NextPage = () => {
  const { t, i18n } = useTranslation("common");

  return (
    <div className="contact-page page">

    <div className={`${style.paddingTop} container`}>
    <div className="breadcrumbs">
          <Link href="/">
            <a className="btn btn-transparent arrow-left">
              {t("home")}
            </a>
          </Link>
        </div>
        </div>

      <ContactForm className={style.contact__page}  type="page" />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "", ["common"])),
    },
  };
};

export default Contacts;
