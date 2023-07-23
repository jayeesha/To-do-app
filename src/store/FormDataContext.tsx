import { createContext, useState, ReactNode } from "react";
import { stages } from "../Constants/constants";

interface FormData {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
}

const initialFormData: FormData = {
  ...stages,
};

interface FormDataContextData {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
export const FormDataContext = createContext<FormDataContextData>({
  formData: initialFormData,
} as FormDataContextData);

const FormDataProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    pomodoroTime: stages.pomodoroTime / 60,
    shortBreakTime: stages.shortBreakTime / 60,
    longBreakTime: stages.longBreakTime / 60,
  });
  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export default FormDataProvider;
