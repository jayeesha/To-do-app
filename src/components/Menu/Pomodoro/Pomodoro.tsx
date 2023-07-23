import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Pomodoro: React.FC<{ classActive: string }> = ({ classActive }) => {
  const [isPomodoroOpen, setIsPomodoroOpen] = useState<boolean>(true);
  const route = useLocation();
  const currentPath = route.pathname;

  const togglePomodoroOpen = () => {
    setIsPomodoroOpen((prevState) => !prevState);
  };

  return (
    <div
      className={`px-4 py-1 ${currentPath === "/pomodoro" ? classActive : ""}`}
    >
      <NavLink
        to={`/pomodoro`}
        title={""}
        className="hover:text-rose-600 dark:hover:text-slate-200 transition text-ellipsis whitespace-nowrap overflow-hidden max-w-[7rem]"
      >
        <button
          className={`flex items-center w-full mb-2 ${
            isPomodoroOpen ? "dark:text-slate-200" : ""
          }`}
          onClick={togglePomodoroOpen}
        >
          Focus mode - Pomodoro
        </button>
      </NavLink>
    </div>
  );
};

export default Pomodoro;
