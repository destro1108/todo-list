import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodosAPI, saveTododsAPI } from "../../utils/fakeBackend";
import { TodoItemType } from "../../components/TodoItem";

type todoStateKey = {
  [key: string]: TodoItemType[];
};

export type todoStateType = todoStateKey & {
  pending: TodoItemType[];
  doing: TodoItemType[];
  done: TodoItemType[];
};

const initialState: todoStateType = {
  pending: [
    {
      id: 1232,
      title: "demo",
      desc: "demo_desc",
      created_at: Date.now(),
      updated_at: Date.now(),
      due_date: new Date(),
      status: "pending",
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
  ],
  doing: [
    {
      id: 1232,
      title: "demo",
      desc: "demo_desc",
      created_at: Date.now(),
      updated_at: Date.now(),
      due_date: new Date(),
      status: "done",
    },
  ],
  done: [
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
    {
      id: 1232,
      title: "demo",
      desc: "demo_desc",
      created_at: Date.now(),
      updated_at: Date.now(),
      due_date: new Date(),
      status: "done",
    },
  ],
};

export const getTodos = createAsyncThunk("todos/get", (_, thunkAPI) => {
  return getTodosAPI() as todoStateType;
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      let { item, startIndex }: { item: TodoItemType; startIndex: number } =
        action.payload;
      state[item.status].splice(startIndex || -1, 0, item);
      saveTododsAPI(state);
    },
    removeTodo: (state, action) => {
      let { id, status }: { id: number; status: "doing" | "done" | "pending" } =
        action.payload;
      state[status] = state[status].filter((item) => item.id !== id);
      saveTododsAPI(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.doing = [...action.payload.doing];
      state.done = [...action.payload.done];
      state.pending = [...action.payload.pending];
    });
  },
});

export default todoSlice.reducer;
