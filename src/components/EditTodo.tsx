import React, { useState } from "react";
import {
  addTodo,
  editTodo,
  removeTodo,
  toggleIsEditing,
} from "../store/slices/TodoSlice";
import { useAppDispatch } from "../store/store";
import { formatDate } from "../utils";
import { TodoItemType } from "./TodoListComponents/TodoItem";

const EditTodo = ({ item }: { item: TodoItemType }) => {
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState<TodoItemType>({ ...item });
  const [mode, setMode] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (e.target.type === "date") {
      setTodo({ ...todo, [e.target.id]: new Date(e.target.value).getTime() });
      return;
    }
    setTodo({ ...todo, [e.target.id]: e.target.value });
  };

  const handleSave = () => {
    if (todo.title === "") {
      alert("Please provide a title!");
      return;
    }
    if (todo.desc === "") {
      alert("Please provide a title!");
      return;
    }
    let now = Date.now();
    console.log(todo);
    setTodo({ ...todo, id: now, created_at: now, updated_at: now });

    if (todo.status === item.status) {
      dispatch(editTodo(todo));
    } else {
      dispatch(removeTodo({ id: todo.id, status: item.status }));
      dispatch(addTodo({ item: todo }));
    }
    setTodo({
      id: 0,
      title: "",
      desc: "",
      status: "pending",
      created_at: 0,
      updated_at: 0,
      due_date: Date.now(),
    });
    handleClose();
  };
  const handleClose = () => {
    dispatch(toggleIsEditing());
  };

  return (
    <div className="h-full">
      <div className="py-2 border-b-2 border-gray-600">
        <p className="text-2xl font-bold">Edit Todo</p>
      </div>
      <div className="">
        <div className="py-2">
          <p className="text-lg mx-1">Title</p>
          <input
            id="title"
            value={todo.title}
            type="text"
            disabled={!mode}
            onChange={handleChange}
            className={
              "mx-1 px-3 py-2 w-full rounded-md bg-gray-600 text-gray-100 focus:outline-none"
            }
          />
        </div>
        <div className="py-2">
          <p className="text-lg mx-1">Description</p>
          <textarea
            id="desc"
            value={todo.desc}
            disabled={!mode}
            onChange={handleChange}
            className={
              "mx-1 px-3 w-full py-3 rounded-md bg-gray-600 text-gray-100 focus:outline-none overflow-y-scroll hide-scroll"
            }
          />
        </div>
        <div className="py-2">
          <p className="text-lg mx-1">Status</p>
          <select
            id="status"
            value={todo.status}
            disabled={!mode}
            onChange={handleChange}
            className="mx-1 px-3 py-2 bg-gray-600 text-gray-100 block w-full focus:outline-none"
          >
            <option id="pending" value="pending">
              Pending
            </option>
            <option id="doing" value="doing">
              Doing
            </option>
            <option id="done" value="done">
              Done
            </option>
          </select>
        </div>
        <div className="py-2">
          <p className="text-lg mx-1">Due Date</p>
          <input
            id="due_date"
            disabled={!mode}
            value={formatDate(new Date(todo.due_date), 1)}
            onChange={handleChange}
            className="mx-1 px-3 py-2 w-full rounded-md bg-gray-600 text-gray-100 focus:outline-none date-picker"
            type="date"
          />
        </div>
      </div>
      <div className="flex flex-row justify-end py-4  items-end">
        <button
          onClick={mode ? handleSave : () => setMode(true)}
          className="m-1 text-gray-100 py-2 px-4 rounded bg-blue-500 hover:bg-blue-700"
        >
          {mode ? "Save" : "Edit"}
        </button>
        <button
          onClick={handleClose}
          className="m-1 text-gray-100 py-2 px-4 rounded bg-red-500 hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTodo;
