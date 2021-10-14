import { TodoItemType } from "../components/TodoListComponents/TodoItem";
import { todoStateType } from "../store/slices/TodoSlice";

const storageKey = "TODOS";

export const getTodosAPI = () => {
  let todosStr = localStorage.getItem(storageKey);
  return todosStr
    ? JSON.parse(todosStr)
    : {
        pending: [],
        doing: [],
        done: [],
      };
};

export const saveTododsAPI = (todos: todoStateType["todoItems"]) => {
  let todosStr = JSON.stringify(todos);
  localStorage.setItem(storageKey, todosStr);
};
