import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { chipImg, frameImg, frameVideo } from '../utils';
import { animateWithGSAP } from '../utils/animations';

const Chip = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useGSAP(() => {
    gsap.from('#chip', {
      scrollTrigger: {
        trigger: '#chip',
        start: '20% bottom',
        // markers: true,
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power1.inOut',
    });

    animateWithGSAP('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut',
    });
    animateWithGSAP(
      '#chipVideo',
      {
        onComplete: () => {
          videoRef.current?.play();
        },
      },
      {
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
        // markers: true,
      },
    );
  }, []);
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div id="chip" className="flex-center my-20 w-full">
          <img src={chipImg} alt="Chip image" width={180} height={180} />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="chip-title">
            A17 Pro chip. <br /> A monster win for gaming.
          </h2>
          <p className="chip-subtitle">It`s here. The biggest redisign in the history of Apple GPUs</p>
        </div>
        <div className="mb-14 mt-10 md:mt-20">
          <div className="flex-center relative h-full">
            <div className="overflow-hidden">
              <img src={frameImg} alt="frame" className="relative z-10 bg-transparent" />
            </div>
            <div className="chip-video">
              <video
                id="chipVideo"
                className="pointer-events-none"
                playsInline
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          <p className="mt-3 text-center font-semibold text-gray">Honkai: Start Rail</p>
        </div>
        <div className="chip-text-container">
          <div className="flex flex-1 flex-col justify-center">
            <p className="chip-text g_fadeIn">
              A17 Pro is an entirely new class of iPhone chip that delivers our{' '}
              <span className="text-white">best graphic performance by far</span>.
            </p>

            <p className="chip-text g_fadeIn">
              Mobile <span className="text-white">games will look and feel so immersive</span>, with incredibly detailed
              environments and characters.
            </p>
          </div>

          <div className="g_fadeIn flex flex-1 flex-col justify-center">
            <p className="chip-text">New</p>
            <p className="chip-bigtext">Pro-class GPU</p>
            <p className="chip-text">with 6 cores</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chip;
