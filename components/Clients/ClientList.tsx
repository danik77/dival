import { useRef } from "react";
import ClientListItem from "./ClientListItem";
import { useTranslation } from "next-i18next";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import style from "./style.module.scss";

const ClientList = ({ clients }: any) => {
  const { t } = useTranslation("common");

  const slider = useRef(null);
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
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className={style.clients}>
      <h3>{t("our-clients")}</h3>

      <div style={{ position: "relative" }}>
        <a
          onClick={() => {
            slider?.current?.slickPrev();
            console.log(slider);
          }}
          className="pagin btn btn-transparent arrow-left"
          style={{ position: "absolute", left: "-40px", top: "10px" }}
        ></a>
        <a
          onClick={() => slider?.current?.slickNext()}
          className="pagin btn btn-transparent arrow-right"
          style={{ position: "absolute", right: "-50px", top: "10px" }}
        ></a>

        <Slider {...settings} ref={slider}>
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
