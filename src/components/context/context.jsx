import { createContext, useContext, useState } from "react";
 import AutohideSnackbar from "../snackbar";

const dataContext = createContext([]);
 

export const All_dataContext = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function funSnacbar(msg) {
    setMessage(msg);
    setOpen(true);
    setTimeout(() => setOpen(false), 1000);
  }

  

  return (
    <dataContext.Provider value={{funSnacbar} }>
      {children}
      <AutohideSnackbar open={open} message={message} />
    </dataContext.Provider>
  );
};

export const useData = () => useContext(dataContext);
