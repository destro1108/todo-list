import { useState } from "react";
import ReactModal from "./components/ReactModal";
import Footer from "./components/LayoutComponents/Footer";
import Header from "./components/LayoutComponents/Header";
import KanbanBoard from "./components/TodoListComponents/KanbanBoard";
import { useAppDispatch } from "./store/store";
import { clearTodos, loadDemoTodos } from "./store/slices/TodoSlice";

function App() {
  const dispatch = useAppDispatch();
  const handleLoadDemo = () => {
    dispatch(loadDemoTodos());
  };
  const handleClearTodos = () => {
    dispatch(clearTodos());
  };
  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-gray-800 text-gray-200 z-10">
      <Header />
      <ReactModal />
      <div className="">
        <button
          onClick={handleLoadDemo}
          className="m-3 text-gray-100 py-2 px-4 rounded bg-blue-500 hover:bg-blue-700"
        >
          Load Demo Items
        </button>
        <button
          onClick={handleClearTodos}
          className="m-3 text-gray-100 py-2 px-4 rounded bg-red-500 hover:bg-red-700"
        >
          Clear Todos
        </button>
      </div>
      <KanbanBoard />
      <Footer />
    </div>
  );
}

export default App;
