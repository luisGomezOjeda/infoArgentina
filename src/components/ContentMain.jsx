import { useState } from 'react';
import { FormSerchLocation } from './form/FormSerchLocation';
import { MapArg } from './map/MapArg';


export const ContentMain = () => {
    const [infoLocation, setInfoLocation] = useState({});

    const handdleChange = (form) => {
      let handdle = form[form.length - 1]
      setInfoLocation(handdle);
    }


  return (
    <>
        <FormSerchLocation handdleChange={handdleChange}/>
        <MapArg infoLocation={infoLocation}/>
    </>
  )
}
