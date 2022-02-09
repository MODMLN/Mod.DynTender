import React from "react";

import "./App.css";
import TenderRoutes from "./route";
import SidebarRight from './Sidebar.tsx';

function App() {
  return (
    <div className="App">
      <SidebarRight />
      <TenderRoutes />
    </div>
  );
}

export default App;
