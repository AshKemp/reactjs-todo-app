/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react";
import classes from "./styles.module.css";
import TodoItem from "./components/todo-item";

function App() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

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

  useEffect(() => {
    fetchListOfTodos();
  }, []);
  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>Simple Todo App using Material UI</h1>
      <div className={classes.todoListWrapper}>
        {todos && todos.length > 0
          ? todos.map((todo, index) => <TodoItem todo={todo} key={index} />)
          : null}
      </div>
    </div>
  );
}

export default App;
