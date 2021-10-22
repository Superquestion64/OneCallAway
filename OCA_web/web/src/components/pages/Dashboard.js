import React from "react";
import { Wrapper } from "./styles/Dashboard.styled";
import { Btn, FlexCentered } from "../../styles/General.styled";
import Navbar from "../general/Navbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Dashboard = () => {
  return (
    <Wrapper mh="100vh">
      <Navbar />
      <Btn
        m="3rem 0 0 2rem"
        bgColor="#440A67"
        hoverBgColor="rgba(147, 50, 158, 0.5)"
        p="2.5rem 1.2rem"
        br="2rem">
        Make a call
      </Btn>
      <FlexCentered m="2rem 0 0 0">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <p>Accordion 1</p>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <p>Accordion 2</p>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetails>
        </Accordion>
      </FlexCentered>
    </Wrapper>
  );
};

export default Dashboard;
