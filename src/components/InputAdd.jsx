import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function InputAdd({ input, inputHandel, Add }) {
  return (
    <>
      <Grid container sx={{ direction: "rtl" }} spacing={2}>
        <Grid size={9}>
          <TextField
            sx={{ width: "100%", height: "100%", fontFamily: "Cairo" }}
            label="عنوان المهمة"
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => inputHandel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // مهم مع multiline
                Add();
              }
            }}
          />
        </Grid>
        <Grid size={3}>
          {" "}
          <Button
            onClick={() => Add()}
            sx={{ width: "100%", height: "100%", fontFamily: "Cairo" }}
            color="primary"
            variant="contained"
          >
            اضافة
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
