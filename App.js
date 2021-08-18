import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [nameTodo, setNameTodo] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setTodoList(response.data);
    });
  }, []);

  const submit = () => {
    Axios.post("http://localhost:3001/api/post", {
      todoName: nameTodo,
      description: description,
      status: status,
    });
    setTodoList([
      ...todoList,
      {
        todoName: nameTodo,
        description: description,
        status: status,
      },
    ]);
  };

  const deleteTodo = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`).then((response) => {
      console.log("response, ", response);
    });
  };

  const onUpdate = (id, tus) => {
    Axios.put("http://localhost:3001/api/update", {
      id: id,
      status: tus,
    });
  };

  return (
    <div className="App">
      <h1>Crud App</h1>
      <div className="form">
        <label>Todo Name:</label>
        <input
          type="text"
          name="nameTodo"
          onChange={(e) => {
            setNameTodo(e.target.value);
          }}
        />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <label>Status:</label>
        <input
          type="text"
          name="status"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        />

        <button onClick={submit}>Submit</button>

        {todoList.map((val) => {
          return (
            <div className="card" key={val.id}>
              <h1>{val.nameTodo}</h1>
              <p>{val.description}</p>
              <p>{val.status}</p>

              <button
                onClick={() => {
                  deleteTodo(val.id);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  onUpdate(val.id, status);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
