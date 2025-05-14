import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/useStores';
import './HorizonSelector.css';

const HorizonSelector = observer(() => {
  const { horizonStore } = useStores();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    horizonStore.setActiveHorizon(value === 'all' ? null : Number(value));
  };

  return (
    <div className="horizon-selector">
      <select
        value={horizonStore.activeHorizonZ ?? 'all'}
        onChange={handleChange}
      >
        <option value="all">Все горизонты</option>
        {horizonStore.horizons.map(horizon => (
          <option key={horizon.zLevel} value={horizon.zLevel}>
            Горизонт {horizon.zLevel}m ({horizon.nodes.length} узлов)
          </option>
        ))}
      </select>
    </div>
  );
});

export default HorizonSelector;