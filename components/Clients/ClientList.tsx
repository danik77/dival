import ClientListItem from "./ClientListItem";
import { useTranslation } from "next-i18next";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import style from "./style.module.scss";

const ClientList = ({ clients }: any) => {
  const { t } = useTranslation("common");

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className={style.clients}>
      <h3>{t("our-clients")}</h3>

      <div>
        <Slider {...settings}>
          {clients &&
            clients.data.map((client) => (
              <ClientListItem key={client.id} client={client} />
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default ClientList;
