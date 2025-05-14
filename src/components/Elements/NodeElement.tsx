import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/useStores';
import type { Node } from '../../types';

interface NodeElementProps {
  node: Node;
  isSelected: boolean;
}

const NodeElement = observer(({ node, isSelected }: NodeElementProps) => {
  const { uiStore } = useStores();

  const handleClick = () => {
    uiStore.selectNode(isSelected ? null : node.id);
  };

  return (
    <mesh 
      position={[node.x, node.y, node.z]} 
      onClick={handleClick}
    >
      <sphereGeometry args={[uiStore.displaySettings.nodeSize]} />
      <meshStandardMaterial 
        color={isSelected 
          ? uiStore.displaySettings.highlightColor 
          : uiStore.displaySettings.sectionColor
        } 
      />
    </mesh>
  );
});

export default NodeElement;