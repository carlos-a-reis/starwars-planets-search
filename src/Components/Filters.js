import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Filters() {
  const {
    setFilterByName,
    setFilterByNumericValues,
    filterByNumericValues,
  } = useContext(Context);

  const [type, setType] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState(0);

  const handleFilterName = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const saveFilter = () => {
    setFilterByNumericValues([
      ...filterByNumericValues,
      {
        column: type,
        comparison: operator,
        value,
      },
    ]);
  };

  return (
    <div>
      <input type="text" onChange={ handleFilterName } data-testid="name-filter" />
      <form>

        <select
          value={ type }
          onChange={ ({ target }) => setType(target.value) }
          data-testid="column-filter"
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>

        <select
          value={ operator }
          onChange={ ({ target }) => setOperator(target.value) }
          data-testid="comparison-filter"
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>

        <input
          type="number"
          value={ value }
          onChange={ ({ target }) => setValue(target.value) }
          data-testid="value-filter"
        />

        <button
          type="button"
          onClick={ saveFilter }
          data-testid="button-filter"
        >
          Filtrar
        </button>

      </form>
    </div>
  );
}

export default Filters;
