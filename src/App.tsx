import { useState } from "react";
import ReactModal from "./components/ReactModal";
import Footer from "./components/LayoutComponents/Footer";
import Header from "./components/LayoutComponents/Header";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-gray-800 text-gray-200 z-10">
      <Header />
      <ReactModal />
      <KanbanBoard />
      <Footer />
    </div>
  );
}

export default App;
