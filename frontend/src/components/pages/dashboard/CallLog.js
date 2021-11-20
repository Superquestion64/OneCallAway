import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CallLog = () => {
  const oneDayAgo = new Date(new Date().setDate(new Date().getDate() - 1));
  const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2));

  return (
    <>
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
    </>
  );
};

export default CallLog;
