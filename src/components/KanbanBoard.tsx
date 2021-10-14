import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import TodoItem, { TodoItemType } from "./TodoItem";
import TodoList from "./TodoList";
import { DragDropContext } from "react-beautiful-dnd";
import {
  addTodo,
  editTodo,
  fetchTodo,
  removeTodo,
} from "../store/slices/TodoSlice";

const KanbanBoard = () => {
  const { todoItems, tempItem } = useAppSelector((state) => state.todos);
  console.log(todoItems);
  const dispatch = useAppDispatch();

  return (
    <div className="grid grid-flow-row grid- md:grid-flow-col  gap-0 md:gap-x-10 w-10/12 md:w-9/12 pt-6 flex-1">
      <DragDropContext
        onDragEnd={(result, provided) => {
          if (!result.destination) {
            return;
          }
          console.log(result);
          const { source, destination } = result;
          if (
            (source.droppableId === "pending" ||
              source.droppableId === "doing" ||
              source.droppableId === "done") &&
            (destination.droppableId === "pending" ||
              destination.droppableId === "doing" ||
              destination.droppableId === "done")
          ) {
            let id = parseInt(result.draggableId);
            let item = todoItems[source.droppableId].find((it) => it.id === id);
            dispatch(
              removeTodo({
                id,
                status: source.droppableId,
              })
            );
            if (item) {
              let newItem: TodoItemType = {
                ...item,
                status: destination.droppableId,
              };
              dispatch(
                addTodo({ item: newItem, startIndex: destination.index })
              );
            }
          }
        }}
      >
        {Object.keys(todoItems).map((status) => {
          if (status === "pending" || status === "doing" || status === "done")
            return (
              <TodoList
                key={status}
                status={status}
                items={todoItems[status]}
              />
            );
        })}
      </DragDropContext>
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
