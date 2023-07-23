import React, { useState, Dispatch, SetStateAction } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Labels from "../../components/Labels";
import TimeDisplay from "../../components/TimeDisplay";
import ToggleButton from "../../components/ToggleButton";
import Modal from "../../components/Modal";
import useTimer from "../hooks/useTimer";
import useCalculateTime from "../hooks/useCalculateTime";
import { controllers } from "../../Constants/constants";

const PomodoroLayoutRoutes: React.FC<{}> = () => {
  const {
    pomodoro,
    selectedControl,
    setPomodoro,
    setSelectedControl,
    resetTimerValues,
    getRemainingTimePercentage,
  } = useTimer();
  const { minutes, seconds } = useCalculateTime({ pomodoro, selectedControl });
  const [isSettingsOn, setIsSettingsOn] = useState(false);

  document.title = `${controllers[selectedControl].label} - ${
    minutes < 9 ? "0" : ""
  }${minutes}:${seconds < 9 ? "0" : ""}${seconds}`;

  return (
    <section>
      <h1 className="font-medium my-5 text-center sm:text-left sm:my-8 md:text-2xl text-lg dark:text-slate-200">
        {"Focus Mode - Pomodoro"}
      </h1>
      <Labels
        resetTimerValues={resetTimerValues}
        selectedControl={selectedControl}
        setSelectedControl={setSelectedControl}
        setPomodoro={setPomodoro}
        setIsSettingsOn={setIsSettingsOn}
      />
      <div className="flex">
        <div className="tw-timer">
          <div className="flex flex-col justify-center items-center font-semibold relative">
            <CircularProgressbarWithChildren
              strokeWidth={2}
              value={getRemainingTimePercentage()}
              styles={buildStyles({
                trailColor: "transparent",
                pathColor: "#f43f5e",
              })}
            >
              <TimeDisplay
                pomodoro={pomodoro}
                selectedControl={selectedControl}
              />
              <ToggleButton pomodoro={pomodoro} setPomodoro={setPomodoro} />
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>

      <Modal
        isSettingsOn={isSettingsOn}
        setIsSettingsOn={setIsSettingsOn}
        setPomodoro={setPomodoro}
      />
    </section>
  );
};

export default React.memo(PomodoroLayoutRoutes);
