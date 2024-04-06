import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import { FC, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { hightlightsSlides } from '../constants';
import { pauseImg, playImg, replayImg } from '../utils';
interface VideoState {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
}
type ProcessType = 'video-end' | 'video-last' | 'video-reset' | 'play' | 'pause';
type HandleLoadedMetadata = (i: number, e: SyntheticEvent<HTMLVideoElement, Event>) => void;

const VideoCarousel: FC = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLSpanElement[]>([]);

  const [video, setVideo] = useState<VideoState>({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState<SyntheticEvent<HTMLVideoElement, Event>[]>([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut',
    });
    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((prevVideo) => ({ ...prevVideo, startPlay: true, isPlaying: true }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;
    if (span[videoId]) {
      let animation = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(animation.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw',
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: 'white',
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px',
            });
            gsap.to(span[videoId], {
              backgroundColor: '#afafaf',
            });
          }
        },
      });
      if (videoId === 0) animation.restart();

      const animationUpdate = () => {
        animation.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
      };
      if (isPlaying) {
        gsap.ticker.add(animationUpdate);
      } else {
        gsap.ticker.remove(animationUpdate);
      }
    }
  }, [videoId, startPlay]);

  const handleLoadedMetadata: HandleLoadedMetadata = (_, e) => setLoadedData((prev) => [...prev, e]);

  const handleProcess = (type: ProcessType, i?: number) => {
    switch (type) {
      case 'video-end':
        setVideo((prevVideo) => ({ ...prevVideo, isEnd: true, videoId: i! + 1 }));
        break;
      case 'video-last':
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }));
        break;
      case 'video-reset':
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: false, videoId: 0 }));
        break;
      case 'play':
        setVideo((prevVideo) => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying }));
        break;
      case 'pause':
        setVideo((prevVideo) => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying }));
        break;
      default:
        return video;
    }
  };
  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="flex-center h-full w-full overflow-hidden rounded-3xl bg-black">
                <video
                  id="video"
                  playsInline={true}
                  muted
                  preload="auto"
                  ref={(el) => (videoRef.current[i] = el!)}
                  onEnded={() => {
                    i !== hightlightsSlides.length - 1 ? handleProcess('video-end', i) : handleProcess('video-last');
                  }}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute left-[5%] top-12 z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="text-xl font-medium md:text-2xl">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-center relative mt-10">
        <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el!)}
              className="relative mx-2 h-3 w-3 cursor-pointer rounded-full bg-gray-200"
            >
              <span className="absolute h-full w-full rounded-full" ref={(el) => (videoSpanRef.current[i] = el!)} />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={
              isLastVideo
                ? () => handleProcess('video-reset')
                : !isPlaying
                  ? () => handleProcess('play')
                  : () => handleProcess('pause')
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
