import React from "react";
import TodoItem, { TodoItemType } from "./TodoItem";

export interface TodoListProps {
  status: string;
  items: TodoItemType[];
}

const TodoList = ({ status, items }: TodoListProps) => {
  return (
    <div className="">
      <div className=" border-b-2 border-gray-700 flex flex-row justify-between items-center">
        <p className="py-2 text-2xl font-semibold">{status.toUpperCase()}</p>
        <button className="h-full flex items-center ">
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
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>
      </div>
      <div className="py-2 grid gap-4">
        {items.map((item, inx) => (
          <TodoItem item={item} key={inx} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
