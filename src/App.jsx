// import logo from './logo.svg';
import { ThemeProvider } from "@emotion/react";
import "./App.css";
import TodoList2 from "./components/TodoList";
//them
import { createTheme } from "@mui/material/styles";
import { All_dataContext } from "./components/context/context";
import { TaskReduserProvider } from "./comp/contextReduse";

const Theme = createTheme({
  //  سواء كانت في زرار او اي مكون typography لان اي كتابة هنا تعتبر typographyاستخدمت هنا ال
  typography: {
    fontFamily: "Cairo",
  },
});

function App() {
  return (
    <ThemeProvider theme={Theme}>
      {/*  eslint-disable-next-line  */}
      <TaskReduserProvider>
        {/* eslint-disable-next-line */}
      <All_dataContext>
        <TodoList2 />
      </All_dataContext>
      </TaskReduserProvider>
    </ThemeProvider>
  );
}

export default App;
