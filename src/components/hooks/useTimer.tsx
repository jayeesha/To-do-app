import {
  useEffect,
  useState,
  useRef,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { stages, controllers } from "../../Constants/constants";
import { FormDataContext } from "../../store/FormDataContext";
// @ts-ignore
import alarmSound from "../../assets/bell-ring.mp3";

type PomodoroData = {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  isPaused: boolean;
  period: number;
};

type ControllerValue = keyof PomodoroData;

interface FormData {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
}

const useTimer = () => {
  const { formData } = useContext(FormDataContext);
  const [selectedControl, setSelectedControl] = useState<number>(0);
  const [pomodoro, setPomodoro] = useState<PomodoroData>(stages);
  const periodId = useRef(stages.period);

  const Sound = () => {
    const audio = new Audio(alarmSound);
    return audio.play();
  };

  const resetTimerValues = () => {
    setPomodoro((prevPomodoro) => ({
      ...prevPomodoro,
      pomodoroTime: formData.pomodoroTime * 60,
      shortBreakTime: formData.shortBreakTime * 60,
      longBreakTime: formData.longBreakTime * 60,
    }));
  };

  const getRemainingTimePercentage = () => {
    const controlValue = controllers[selectedControl].value as keyof FormData;
    const totalTime = formData[controlValue] * 60;
    const remainingTime = pomodoro[controlValue];
    return (remainingTime / totalTime) * 100;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (!pomodoro.isPaused) {
      timer = setInterval(() => {
        const controlValue = controllers[selectedControl]
          .value as ControllerValue;
        setPomodoro((prevPomodoro) => {
          const value = prevPomodoro[controlValue] as number;
          if (value === 0) {
            setSelectedControl((prevState) => {
              if (periodId.current % 8 === 0) {
                return 2;
              } else {
                return prevState >= controllers.length - 1
                  ? 0
                  : prevState === 0
                  ? prevState + 1
                  : prevState === 1
                  ? prevState - 1
                  : 0;
              }
            });

            resetTimerValues();
            if (timer !== null) {
              clearInterval(timer);
            }
            Sound();
            periodId.current += 1;

            return prevPomodoro;
          }
          return {
            ...prevPomodoro,
            [controlValue]: value - 1,
          };
        });
      }, 1000);
    }
    return () => {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, [
    pomodoro.isPaused,
    selectedControl,
    setPomodoro,
    setSelectedControl,
    pomodoro.period,
    formData,
  ]);

  return {
    pomodoro,
    setPomodoro,
    selectedControl,
    setSelectedControl,
    resetTimerValues,
    getRemainingTimePercentage,
  };
};

export default useTimer;
