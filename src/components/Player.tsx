import { FrameCorners, Pause, Play, Rectangle, SkipBack, SkipForward, SpeakerHigh, SpeakerSlash } from 'phosphor-react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import styles from './Player.module.css';

interface PlayerProps {
  url: string;
  handleTheaterMode: () => void;
  handleNextVideo: () => void;
  handlePreviousVideo: () => void;
  hasNextVideo: boolean;
  hasPreviousVideo: boolean;
}

export function Player({ url, handleTheaterMode, handleNextVideo, handlePreviousVideo, hasNextVideo, hasPreviousVideo }: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>() as MutableRefObject<HTMLVideoElement>;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    videoRef.current.autoplay = true;
    setIsPlaying(true);
  }, [url])

  function handlePlayPause() {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(oldState => !oldState)
  }

  function handleMuteUnmute() {
    if (isMutating) {
      videoRef.current.muted = false;
    } else {
      videoRef.current.muted = true;
    }

    setIsMutating(oldState => !oldState)
  }

  function handleFullScreen() {
    videoRef.current.requestFullscreen();
  }

  useEffect(() => {
    const videoRefEvent = videoRef.current;
    const updateTime = () => setCurrentTime(videoRef.current.currentTime)

    videoRefEvent.addEventListener('timeupdate', updateTime)

    return () => {
      videoRefEvent.removeEventListener('timeupdate', updateTime);
    }
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const minutesFormatted = minutes.toString().padStart(2, '0');
    const secondsFormatted = seconds.toString().padStart(2, '0');

    return `${minutesFormatted}:${secondsFormatted}`;
  };

  console.log(url)

  return (
    <div className={styles.player}>
      <video ref={videoRef} src={url} onClick={handlePlayPause} className={styles.videoPlayer}></video>

      <div className={styles.controls}>
        <div>
          {!isPlaying ? (
            <button onClick={handlePlayPause}>
              <Play size={20} />
            </button>
          ) : (
            <button onClick={handlePlayPause}>
              <Pause size={20} />
            </button>
          )}

          <button onClick={handlePreviousVideo} disabled={!hasPreviousVideo}>
            <SkipBack size={20} />
          </button>

          <button onClick={handleNextVideo} disabled={!hasNextVideo}>
            <SkipForward size={20} />
          </button>

          {!isMutating ? (
            <button onClick={handleMuteUnmute}>
              <SpeakerSlash size={20} />
            </button>
          ) : (
            <button onClick={handleMuteUnmute}>
              <SpeakerHigh size={20} />
            </button>
          )}
        </div>

        <span>{formatTime(currentTime)}</span>

        <div>
          <button onClick={handleTheaterMode}>
            <Rectangle size={20} />
          </button>

          <button onClick={handleFullScreen}>
            <FrameCorners size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}