import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <div className="h-screen flex flex-col items-center w-full bg-gray-800 text-gray-200">
      <Header />
      <KanbanBoard />
      <Footer />
    </div>
  );
}

export default App;
