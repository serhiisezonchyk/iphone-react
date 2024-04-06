import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FC, useEffect, useState } from 'react';
import { heroVideo, smallHeroVideo } from '../utils';

const Hero: FC = () => {
  const [videoSrc, setVideoSrc] = useState<string>(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
  const handleVideoSrcSet = () => (window.innerWidth < 760 ? setVideoSrc(smallHeroVideo) : setVideoSrc(heroVideo));

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);
    return () => {
      window.removeEventListener('resize', handleVideoSrcSet);
    };
  }, []);
  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 });
    gsap.to('#cta', { opacity: 1, y: -50, delay: 2 });
  }, []);
  return (
    <section className="nav-height w-full bg-black ">
      <div className="flex-center h-[calc(100%-80px)] md:h-5/6 w-full flex-col">
        <p id="hero" className="hero-title">
          Iphone 15 PRO
        </p>
        <div className="w-9/12 md:w-10/12 overflow-hidden">
          <video autoPlay muted playsInline={true} key={videoSrc} className="pointer-events-none">
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div id="cta" className="flex translate-y-20 flex-col items-center opacity-0">
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="text-xl font-normal">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
