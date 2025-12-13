import { v4 as uuidv4 } from "uuid";

export function Funreduser(curentTask, { type, payload }) {
  switch (type) {
    case "add": {
      if (!payload) {
        alert("من فضلك ادخل البيانات");
        return curentTask;
      }
      const newData = {
        id: uuidv4(),
        title: payload.charAt(0).toUpperCase() + payload.slice(1).toLowerCase(),
        description: `تفاصيل ${payload}`,
        isCompleted: false,
      };
      const Add_data = [...curentTask, newData];
      localStorage.setItem("task", JSON.stringify(Add_data));
      return Add_data;
    }

    case "Edit": {
      const updatedData = curentTask.map((item) => 
        item.id === payload.id ? { ...item, title: payload.title, description: payload.description } : item
      );
      localStorage.setItem("task", JSON.stringify(updatedData));
      return updatedData;
    }

    case "Delete": {
      const NewData = curentTask.filter((item) => item.id !== payload);
      localStorage.setItem("task", JSON.stringify(NewData));
      return NewData;
    }

    case "Toggle": {
      const comp = curentTask.map((co) => 
        co.id === payload ? { ...co, isCompleted: !co.isCompleted } : co
      );
      localStorage.setItem("task", JSON.stringify(comp));
      return comp;
    }

    case "DeleteAll": {
      localStorage.setItem("task", JSON.stringify([]));
      return [];
    }

    case "getData": {
      return payload;
    }

    default:
      return curentTask;
  }
}
