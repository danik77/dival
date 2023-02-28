import React, { useState, useRef, useCallback, useContext } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import Image from 'next/image'
import Link from 'next/link'

import ReturnButton from './ReturnButton'
import style from './style.module.scss'

import {styleMap} from './styleMap';

import { useTranslation } from "next-i18next";


import DivalContext from "../../context";
 
const containerStyle = {
  height: "100%",
  width: "100%",
  /////360 з даних
};


 

const apiKey = "AIzaSyBMqcOQhbXbd64F_cdLV9ZlH7AxIX6HNIg";


  



const SukaMap = React.memo(
  function SukaMap(props) { 
    
 const context = useContext(DivalContext)
 console.log(context)
   const center = {lat: +context.contacts.data.attributes.GoogleMapsLatitude, lng: +context.contacts.data.attributes.GoogleMapsLongitude};
  

    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          rotateControl: false,
          panControl: false,
          zoomControl: false,
          scaleControl: false,
          overviewMapControl: false,
          linksControl: false,
          fullscreenControl: false,
          addressControl: false,
       styles: styleMap
        }}
        onLoad={map => props.setInst(map)  } 
        onDrag={() => props.detectCenter()}

      >
        <Marker
          icon={"/images/map_logo.svg"}
          position={center} 
        ></Marker>
      </GoogleMap>
    );
  }
);



const MapReal = ({coords}) => {


console.log(coords)

      const { t } = useTranslation('common')


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const [inst, setInst] = useState(null)

   const [showCenterButton, setShowCenterButton] = useState(false)
//const  showCenterButton  = useRef(false)


  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };


 const center = {
  lat: +coords.lat,
  lng: +coords.lng,
};

 

const setInstF = useCallback((inst) => {
  setInst(inst)
//  console.log("setInstF")
}, [inst]);

 const detectCenter = useCallback(() => {

  // console.log("detectCetner")
   if(inst.getBounds().contains(center)) {
     //console.log("+") 
 
    setShowCenterButton(false)
   } else {
     // console.log("-") 
  
     setShowCenterButton(true)
   }
 }, [inst]);
  

 const centerMap = () => {
   
   inst.panTo(center);
 inst.setZoom(15)

  setShowCenterButton(false)
 }

  return (

   
<>
{console.log('rerender')}
 
{ showCenterButton &&
<div className={style.centerButton__wrapper} >
         <div className={style.centerButton} onClick={centerMap}>
          <Image
            src="/images/center.svg"
            alt="center map"
            width={17}
            height={17}
            priority={true}
          />
        </div></div>
  }


  {  isLoaded && (
      
      <SukaMap detectCenter={detectCenter} setInst={setInst} />
 
    )

}






<div className={style.linkButton__wrapper}>

<Link href={`https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`}>
<a target="_blank">
         <div className={style.linkButton}  >
         <span className={style.linkButton__text}>{t('see-in-google-map')}</span>
          <Image
            src="/images/google-logo.png"
            alt="Link to Google Map"
            width={17}
            height={17}
          />
        </div>
</a>
        </Link>

        </div>


 
 {/* <button onClick={centerMap}>BUTTON</button> */}
 
 </>
  );
};



const CenterButton = () => {

}


const Map = ({coords}) => {



 

  return (
    <MapReal coords={coords} />
    )
}

export default Map;

/*
   <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>Hello</div>
            </InfoWindow>
            */
