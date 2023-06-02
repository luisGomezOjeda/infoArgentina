import { useState, useEffect } from 'react';
import { helpHttp } from '../helpers/helpHttp';

const initialOptions = {
  provincias: [],
  departamentos: [],
  localidades: []
};

export const useSelecteds = (initialSelecteds, handdleChange) => {
  const [selecteds, setSelecteds] = useState(initialSelecteds);
  const [options, setOptions] = useState(initialOptions);

  const handdleOptions = (location) => {
    setOptions({
      ...options,
      ...location
    });
  };

  useEffect(() => {
    const url = 'https://apis.datos.gob.ar/georef/api/provincias';

    const getProv = async () => {
      const resProv = await helpHttp().get(url);
      const prov = { provincias: resProv.provincias };
      handdleOptions(prov);
    };

    getProv();
  }, []);

  useEffect(() => {
    if (selecteds.provincia.nombre !== '') {
      const url = `https://apis.datos.gob.ar/georef/api/departamentos?provincia=${selecteds.provincia.nombre}`;
      
      const getDep = async () => {
        const resDep = await helpHttp().get(url);
        const resAllDep = await helpHttp().get(`${url}&max=${resDep.total}`);
        handdleOptions({ departamentos: resAllDep.departamentos });
      };

      getDep();

     if(selecteds.departamento.nombre !== ""){
      if(selecteds.departamento.provincia.nombre !== selecteds.provincia.nombre){
        console.log("res");
        setSelecteds({
          provincia : {...selecteds.provincia},
          departamento : {nombre : ""},
          localidad : {nombre : ""}
        });
      }
     }
    }
  }, [selecteds.provincia]);

  useEffect(() => {
    if (selecteds.departamento.nombre !== "" && selecteds.provincia.nombre !== "") {
      const url = `https://apis.datos.gob.ar/georef/api/localidades-censales?provincia=${selecteds.provincia.nombre}`;

      const getLoc = async () => {
        const resLoc = await helpHttp().get(url);
        const resAllLoc = await helpHttp().get(`${url}&max=${resLoc.total}`);

        const filterLoc = resAllLoc.localidades_censales.filter(loc => loc.departamento.nombre === selecteds.departamento.nombre
        );

        const loc = { localidades: filterLoc };
        handdleOptions(loc);
      };

      getLoc();

      if(selecteds.localidad.nombre !== ""){
        if(selecteds.localidad.departamento.nombre !== selecteds.departamento.nombre){
          setSelecteds({
            provincia : {...selecteds.provincia},
            departamento : {...selecteds.departamento},
            localidad : {nombre : ""}
          })
          
        }
      }
    }
  }, [selecteds.provincia, selecteds.departamento]);

  const handdleSelecteds = (e) => {
    if(e.target.value){
      const value = JSON.parse(e.target.value),
      name = e.target.name;
      setSelecteds({
        ...selecteds,
        [name] : value
      });
    }
  };

  const handdleSubmit = (e) => {
    e.preventDefault();

    if(selecteds.provincia.nombre){
       const newChange = Object.values(selecteds).filter(select => select.nombre !== "");
       
       handdleChange(newChange)
    }
  };

  return {
    selecteds,
    handdleSelecteds,
    options,
    handdleSubmit
  };
};
