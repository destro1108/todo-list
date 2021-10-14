import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodosAPI, saveTododsAPI } from "../../utils/fakeBackend";
import { TodoItemType } from "../../components/TodoItem";
import React from "react";

type todoStateKey = {};

export type todoStateType = todoStateKey & {
  isEditing: boolean;
  tempItem: null | TodoItemType;
  editItem: null | React.Component;
  todoItems: {
    [key: string]: TodoItemType[];
    pending: TodoItemType[];
    doing: TodoItemType[];
    done: TodoItemType[];
  };
};

const initialState: todoStateType = {
  isEditing: false,
  editItem: null,
  tempItem: null,
  todoItems: {
    pending: [
      {
        id: 1200,
        title: "demo",
        desc: "demo_desc",
        created_at: Date.now(),
        updated_at: Date.now(),
        due_date: Date.now(),
        status: "pending",
      },
      {
        id: 1201,
        title: "demo",
        desc: "demo_desc",
        created_at: Date.now(),
        updated_at: Date.now(),
        due_date: Date.now(),
        status: "done",
      },
    ],
    doing: [
      {
        id: 1202,
        title: "demo",
        desc: "demo_desc",
        created_at: Date.now(),
        updated_at: Date.now(),
        due_date: Date.now(),
        status: "done",
      },
    ],
    done: [
      {
        id: 1203,
        title: "demo",
        desc: "demo_desc",
        created_at: Date.now(),
        updated_at: Date.now(),
        due_date: Date.now(),
        status: "done",
      },
      {
        id: 1204,
        title: "demo",
        desc: "demo_desc",
        created_at: Date.now(),
        updated_at: Date.now(),
        due_date: Date.now(),
        status: "done",
      },
      {
        id: 1205,
        title: "demo",
        desc: "demo_desc",
        created_at: Date.now(),
        updated_at: Date.now(),
        due_date: Date.now(),
        status: "done",
      },
    ],
  },
};

export const getTodos = createAsyncThunk("todos/get", (_, thunkAPI) => {
  return getTodosAPI();
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleIsEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
    setEditItem: (state, action) => {
      state.editItem = action.payload;
    },
    addTodo: (
      state,
      action: { payload: { item: TodoItemType; startIndex?: number } }
    ) => {
      let { item, startIndex } = action.payload;
      if (startIndex)
        state.todoItems[item.status].splice(startIndex || -1, 0, item);
      else state.todoItems[item.status].push(item);
      saveTododsAPI(state.todoItems);
    },
    removeTodo: (
      state,
      action: { payload: { id: number; status: "doing" | "done" | "pending" } }
    ) => {
      let { id, status } = action.payload;
      state.todoItems[status] = state.todoItems[status].filter(
        (item) => item.id !== id
      );
      saveTododsAPI(state.todoItems);
    },
    editTodo: (state, action: { payload: TodoItemType }) => {
      let item = action.payload;
      let inx = state.todoItems[item.status].findIndex(
        (it) => it.id === item.id
      );
      state.todoItems[item.status][inx] = { ...item };
    },
    fetchTodo: (
      state,
      action: { payload: { id: number; status: TodoItemType["status"] } }
    ) => {
      let { id, status } = action.payload;
      let item = state.todoItems[status].find((it) => it.id === id);
      console.log(item?.title);
      if (item) state.tempItem = item;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todoItems.doing = [...action.payload.doing];
      state.todoItems.done = [...action.payload.done];
      state.todoItems.pending = [...action.payload.pending];
    });
  },
});

export const {
  addTodo,
  removeTodo,
  toggleIsEditing,
  setEditItem,
  editTodo,
  fetchTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
