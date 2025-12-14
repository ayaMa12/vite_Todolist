import { useEffect, useState, useMemo } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Misstoes from "./misstoes";
import InputAdd from "./InputAdd";
import { useData } from "./context/context";
import Container from "@mui/material/Container";
import { useTaskDisparch, useTaskReduser } from "../comp/contextReduse";

//===========================
//  useReduser
//===========================
export default function Mycard() {
  const { funSnacbar } = useData();
  const data = useTaskReduser();
  const dispatch = useTaskDisparch();

  const [Newdata, setNewData] = useState({ title: "", description: "" });
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [Delete, setDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [EditId, setEditId] = useState(null);
  const taskToDelete = deleteId
    ? data.find((item) => item.id === deleteId)
    : null;
  const [compeletedBtn, setCompeletedBtn] = useState("all");

  //useReduser
  // if (!localStorage.getItem("task")) {
  //   localStorage.setItem("task", JSON.stringify(list_Misstoes));
  // }
  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("task")) || [];
    if (stored) {
      dispatch({ type: "getData", payload: stored });
    }
    //  else {
    //   dispatch({ type: "getData", payload: list_Misstoes });
    //  }

    // eslint-disable-next-line
  }, []);

  const handleCloseDelete = () => {
    setOpen(false);
  };
  const handleOpenDelete = () => {
    setOpen(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const DeleteClose = () => {
    setDelete(false);
  };
  const DeleteOpen = () => {
    setDelete(true);
  };
  const completedCount = useMemo(
    () => data.filter((item) => item.isCompleted).length,
    [data]
  );
  const notCompletedCount = useMemo(
    () => data.filter((item) => !item.isCompleted).length,
    [data]
  );
  const allCount = data.length;

  let data_Filter = useMemo(() => {
    if (compeletedBtn === "Compeleted") {
      return data.filter((itemCom) => itemCom.isCompleted === true);
    }
    if (compeletedBtn === "notCompeleted") {
      return data.filter((itemCom) => itemCom.isCompleted === false);
    }

    return data;
  }, [data, compeletedBtn]);

  //    map من خلال مصفوفة  بواسطة ال misstoes هنا هبعت ال
  let new_List = data_Filter.map((item) => (
    <Misstoes
      key={item.id}
      item={item}
      Compeleted={Compeleted}
      requestEdit={requestEdit}
      handleOpenEdit={handleOpenEdit}
      requestDelete={requestDelete}
      funSnacbar={funSnacbar}
    />
  ));
  //function setInput value from textfail
  function inputHandel(value) {
    setInput(value);
  }
  //=====================
  //function delete
  //  function handelDelete(itemid) {
  //   if (window.confirm("هل أنت متأكد من الحذف؟")) {
  //     const NewData = data.filter(item => item.id !== itemid);
  //     setData(NewData);
  //   }
  // }
  function requestDelete(id) {
    setDeleteId(id);
    handleOpenDelete();
  }
  function handelDelete(deleteId) {
    handleCloseDelete();
    setDeleteId(null);
    if (taskToDelete) {
      funSnacbar(`تم حذف المهمة ${taskToDelete.title} بنجاح`);
    }

    dispatch({ type: "Delete", payload: deleteId });
  }

  //=========================
  //function edite
  function requestEdit(id) {
    if (!id) return; // حماية
    let back_data = data.find((item) => item.id === id);
    if (back_data) {
      setNewData({
        title: back_data.title,
        description: back_data.description,
      });
    }
    setEditId(id);
    handleOpenEdit();
  }

  function handelEdit(EditId) {
    handleCloseEdit();
    setEditId(null);
    funSnacbar(`تم تعديل المهمة ${Newdata.title} بنجاح`);
    dispatch({
      type: "Edit",
      payload: {
        id: EditId,
        title: Newdata.title,
        description: Newdata.description, // صححت الاسم هنا
      },
    });
  }

  //=================

  function Compeleted(itemid) {
    const selectedTask = data.find((task) => task.id === itemid);
    if (!selectedTask) return;

    // حالة جديدة متوقعة بعد التبديل:
    const newStatus = !selectedTask.isCompleted;

    if (newStatus) {
      funSnacbar(`تم إنهاء المهمة "${selectedTask.title}" بنجاح ✅`);
    } else {
      funSnacbar(`تم إعادة المهمة "${selectedTask.title}" إلى غير منجزة ❌`);
    }

    dispatch({ type: "Toggle", payload: itemid });
  }

  //function add
  function Add() {
    funSnacbar(`تم اضافة المهمة ${input} بنجاح`);
    dispatch({ type: "add", payload: input });
    setInput("");
  }
  //=========================
  //function deletAll
  function DeleteAll() {
    setDelete(false);
    funSnacbar(`تم حذف جميع المهام`);
    dispatch({ type: "DeleteAll" });
  }

  // const [count ,setCount]=useState([])
  //   function countCompeleted(){
  //     let arraytest=[]
  //      setCompeletedBtn("Compeleted")
  //      data.map((item)=>item.isCompleted?arraytest.push("done"):arraytest.push(" "))

  //   setCount(arraytest)
  //   console.log(arraytest)
  //   }
  return (
    <>
      <div maxWidth="sm" className="container">
        <Card>
          <Typography variant="h1" sx={{ textAlign: "center" }}>
            {" "}
            مهامي
            <Divider />
            {/* equal <hr/> */}
          </Typography>

          <div
            style={{
              textAlign: "center",
              margin: "40px",
            }}
          >
            <ButtonGroup variant="outlined" color="error">
              <Button
                variant={
                  compeletedBtn === "notCompeleted" ? "contained" : "outlined"
                }
                onClick={() => setCompeletedBtn("notCompeleted")}
              >
                غير منجز{notCompletedCount}
              </Button>
              <Button
                variant={
                  compeletedBtn === "Compeleted" ? "contained" : "outlined"
                }
                onClick={() => setCompeletedBtn("Compeleted")}
              >
                منجز{completedCount}
              </Button>
              <Button
                variant={compeletedBtn === "all" ? "contained" : "outlined"}
                onClick={() => setCompeletedBtn("all")}
              >
                الكل{allCount}
              </Button>
            </ButtonGroup>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              margin: "30px 10px",
            }}
          >
            {new_List}
          </div>
        </Card>
      </div>
      <div className="fixed">
        <InputAdd input={input} inputHandel={inputHandel} Add={Add} />
        <Button
          variant="contained"
          color="error"
          sx={{ width: "95%", margin: "10px", padding: "15px" }}
          onClick={DeleteOpen}
        >
          حذف الكل {data.length}
        </Button>
      </div>
      {/*Dialog delete  */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={open}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {"عنوان المهمة "}
        </DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText id="alert-dialog-description">
            {/* هل تريد حذف "{taskToDelete.title}" */}
            {taskToDelete ? ` هل تريد حذف ${taskToDelete.title}` : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>غير موافق</Button>
          <Button onClick={() => handelDelete(deleteId)}>موافق</Button>
        </DialogActions>
      </Dialog>
      {/* ============================================ */}
      {/* Dialog Edit */}
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        sx={{ direction: "rtl" }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          هل تريد تعديل البيانات
        </DialogTitle>
        <DialogContent
          sx={{ width: 500, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <DialogContentText>تغير العنوان </DialogContentText>

          <TextField
            sx={{ width: "100%" }}
            value={Newdata.title}
            onChange={(e) => {
              setNewData({ ...Newdata, title: e.target.value });
            }}
            id="outlined-basic"
            label="العنوان"
            variant="outlined"
          />
          <DialogContentText>تغير الوصف </DialogContentText>

          <TextField
            id="outlined-basic"
            label="الوصف"
            variant="outlined"
            sx={{ width: "100% " }}
            value={Newdata.description}
            onChange={(e) => {
              setNewData({ ...Newdata, description: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>لا</Button>
          <Button onClick={() => handelEdit(EditId)}>نعم</Button>
        </DialogActions>
      </Dialog>
      {/* ======================================== */}
      {/* Delet All */}
      <Dialog open={Delete} onClose={DeleteClose} sx={{ direction: "rtl" }}>
        <DialogTitle sx={{ textAlign: "center" }}>
          هل تريد حذف جميع البيانات
        </DialogTitle>
        <DialogActions>
          <Button onClick={DeleteClose}>لا</Button>
          <Button onClick={() => DeleteAll()}>نعم</Button>
        </DialogActions>
      </Dialog>
      {/* ========================================= */}
    </>
  );
}
