import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const BASE_URL = "http://localhost:8080/todos";
  const [todos, setTodos] = useState([]);
  const [newTodos, setNewTodos] = useState("");
  // console.log(newTodos);
  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => res)
      .then((data) => setTodos(data.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodos.trim()) return;
    axios
      .post(BASE_URL, { title: newTodos, completed: false })

      .then((res) => {
        setTodos([...todos, res.data]);
        e.target[0].value = "";
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/${id}`)
      .then((res) => setTodos(todos.filter((item) => item.id !== id)));
  };
  const handleChecker = (id) => {
    const todo = todos.find((item) => item.id === id);
    console.log(todo);
    axios
      .patch(`${BASE_URL}/${id}`, {
        ...todo,
        completed: !todo.completed,
      })
      .then((res) =>
        setTodos(
          todos.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                completed: !todo.completed,
              };
            }

            return todo;
          }),
        ),
      );
  };
  // console.log(todos);
  const count = todos.filter((todo) => !todo.completed).length;
  return (
    <>
      <div className="container mx-auto mt-8  max-w-screen-md bg-slate-100 p-4 shadow">
        <h1>Todo List {count}</h1>
        <form
          className="flex items-center justify-between"
          onSubmit={handleSubmit}
        >
          <input
            className="mr-4 w-full"
            type="text"
            placeholder="add new to do"
            onChange={(e) => {
              setNewTodos(e.target.value);
            }}
          />
          <button className="bg-blue-800 px-9 py-2 text-white" type="submit">
            Add
          </button>
        </form>

        {todos?.map((todo) => (
          <div className="mt-4 flex justify-between" key={todo.id}>
            <div className="flex w-full items-center">
              <input
                type="checkbox"
                id={`checkbox-${todo.id}`}
                checked={todo.completed}
                onChange={() => handleChecker(todo.id)}
              />
              <label
                className={`ml-4 block w-full text-xl hover:opacity-40 ${
                  todo.completed ? "text-neutral-500 line-through" : ""
                }`}
                htmlFor={`checkbox-${todo.id}`}
              >
                {todo.title}
              </label>
            </div>
            <button
              className="bg-red-800 px-9 py-2 text-white"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
