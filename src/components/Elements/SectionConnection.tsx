import React, { useRef } from 'react';
import * as THREE from 'three';
import type { Node } from '../../types';

interface SectionConnectionProps {
  start: Node;
  end: Node;
  color: string;
}

const SectionConnection = ({ start, end, color }: SectionConnectionProps) => {
  const ref = useRef<THREE.Mesh>(null);
  
  const startVec = new THREE.Vector3(start.x, start.y, start.z);
  const endVec = new THREE.Vector3(end.x, end.y, end.z);
  const direction = new THREE.Vector3().subVectors(endVec, startVec);
  const length = direction.length();
  const position = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  const up = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction.clone().normalize());
  
  return (
    <mesh ref={ref} position={position} quaternion={quaternion}>
      <cylinderGeometry args={[10, 10, length, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default SectionConnection;