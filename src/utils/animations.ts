import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import * as THREE from 'three';
gsap.registerPlugin(ScrollTrigger);
// type AnimationProps = {
//   transform: string;
//   duration: 2;
// };

// export interface TypeAnimateWithGSAPTimeline {
//   timeline: gsap.core.Timeline;
//   rotationRef: React.RefObject<THREE.Group<THREE.Object3DEventMap>>;
//   rotationState: number;
//   firstTarget: string;
//   secondTarget: string;
//   animationProps: gsap.TweenVars;
// }
export const animateWithGSAPTimeline = (
  timeline: gsap.core.Timeline,
  rotationRef: React.RefObject<THREE.Group<THREE.Object3DEventMap>>,
  rotationState: number,
  firstTarget: string,
  secondTarget: string,
  animationProps: gsap.TweenVars,
) => {
  timeline.to(rotationRef.current, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut',
  });
  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<',
  );
  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<',
  );
};

export const animateWithGSAP = (target: string, animationProps: gsap.TweenVars, scrollProps?: ScrollTrigger.Vars) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    //   markers:true
    },
  });
};
