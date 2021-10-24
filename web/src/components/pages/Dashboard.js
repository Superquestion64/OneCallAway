import React from "react";
import { Wrapper } from "./styles/Dashboard.styled";
import { Btn, FlexCentered } from "../../styles/General.styled";
import Navbar from "../general/Navbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Dashboard = () => {
  const oneDayAgo = new Date(new Date().setDate(new Date().getDate() - 1));
  const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2));
  const navItems = [
    {
      title: "sign out",
      path: "/"
    }
  ];

  return (
    <Wrapper mh="100vh">
      <Navbar navItems={navItems} />
      <Btn
        m="3rem 0 0 2rem"
        bgColor="#440A67"
        hoverBgColor="rgba(147, 50, 158, 0.5)"
        p="2.5rem 1.2rem"
        br="2rem">
        Make a call
      </Btn>
      <FlexCentered m="2rem 0 0 0">
        <Accordion
          sx={{
            width: "60vw"
          }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <p>{oneDayAgo.toLocaleString()}</p>
          </AccordionSummary>
          <AccordionDetails>
            <p>Call details</p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            width: "60vw"
          }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <p>{twoDaysAgo.toLocaleString()}</p>
          </AccordionSummary>
          <AccordionDetails>
            <p>Call details</p>
          </AccordionDetails>
        </Accordion>
      </FlexCentered>
    </Wrapper>
  );
};

export default Dashboard;
