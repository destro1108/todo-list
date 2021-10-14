import React, { useEffect, useState } from "react";
import { addTodo, toggleIsEditing } from "../store/slices/TodoSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { formatDate } from "../utils";
import { TodoItemType } from "./TodoListComponents/TodoItem";

const AddToDo = ({ status }: { status: TodoItemType["status"] }) => {
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState<TodoItemType>({
    id: 0,
    title: "",
    desc: "",
    status,
    created_at: 0,
    updated_at: 0,
    due_date: Date.now(),
  });
  // useEffect(() => {
  //   if (editItem) {
  //     const { id, title, desc, status, created_at, updated_at, due_date } =
  //       editItem;
  //     setTodo({
  //       id,
  //       title,
  //       desc,
  //       status,
  //       created_at,
  //       updated_at,
  //       due_date,
  //     });
  //     console.log(editItem.status);
  //     console.log(todo);
  //   }
  // }, [editItem, setTodo]);

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
    console.log(todo, now);
    setTodo((oldTodo) => ({
      ...oldTodo,
      id: now,
      created_at: now,
      updated_at: now,
    }));
    console.log(todo);

    dispatch(
      addTodo({ item: { ...todo, id: now, created_at: now, updated_at: now } })
    );
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
        <p className="text-2xl font-bold">Add New Todo</p>
      </div>
      <div className="">
        <div className="py-2">
          <p className="text-lg mx-1">Title</p>
          <input
            id="title"
            value={todo.title}
            type="text"
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
            value={formatDate(new Date(todo.due_date), 1)}
            onChange={handleChange}
            className="mx-1 px-3 py-2 w-full rounded-md bg-gray-600 text-gray-100 focus:outline-none date-picker"
            type="date"
          />
        </div>
      </div>
      <div className="flex flex-row justify-end py-3 items-end">
        <button
          onClick={handleSave}
          className="m-1 text-gray-100 py-2 px-4 rounded bg-blue-500 hover:bg-blue-700"
        >
          Save
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

export default AddToDo;
