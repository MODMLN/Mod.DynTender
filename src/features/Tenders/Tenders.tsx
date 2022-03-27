import React from "react";
import styled from "styled-components";
import TendersList from "./TendersList";

const TendersContainer = styled.div``;
const TenderHeading = styled.h4``;

export default function Tenders  ()  {
  return (
    <TendersContainer>
      <TenderHeading><div>שלום אורח<div></div>רשימת המכרזים</div></TenderHeading>
      <TendersList />
    </TendersContainer>
  );
};