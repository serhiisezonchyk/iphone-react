import { useGSAP } from '@gsap/react';
import { View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { FC, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Model as TypeModel, Size as TypeSize, models, sizes } from '../constants';
import { animateWithGSAPTimeline } from '../utils/animations';
import ModelView from './ModelView';
const Model: FC = () => {
  const [size, setSize] = useState<TypeSize>(sizes[0]);
  const [model, setModel] = useState<TypeModel>(models[0]);

  //camera control for the model view
  const cameraControlSmall: React.RefObject<any> = useRef();
  const cameraControlLarge: React.RefObject<any> = useRef();

  //model
  const small: React.RefObject<THREE.Group> = useRef(new THREE.Group());
  const large: React.RefObject<THREE.Group> = useRef(new THREE.Group());

  //rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size.value === 'large') {
      animateWithGSAPTimeline(tl, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        duration: 2,
      });
    }

    if (size.value === 'small') {
      animateWithGSAPTimeline(tl, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        duration: 2,
      });
    }
  }, [size]);
  useGSAP(() => {
    gsap.to('#heading', {
      y: 0,
      opacity: 1,
    });
  }, []);
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>
        <div className="mt-5 flex flex-col items-center">
          <div className="relative h-[75vh] w-full overflow-hidden md:h-[90vh]">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
            <Canvas
              className="h-full w-full"
              style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden' }}
              eventSource={(document.getElementById('root') as HTMLElement) || undefined}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="mb-5 text-center text-sm font-light">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className={`mx-2 h-6 w-6 cursor-pointer rounded-full ring-white ${item.id === model.id ? 'ring-1' : 'ring-0'}`}
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>
              <button className="size-btn-container">
                {sizes.map((item) => (
                  <span
                    key={item.label}
                    className="size-btn"
                    style={{
                      backgroundColor: size.label === item.label ? 'white' : 'transparent',
                      color: size.label === item.label ? 'black' : 'white',
                    }}
                    onClick={() => setSize(item)}
                  >
                    {item.label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
