import React from "react";
import { setEditItem, toggleIsEditing } from "../../store/slices/TodoSlice";
import { AppDispatch } from "../../store/store";
import { formatDate } from "../../utils";
import EditTodo from "../EditTodo";

export interface TodoItemType {
  id: number;
  title: string;
  desc: string;
  status: "pending" | "doing" | "done";
  created_at: number;
  updated_at: number;
  due_date: number;
}

export interface TodoItemProps {
  item: TodoItemType;
  dispatch: AppDispatch;
}

const TodoItem = ({ item, dispatch }: TodoItemProps) => {
  const { id, title, due_date, desc } = item;

  const handleEdit = () => {
    dispatch(setEditItem(<EditTodo item={item} />));
    dispatch(toggleIsEditing());
  };

  return (
    //w-96
    <div className="w-full py-2 bg-gray-700 flex flex-row items-center rounded shadow-sm">
      <div className="p-3 h-full cursor-pointer border-r-2 border-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </div>
      <div className="px-3 flex flex-col h-full w-full">
        <div className="flex flex-row items-center justify-between">
          <p className="text-md md:text-lg font-bold">{title}</p>
          <p className="font-semibold">{formatDate(new Date(due_date))}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p className="font-medium w-32 xl:w-52  truncate">{desc}</p>
          <button onClick={handleEdit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
