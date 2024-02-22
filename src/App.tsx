import { useState } from "react";

interface Todo {
  id: string;
  todo: string;
  completed: boolean;
}

function App() {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [userInput, setUserInput] = useState("");

  // adding todo state
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      id: crypto.randomUUID(),
      todo: userInput,
      completed: false,
    };
    setTodo((todo) => [...todo, userData]);
    setUserInput("");
  };

  // checking if checkbox is checked or not
  const handleChecked = (id: string) => {
    setTodo((todo) =>
      todo.map((todo) => {
        if (id === todo.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      })
    );
  };

  const handleDelete = (id: string) => {
    setTodo((todo) => todo.filter((todo) => todo.id!== id))
  };

  return (
    <div style={{ maxWidth: "800px", width: "100%", margin: "auto" }}>
      <h1>Todo list</h1>

      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />

        <button type="submit">submit</button>
      </form>

      <ul style={{ width: "300px", paddingLeft: "20px" }}>
        {todo.map((item) => (
          <li
            key={item.id}
            style={item.completed ? { textDecoration: "line-through" } : {}}
          >
            <input type="checkbox" onClick={() => handleChecked(item.id)} />
            {item.todo}

            <span
              style={{
                color: "red",
                display: "inline-block",
                paddingLeft: "100px",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(item.id)}
            >
              &#128465;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
