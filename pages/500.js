import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { GetStaticProps } from "next";

import { useTranslation } from "next-i18next";

export default function Custom500() {
  const { t } = useTranslation("common");

  return (
    <div className={`container page`}>
      <h3>{t("500-error")}</h3>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "", ["common"])),
    },
  };
};
