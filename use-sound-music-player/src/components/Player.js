import { useEffect, useState } from "react";
import useSound from "use-sound";
import chotDilPe from "../assets/audio/chotDilPe.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(chotDilPe);
  const [currentTime, setCurrentTime] = useState({
    min: "",
    secs: "",
  });
  const [seconds, setSeconds] = useState();

  const sec = duration / 1000;
  const min = Math.floor(sec / 60);
  const secRemain = Math.floor(sec % 60);
  const time = {
    min: min,
    secs: secRemain,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        console.log("min", min);
        console.log("sec", sec);
        setCurrentTime({ min: min, secs: sec });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };
  return (
    <div className="component">
      <h2>Playing Now</h2>
      <img className="musicCover" src="https://picsum.photos/200/200" />
      <div>
        <h3 className="title">Chot Dil Pe </h3>
        <p className="subTitle">Dil Se</p>
      </div>
      <div>
        <div className="time">
          <p>
            {currentTime.min}:{currentTime.secs}
          </p>
          <p>
            {time.min}:{time.secs}
          </p>
          <input
            type="range"
            min="0"
            max={duration / 1000}
            default="0"
            value={seconds}
            className="timeline"
            onChange={(e) => {
              sound.seek([e.target.value]);
            }}
          />
        </div>
      </div>
      <button className="playButton">
        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
          <BiSkipPrevious />
        </IconContext.Provider>
      </button>
      {!isPlaying ? (
        <button className="playButton" onClick={playingButton}>
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <AiFillPlayCircle />
          </IconContext.Provider>
        </button>
      ) : (
        <button className="playButton" onClick={playingButton}>
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <AiFillPauseCircle />
          </IconContext.Provider>
        </button>
      )}
      <button>
        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
          <BiSkipNext />
        </IconContext.Provider>
      </button>
    </div>
  );
};
export default Player;
