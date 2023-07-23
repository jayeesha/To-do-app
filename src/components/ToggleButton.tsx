import React, { Dispatch, SetStateAction } from "react";

interface PomodoroData {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  isPaused: boolean;
  period: number;
}

const ToggleButton: React.FC<{
  pomodoro: PomodoroData;
  setPomodoro: Dispatch<SetStateAction<PomodoroData>>;
}> = ({ pomodoro, setPomodoro }) => {
  function togglePausePlay() {
    setPomodoro((prevPomodoro) => {
      return {
        ...prevPomodoro,
        isPaused: !prevPomodoro.isPaused,
      };
    });
  }

  return (
    <>
      <button
        onClick={togglePausePlay}
        className="btn text-base uppercase tracking-[0.5rem]"
      >
        {pomodoro.isPaused ? "Start" : "Stop"}
      </button>
    </>
  );
};

export default ToggleButton;
