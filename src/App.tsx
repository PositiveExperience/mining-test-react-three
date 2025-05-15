import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from './hooks/useStores';
import { MineScene } from './components/Scene';
import { HorizonSelector, NodeInfoPanel, Loader, ErrorMessage } from './components/UI';
import './App.css';

const App = observer(() => {
  const { nodeStore } = useStores();

  useEffect(() => {
    const xmlPath = './src/assets/data/MIM_Scheme.xml';
    nodeStore.loadNodes(xmlPath);
  }, [nodeStore]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>3D Визуализация шахты</h1>
        <HorizonSelector />
      </header>

      <main className="scene-container">
        {nodeStore.isLoading ? (
          <Loader message="Загрузка данных шахты..." />
        ) : nodeStore.error ? (
          <ErrorMessage text={nodeStore.error} />
        ) : (
          <>
            <MineScene />
            <NodeInfoPanel />
          </>
        )}
      </main>
    </div>
  );
});

export default App;