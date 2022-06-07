import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const { setValue, filterData } = useContext(Context);

  const handleFilterName = ({ target }) => {
    const filter = filterData.filter((planet) => planet.name
      .toLowerCase().includes(target.value));
    console.log(filter);
    setValue({ data: filter, filterData, setValue });
  };

  return (
    <div>
      <input type="text" onChange={ handleFilterName } data-testid="name-filter" />
    </div>
  );
}

export default Filters;
