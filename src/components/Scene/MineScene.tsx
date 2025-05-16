import React from 'react';
import { observer } from 'mobx-react-lite';
import { Canvas } from '@react-three/fiber';
import { useStores } from '../../hooks/useStores';
import { NodeElement, SectionConnection } from '../Elements';
import { OrbitControls, Bounds } from '@react-three/drei';

const MineScene = observer(() => {
  const { nodeStore, horizonStore, uiStore } = useStores();

  const activeHorizon = horizonStore.activeHorizonZ !== null
    ? nodeStore.horizons.find(h => h.zLevel === horizonStore.activeHorizonZ)
    : null;

  const visibleNodes = activeHorizon
    ? activeHorizon.nodes
    : nodeStore.nodes;

  const visibleSections = React.useMemo(() => {
    if (activeHorizon) {
      return nodeStore.sections.filter(section => {
        const startNode = nodeStore.getNodeById(section.startNodeId);
        const endNode = nodeStore.getNodeById(section.endNodeId);
        const tolerance = 1.0;
        return startNode && endNode && 
               Math.abs(startNode.z - horizonStore.activeHorizonZ!) <= tolerance &&
               Math.abs(endNode.z - horizonStore.activeHorizonZ!) <= tolerance;
      });
    }
    return nodeStore.sections;
  }, [activeHorizon, nodeStore.sections, horizonStore.activeHorizonZ]);


  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 100000 }}
    >
      <color attach="background" args={['#222831']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={0.5} />
      <Bounds fit clip observe visible={false}>
        {visibleNodes.map(node => (
          <NodeElement 
            key={node.id} 
            node={node} 
            isSelected={uiStore.selectedNodeId === node.id}
          />
        ))}
        {visibleSections.map(section => {
          const startNode = nodeStore.getNodeById(section.startNodeId);
          const endNode = nodeStore.getNodeById(section.endNodeId);
          
          if (!startNode || !endNode) {
            return null;
          }

          return (
            <SectionConnection 
              key={section.id} 
              start={startNode}
              end={endNode}
              color={uiStore.displaySettings.sectionColor}
            />
          );
        })}
      </Bounds>
      <OrbitControls makeDefault />
    </Canvas>
  );
});

export default MineScene;