 import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
export default function AutohideSnackbar({open,message}) {
  

  return (
    <div>
      <Snackbar
        open={open}
         message="This Snackbar will be dismissed in 5 seconds."
      >
        <Alert severity="success" variant="filled" dir="rtl">{message}</Alert>
      </Snackbar>
    </div>
  );
}
