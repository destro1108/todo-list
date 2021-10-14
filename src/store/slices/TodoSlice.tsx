import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodosAPI, saveTododsAPI } from "../../utils/fakeBackend";
import { TodoItemType } from "../../components/TodoListComponents/TodoItem";
import React from "react";
import { getDemoTasksAPI } from "../../utils";

type todoStateKey = {};

export type todoStateType = todoStateKey & {
  isEditing: boolean;
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
  todoItems: {
    pending: [],
    doing: [],
    done: [],
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
    loadDemoTodos: (state) => {
      state.todoItems = getDemoTasksAPI();
    },
    clearTodos: (state) => {
      state.todoItems = { pending: [], doing: [], done: [] };
      saveTododsAPI(state.todoItems);
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
  loadDemoTodos,
  clearTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
