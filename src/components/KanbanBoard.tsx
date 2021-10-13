import React from "react";
import { useAppSelector } from "../store/store";
import TodoItem, { TodoItemType } from "./TodoItem";
import TodoList from "./TodoList";

const KanbanBoard = () => {
  const todos = useAppSelector((state) => state.todos);
  console.log(todos);

  return (
    <div className="flex flex-row justify-around w-9/12 py-6">
      {Object.keys(todos).map((status) => (
        <TodoList key={status} status={status} items={todos[status]} />
      ))}
      {/* <TodoList
        status="done"
        items={[
          {
            id: 1232,
            title: "demo",
            desc: "demo_desc",
            created_at: Date.now(),
            updated_at: Date.now(),
            due_date: new Date(),
            status: "done",
          },
          {
            id: 1232,
            title: "demo",
            desc: "demo_desc",
            created_at: Date.now(),
            updated_at: Date.now(),
            due_date: new Date(),
            status: "done",
          },
        ]}
      /> */}
    </div>
  );
};

export default KanbanBoard;
