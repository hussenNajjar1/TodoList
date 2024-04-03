import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TodosContext } from "../contexts/todosContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Todo({ todo }) {
  const notify = (message) => toast(message);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  const { todos, setTodos } = useContext(TodosContext);

  const handleCheckClick = () => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    notify("تم انجاز المهمة بنجاح");
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleUpdateClick = () => {
    setShowUpdateDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setShowDeleteDialog(false);
  };

  const handleUpdateClose = () => {
    setShowUpdateDialog(false);
  };
  const handleDeleteConfirm = () => {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteDialog(false);
    notify("تم حذف المهمة بنجاح");
  };
  

  const handleUpdateConfirm = () => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? { ...t, title: updatedTodo.title, details: updatedTodo.details }
        : t
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowUpdateDialog(false);
    notify("تم تحديث المهمة بنجاح");
  };

  return (
    <>
      <Dialog
        style={{ direction: "rtl"}}
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
      >
        <DialogTitle>هل أنت متأكد من رغبتك في حذف المهمة؟</DialogTitle>
        <DialogContent>
          <DialogContentText>
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم، قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleUpdateClose}
        open={showUpdateDialog}
      >
        <DialogTitle>تعديل مهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, title: e.target.value })
            }
          />

          <TextField
            autoFocus
            margin="dense"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>إغلاق</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>

      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted
                    ? "line-through"
                    : "none",
                }}
              >
                {todo.title}
              </Typography>

              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>

            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={handleCheckClick}
                className="iconButton"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>

              <IconButton
                onClick={handleDeleteClick}
                className="iconButton"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ToastContainer />
    </>
  );
}
