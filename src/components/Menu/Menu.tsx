import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { menusActions } from "../../store/Menu.store";
import BtnAddTask from "../Utilities/BtnAddTask";
import Directories from "./Directories/Directories";
import NavLinks from "./NavLinks";
import Pomodoro from "./Pomodoro/Pomodoro";
import LayoutMenus from "../Utilities/LayoutMenus";
import { ReactComponent as Note } from "../../assets/user-pen-solid.svg";

const classLinkActive =
  "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200";

const Menu: React.FC = () => {
  const menuOpen = useAppSelector((state) => state.menu.menuHeaderOpened);
  const dispatch = useAppDispatch();

  const closeMenuHandler = () => {
    dispatch(menusActions.closeMenuHeader());
  };
  return (
    <LayoutMenus
      menuOpen={menuOpen}
      closeMenuHandler={closeMenuHandler}
      className="left-0"
    >
      <header className="h-full flex flex-col">
        <div className="flex items-center mx-auto mt-8">
          <h1 className="font-bold uppercase text-center text-lg tracking-wide hidden xl:block">
            To-do App
          </h1>
          <div className="h-8 w-8 ml-2">
            <Note />
          </div>
        </div>

        <BtnAddTask className="my-8 mx-4" />
        <NavLinks classActive={classLinkActive} />
        <Directories classActive={classLinkActive} />
        <Pomodoro classActive={classLinkActive} />
      </header>
    </LayoutMenus>
  );
};

export default Menu;
