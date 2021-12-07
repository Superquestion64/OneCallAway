import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { getCallLog } from "../../../actions/user";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";

const CallLog = () => {
  const dispatch = useDispatch();
  const callLog = useSelector(state => state.user.callLog);

  useEffect(() => {
    dispatch(getCallLog());
  }, [dispatch]);

  const renderCallMembers = names => {
    return names.map(name => (
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        </ListItem>
      </List>
    ));
  };

  const renderCallLog = callLog.map(call => (
    <Accordion
      sx={{
        width: "60vw"
      }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <p>{call.call_id}</p>
      </AccordionSummary>
      <AccordionDetails>{renderCallMembers(call.usernames)}</AccordionDetails>
    </Accordion>
  ));

  return <>{renderCallLog}</>;
};

export default CallLog;
