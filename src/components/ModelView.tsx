import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei';
import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Model as TypeModel, Size as TypeSize } from '../constants';
import Lights from './Lights';
import Loader from './Loader';
import ModelIphone from './Scene';

type ModelViewProps = {
  index: number;
  groupRef: React.RefObject<THREE.Group>;
  gsapType: string;
  controlRef: React.RefObject<any>;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  item: TypeModel;
  size: TypeSize;
};

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, item, size }: ModelViewProps) => {
  return (
    <View index={index} id={gsapType} className={`h-full w-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}>
      {/* AmbientLight */}
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group ref={groupRef} name={`${index === 1 ? 'small' : 'large'}`} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <ModelIphone scale={index === 1 ? [15, 15, 15] : [17, 17, 17]} model={item} size={size} />
        </Suspense>
      </group>
    </View>
  );
};
export default ModelView;
