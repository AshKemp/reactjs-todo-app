/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react";
import classes from "./styles.module.css";
import TodoItem from "./components/todo-item";
import TodoDetails from "./components/todo-details";
import { Skeleton } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [todoDetails, setTodoDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  async function fetchListOfTodos() {
    try {
      setLoading(true);
      const apiResponse = await fetch("https://dummyjson.com/todos");
      const result = await apiResponse.json();
      console.log(result);
      if (result?.todos && result?.todos.length > 0) {
        setTodos(result?.todos);
        setLoading(false);
        setErrorMessage("");
      } else {
        setTodos([]);
        setLoading(false);
        setErrorMessage("");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Some error occurred");
    }
  }

  async function fetchDetailsOfCurrentTodo(getCurrentTodoId) {
    console.log(getCurrentTodoId);
    try {
      const response = await fetch(
        `https://dummyjson.com/todos/${getCurrentTodoId}`
      );
      const resultDetails = await response.json();
      if (resultDetails) {
        setTodoDetails(resultDetails);
        setOpenDialog(true);
      } else {
        setTodoDetails(null);
        setOpenDialog(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchListOfTodos();
  }, []);

  if (loading) {
    return <Skeleton variant="rectangular" width={650} height={650} />;
  }
  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>Simple Todo App using Material UI</h1>
      <div className={classes.todoListWrapper}>
        {todos && todos.length > 0
          ? todos.map((todo, index) => (
              <TodoItem
                todo={todo}
                key={index}
                fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
              />
            ))
          : null}
      </div>
      <TodoDetails
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        todoDetails={todoDetails}
        setTodoDetails={setTodoDetails}
      />
    </div>
  );
}

export default App;
