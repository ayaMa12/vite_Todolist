import { createContext, useContext, useReducer } from "react";
import { Funreduser } from "./Reduser";
import { v4 as uuidv4 } from "uuid";
const list_Misstoes = [
  {
    id: uuidv4(),
    title: "المهمة الاولي",
    description: "تفاصيل المهمة الاولي",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الثانية",
    description: "تفاصيل المهمة الثانية",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الثالثة",
    description: "تفاصيل المهمة الثالثة",
    isCompleted: false,
  },
];
// كتابة البيانات في localStorage مرة واحدة فقط
if (!localStorage.getItem("task") ) {
  localStorage.setItem("task", JSON.stringify(list_Misstoes));
}
const TaskReduser = createContext([]);
const TaskDisparch = createContext(null);
export const TaskReduserProvider = ({ children }) => {
  const [data, dispatch] = useReducer(Funreduser, list_Misstoes);
  return (
    <TaskReduser.Provider value={data}>
      <TaskDisparch.Provider value={dispatch}>{children}</TaskDisparch.Provider>
    </TaskReduser.Provider>
  );
};

export const useTaskReduser = () => useContext(TaskReduser);
export const useTaskDisparch = () => useContext(TaskDisparch);
