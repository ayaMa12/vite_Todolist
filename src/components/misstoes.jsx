import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export default function Misstoes({
  item,
  Compeleted,
  requestEdit,
  requestDelete,
}) {
  return (
    // col هنا دي بتمثل ال size={5}
    // display:"flex",justifyContent:"space-between" هنا يغني عن دا containtاستخدام
    <Grid
      className="container_grid"
      container
      alignItems="center"
      sx={{
        bgcolor: "#122",
        display: "flex",
        justifyContent: "space-between",
        borderRadius: "10px",
        boxShadow: 3,
      }}
    >
      <Grid
        sx={{   display: "flex", gap: 1, padding: "9px" }}
        size={5}
      >
        <IconButton
          className="BtnIcon"
          onClick={() => requestDelete(item.id)}
          sx={{
            border: "1px solid red",
            bgcolor: "white",
            fontSize: "20px",
            color: "red",
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          className="BtnIcon"
          onClick={() => requestEdit(item.id)}
          sx={{
            border: "1px solid rgba(12, 158, 12, 1)",
            bgcolor: "white",
            fontSize: "20px",
            color: "rgba(12, 158, 12, 1)",
          }}
        >
          <EditIcon/>
         </IconButton>
        <IconButton
          className="BtnIcon"
          onClick={() => Compeleted(item.id)}
          sx={{
            border: "1px solid aqua",
            bgcolor: item.isCompleted ? "#67c090" : "#fff",
            fontSize: "20px",
            color: item.isCompleted ? "#fff" : "#67c090",
           }}
        >
          <CheckIcon />
        </IconButton>
      </Grid>

      <Grid
        size={7}
        sx={{
          textAlign: "end",
          padding: "9px",
          fontFamily: "Cairo",
          color: "white",
        }}
      >
        <Typography variant="h4" style={{ textDecoration: item.isCompleted ? "line-through" : "none" }}> {item.title} </Typography>
        <Typography variant=" h6"  style={{ textDecoration: item.isCompleted ? "line-through" : "none" }}> {item.description} </Typography>
      </Grid>
    </Grid>
  );
}
