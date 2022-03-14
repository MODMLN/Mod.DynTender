import React from "react";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Tenders from "./features/Tenders/Tenders";
import Tender from "./features/Tender/Tender";
import BidConfirm from "./features/TenderBidConfirm/BidConfirm";

const TenderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/Tenders"  element={<Tenders/>}/>
        <Route  path="/Tender/:id"  element={<Tender/>}/>
        <Route  path="/BidConfirm/:id"  element={<BidConfirm/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default TenderRoutes;
