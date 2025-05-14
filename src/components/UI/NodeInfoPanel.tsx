import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/useStores';
import './NodeInfoPanel.css';

const NodeInfoPanel = observer(() => {
  const { uiStore, nodeStore } = useStores();
  
  if (!uiStore.selectedNodeId) return null;

  const node = nodeStore.getNodeById(uiStore.selectedNodeId);
  if (!node) return null;

  return (
    <div className="node-panel">
      <div className="panel-header">
        <h3>Информация об узле</h3>
        <button 
          className="close-button"
          onClick={() => uiStore.selectNode(null)}
        >
          ×
        </button>
      </div>
      
      <div className="node-details">
        <div className="detail-row">
          <span>ID:</span>
          <span>{node.id}</span>
        </div>
        <div className="detail-row">
          <span>X:</span>
          <span>{node.x.toFixed(2)}</span>
        </div>
        <div className="detail-row">
          <span>Y:</span>
          <span>{node.y.toFixed(2)}</span>
        </div>
        <div className="detail-row">
          <span>Z:</span>
          <span>{node.z.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
});

export default NodeInfoPanel;