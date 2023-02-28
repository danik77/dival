import React from 'react'
import Image from "next/image";
  import { useRouter } from "next/router";
  import style from "./style.module.scss";

import {useState, useEffect} from 'react';


 
//<Counter number={150} speed={100} />
 
const BannerAbout= ({banner}) => {

 
const router = useRouter();

	 
	return (
     <div className={style.bannerAbout}>
		      <div className={`${style.bannerAbout__inner} container`}>
        <div className={style.bannerAbout__item}>
          <img src={banner.Image1.data.attributes.url} />
          <h4>{banner.Text1}</h4>
        </div>
        <div className={style.bannerAbout__item}><img src={banner.Image2.data.attributes.url} /><h4>{banner.Text2}</h4></div>
        <div  className={style.bannerAbout__item}><img src={banner.Image3.data.attributes.url} /><h4>{banner.Text3}</h4></div>
      </div>
        </div>
	);
};

export default BannerAbout;
