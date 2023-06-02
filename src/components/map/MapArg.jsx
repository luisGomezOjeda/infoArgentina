import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapArg.css';

import expand from "../../assets/expand.png"
import reduce from "../../assets/reduce.png"


export const MapArg = ({ infoLocation }) => {
  const [position, setPosition] = useState([-34.0000000, -64.0000000]);
  const [contentPopup, setContentPopup] = useState({});

  useEffect(() => {
    if(Object.keys(infoLocation).length !== 0) {
      const newPosition = [infoLocation.centroide.lat, infoLocation.centroide.lon];
      setPosition(newPosition);
    }
  }, [infoLocation]);

  useEffect(()=>{
    if(Object.keys(infoLocation).length !== 0){
      let newContentPopup = {};

      if(Object.keys(infoLocation).length === 3) newContentPopup.provincia = `${infoLocation.nombre}`
      
      if(Object.keys(infoLocation).length === 4){
        newContentPopup.provincia = `${infoLocation.provincia.nombre}`
        newContentPopup.departamento = `${infoLocation.nombre}`
      };

      if(Object.keys(infoLocation).length === 8){
        newContentPopup.provincia = `${infoLocation.provincia.nombre}`
        newContentPopup.departamento = `${infoLocation.departamento.nombre}`
        newContentPopup.localidad = `${infoLocation.nombre}`;
      }

      setContentPopup(newContentPopup);
      console.log(newContentPopup)
    }
  },[infoLocation])

  const myMapRef = useRef(null);

  const handdleExpand = (e) => {
    console.log(myMapRef.current.classList)
    myMapRef.current.classList.toggle("active");

    myMapRef.current.classList.contains("active") ? e.target.src = reduce : e.target.src = expand

  }

  return (
    <section className="sectionMap" ref={myMapRef}>
      <MapContainer center={position} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          {Object.keys(infoLocation).length === 0 &&
          <Popup className='info-popup'>
            <h2> Republica Argentina </h2>
            <b> 24 Provincias </b> <br/>
            <b> Cordenadas : {position} </b>
          </Popup>  
          } 
          
          { Object.keys(infoLocation).length !== 0 &&
            <Popup className='info-popup'>
             {
             Object.keys(contentPopup).map((content) => {
              return(
                <>
                <span>{ content } :</span><b>{ contentPopup[content]}</b>
                <br/>
              </>
              )
             })
             }
             <span>cordenadas : </span><b>{position}</b>
            </Popup>
            }
        </Marker>
      </MapContainer>
      <button className='button-expand' id='button-expand' onClick={handdleExpand}>
        <img src={expand} alt=""/>
      </button>
    </section>
  );
};
