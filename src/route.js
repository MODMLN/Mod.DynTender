import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Tenders from "./features/Tenders/Tenders";
import Tender from "./features/Tender/Tender";

const TenderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/Tenders" element={<Tenders/>}/>
        <Route exact path="/Tender/:id" element={<Tender/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default TenderRoutes;
