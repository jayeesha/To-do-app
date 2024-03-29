import { useContext, useEffect, useRef } from "react";
import ModalInput from "./ModalInput";
import { FormDataContext } from "../store/FormDataContext";

interface PomodoroData {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  isPaused: boolean;
  period: number;
}

const Modal: React.FC<{
  isSettingsOn: boolean;
  setIsSettingsOn: (any: boolean) => void;
  setPomodoro: (prev: React.SetStateAction<PomodoroData>) => void;
}> = ({ isSettingsOn, setIsSettingsOn, setPomodoro }) => {
  const { formData, setFormData } = useContext(FormDataContext);
  const modalRef = useRef<HTMLDivElement>(null);

  interface PomodoroData {
    pomodoroTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPomodoro((prevPomodoro: PomodoroData) => ({
      ...prevPomodoro,
      pomodoroTime: formData.pomodoroTime * 60,
      shortBreakTime: formData.shortBreakTime * 60,
      longBreakTime: formData.longBreakTime * 60,
      isPaused: true,
      period: 1,
    }));
    setIsSettingsOn(false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleOutsideClick(e: MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsSettingsOn(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <>
      {isSettingsOn && (
        <div
          className={`block modal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[20rem] md:w-[28rem] rounded-2xl text-pmd-blue-800 px-6 pt-6 pb-12`}
          ref={modalRef}
        >
          <div className=" flex pb-6 border-b justify-between items-center">
            <h2 className="font-bold text-xl">Settings</h2>
            <button onClick={() => setIsSettingsOn(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div>
            <h3 className="uppercase tracking-wider font-bold text-sm py-3">
              Time (minutes)
            </h3>

            <form className="inputs flex" onSubmit={handleSubmit}>
              <ModalInput
                label={"pomodoro"}
                name={"pomodoroTime"}
                defaultValue={formData.pomodoroTime}
                onChange={handleInputChange}
              />
              <ModalInput
                label={"short break"}
                name={"shortBreakTime"}
                defaultValue={formData.shortBreakTime}
                onChange={handleInputChange}
              />
              <ModalInput
                label={"long break"}
                name={"longBreakTime"}
                defaultValue={formData.longBreakTime}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="absolute -bottom-5 bg-rose-600 text-white font-semibold text-sm rounded-full px-8 py-3 left-1/2 -translate-x-1/2 hover:bg-rose-700 transition-all cursor-pointer"
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
