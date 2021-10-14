import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  addTodo,
  setEditItem,
  toggleIsEditing,
} from "../store/slices/TodoSlice";
import { useAppDispatch } from "../store/store";
import AddToDo from "./AddToDo";
import TodoItem, { TodoItemType } from "./TodoItem";

export interface TodoListProps {
  status: "pending" | "doing" | "done";
  items: TodoItemType[];
}

const TodoList = ({ status, items }: TodoListProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full">
      <div className="border-b-2 border-gray-700 flex flex-row justify-between items-center">
        <p className="py-2 text-2xl font-semibold">{status.toUpperCase()}</p>
        <button
          className="h-full flex items-center "
          onClick={() => {
            let item: TodoItemType = {
              id: 0,
              title: "",
              desc: "",
              created_at: 0,
              updated_at: 0,
              due_date: Date.now(),
              status,
            };
            dispatch(setEditItem(<AddToDo status={status} />));
            dispatch(toggleIsEditing());
          }}
        >
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
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className="p-2 grid gap-4 border-2 border-dashed border-gray-700 border-t-0"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, inx) => (
              <Draggable
                key={item.id.toString()}
                draggableId={item.id.toString()}
                index={inx}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <TodoItem item={item} dispatch={dispatch} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
