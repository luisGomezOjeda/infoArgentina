import { useSelecteds } from '../../hooks/useSelecteds';
import "./Form.css";

const initialSelecteds = {
  provincia: {
    nombre: ""
  },
  departamento: {
    nombre: ""
  },
  localidad: {
    nombre: ""
  }
};

export const FormSerchLocation = ({ handdleChange }) => {
  const {
    selecteds,
    handdleSelecteds,
    handdleSelectedsBlur,
    options,
    handdleSubmit,
    errors
  } = useSelecteds(initialSelecteds, handdleChange);

  return (
    <section className='section-form'>
      <form onSubmit={handdleSubmit}>
        <select name="provincia" value={selecteds.provincia.nombre} onChange={handdleSelecteds} onBlur={handdleSelectedsBlur}>
          <option value="">{selecteds.provincia.nombre || "seleccionar una provincia"}</option>
          {options.provincias.map(option => (
            <option key={option.id} value={JSON.stringify(option)}>{option.nombre}</option>
          ))}
        </select>

        {selecteds.provincia.nombre !== "" && (
          <select name="departamento" value={selecteds.departamento.nombre} onChange={handdleSelecteds} onBlur={handdleSelectedsBlur}>
            <option value="">{selecteds.departamento.nombre || "selecciona un departamento"}</option>
            {options.departamentos.map(option => (
              <option key={option.id} value={JSON.stringify(option)}>{option.nombre}</option>
            ))}
          </select>
        )}

        {selecteds.provincia.nombre !== "" && selecteds.departamento.nombre !== "" && (
          <select name="localidad" value={selecteds.localidad.nombre} onChange={handdleSelecteds} onBlur={handdleSelectedsBlur}>
            <option value="" key={0}>{selecteds.localidad.nombre || "selecciona una localidad"}</option>0
            {options.localidades.map(option => (
              <option key={option.id} value={JSON.stringify(option)}>{option.nombre}</option>
            ))}
          </select>
        )}

        <input type="submit" value="Buscar"/>
      </form>
    </section>
  );
};
