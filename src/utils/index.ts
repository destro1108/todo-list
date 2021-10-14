import { todoStateType } from "../store/slices/TodoSlice";

export const formatDate = (date: Date, format: number = 0) => {
  return format
    ? date.toLocaleDateString("en-CA")
    : date.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      });
  //`${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
};

export const getDemoTasksAPI = (): todoStateType["todoItems"] => {
  return {
    pending: [
      {
        id: 1200,
        title: "Example 1",
        desc: "Example 1 Description",
        created_at: Date.now(),
        updated_at: Date.now(),
        due_date: Date.now(),
        status: "pending",
      },
      {
        id: 1201,
        title: "Example 2",
        desc: "Example 2 Description",
        created_at: Date.now(),
        updated_at: Date.now(),
        due_date: Date.now(),
        status: "done",
      },
    ],
    doing: [
      {
        id: 1202,
        title: "Example 3",
        desc: "Example 3 Description",
        created_at: Date.now(),
        updated_at: Date.now(),
        due_date: Date.now(),
        status: "done",
      },
    ],
    done: [
      {
        id: 1203,
        title: "Example 4",
        desc: "Example 4 Description",
        created_at: Date.now(),
        updated_at: Date.now(),
        due_date: Date.now(),
        status: "done",
      },
      {
        id: 1204,
        title: "Example 5",
        desc: "Example 5 Description",
        created_at: Date.now(),
        updated_at: Date.now(),
        due_date: Date.now(),
        status: "done",
      },
      {
        id: 1205,
        title: "Example 6",
        desc: "Example 6 Description",
        created_at: Date.now(),
        updated_at: Date.now(),
        due_date: Date.now(),
        status: "done",
      },
    ],
  };
};
