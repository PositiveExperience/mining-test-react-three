import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/useStores';
import './WorkingsList.css';

const WorkingsList = observer(() => {
  const { nodeStore, horizonStore } = useStores();

  const activeHorizon = horizonStore.activeHorizonZ !== null
    ? nodeStore.horizons.find(h => h.zLevel === horizonStore.activeHorizonZ)
    : null;

  const toggleWorking = (workingId: string) => {
    const working = nodeStore.getWorkingById(workingId);
    if (working) {
      working.isVisible = !working.isVisible;
    }
  };

  if (!activeHorizon || activeHorizon.workings.length === 0) {
    return null;
  }

  return (
    <div className="workings-list">
      <h3>Выработки горизонта {activeHorizon.name}</h3>
      <div className="workings-items">
        {activeHorizon.workings.map(working => (
          <label key={working.id} className="working-item">
            <input
              type="checkbox"
              checked={working.isVisible}
              onChange={() => toggleWorking(working.id)}
            />
            <span>{working.name || `Выработка ${working.id}`}</span>
          </label>
        ))}
      </div>
    </div>
  );
});

export default WorkingsList; 