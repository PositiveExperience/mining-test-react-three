import React from 'react';
import { observer } from 'mobx-react-lite';
import { Canvas } from '@react-three/fiber';
import { useStores } from '../../hooks/useStores';
import { NodeElement, SectionConnection } from '../Elements';
import { OrbitControls, Bounds } from '@react-three/drei';

type Section = {
  id: string;
  startNodeId: string;
  endNodeId: string;
  isHighlighted: boolean;
};

const MineScene = observer(() => {
  const { nodeStore, horizonStore, uiStore } = useStores();

  const nodesToShow = horizonStore.activeHorizonZ
    ? horizonStore.activeHorizonNodes
    : nodeStore.nodes;

  const horizonSections: Section[] = [];
  for (let i = 0; i < nodesToShow.length - 1; i++) {
    const start = nodesToShow[i];
    const end = nodesToShow[i + 1];
    horizonSections.push({
      id: `${start.id}-${end.id}`,
      startNodeId: start.id,
      endNodeId: end.id,
      isHighlighted: false
    });
  }

  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 100000 }}
    >
      <color attach="background" args={['#222831']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={0.5} />
      <Bounds fit clip observe visible={false}>
        {nodesToShow.map(node => (
          <NodeElement 
            key={node.id} 
            node={node} 
            isSelected={uiStore.selectedNodeId === node.id}
          />
        ))}
        {horizonSections.map(section => {
          const startNode = nodeStore.getNodeById(section.startNodeId);
          const endNode = nodeStore.getNodeById(section.endNodeId);
          if (!startNode || !endNode) return null;
          return (
            <SectionConnection 
              key={section.id} 
              start={startNode}
              end={endNode}
              color={section.isHighlighted 
                ? uiStore.displaySettings.highlightColor 
                : uiStore.displaySettings.sectionColor
              }
            />
          );
        })}
      </Bounds>
      <OrbitControls makeDefault />
    </Canvas>
  );
});

export default MineScene;