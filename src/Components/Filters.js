import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';

function Filters() {
  const {
    setFilterByName,
    setFilterByNumericValues,
    filterByNumericValues,
    setOrder,
  } = useContext(Context);

  const options = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [optionsType, setOptionsType] = useState(options);
  const [optionsTypeDisabled, setOptionsTypeDisabled] = useState(false);

  const [type, setType] = useState(optionsType[0]);
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState(0);

  const [sortType, setSortType] = useState('population');
  const [sortOrder, setSortOrder] = useState('ASC');

  const saveFilter = (event) => {
    event.preventDefault();
    setFilterByNumericValues([
      ...filterByNumericValues,
      {
        column: type,
        comparison: operator,
        value,
      },
    ]);

    const newOptionsType = optionsType.filter((option) => option !== type);
    setOptionsType(newOptionsType);
  };

  const deleteFilter = (deletedFilter) => {
    if (deletedFilter === 'all') {
      setFilterByNumericValues([]);

      setOptionsType(options);

      setOptionsTypeDisabled(false);
    } else {
      const newFilter = filterByNumericValues
        .filter((filter) => filter.column !== deletedFilter);
      setFilterByNumericValues(newFilter);

      const newOptionsType = options.filter((option) => option === deletedFilter
        || optionsType.includes(option));
      setOptionsType(newOptionsType);

      setOptionsTypeDisabled(false);
    }
  };

  useEffect(() => {
    if (optionsType.length === 0) setOptionsTypeDisabled(true);
    setType(optionsType[0]);
  }, [optionsType]);

  return (
    <div>
      <input
        type="text"
        onChange={ ({ target }) => setFilterByName({ name: target.value }) }
        data-testid="name-filter"
      />
      <form>

        <select
          value={ type }
          onChange={ ({ target }) => setType(target.value) }
          disabled={ optionsTypeDisabled }
          data-testid="column-filter"
        >
          { optionsType.map((typeOption) => (
            <option key={ typeOption }>{ typeOption }</option>
          )) }
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
          type="submit"
          onClick={ saveFilter }
          disabled={ optionsTypeDisabled }
          data-testid="button-filter"
        >
          Filtrar
        </button>

      </form>

      <form>
        <select
          onChange={ ({ target }) => setSortType(target.value) }
          data-testid="column-sort"
        >
          { options.map((option) => <option key={ option }>{ option }</option>) }
        </select>

        <label htmlFor="ASC">
          Ascendente
          <input
            type="radio"
            value="ASC"
            id="ASC"
            name="sort"
            onClick={ ({ target }) => setSortOrder(target.value) }
            data-testid="column-sort-input-asc"
          />
        </label>

        <label htmlFor="DESC">
          Descendente
          <input
            type="radio"
            value="DESC"
            id="DESC"
            name="sort"
            onClick={ ({ target }) => setSortOrder(target.value) }
            data-testid="column-sort-input-desc"
          />
        </label>

        <button
          type="button"
          onClick={ () => setOrder({ column: sortType, sort: sortOrder }) }
          data-testid="column-sort-button"
        >
          Ordenar
        </button>

      </form>

      <button
        type="button"
        onClick={ () => deleteFilter('all') }
        data-testid="button-remove-filters"
      >
        Remover Filtros
      </button>

      <ul>
        { filterByNumericValues !== undefined && filterByNumericValues
          .map((filter) => (
            <li key={ filter.column } data-testid="filter">
              <p>
                {`${filter.column} ${filter.comparison} ${filter.value}`}
              </p>
              <button
                type="button"
                onClick={ () => deleteFilter(filter.column) }
              >
                X
              </button>
            </li>
          )) }
      </ul>
    </div>
  );
}

export default Filters;
