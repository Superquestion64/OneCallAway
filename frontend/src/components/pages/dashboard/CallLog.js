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
import { Text } from "../../../styles/General.styled";

const CallLog = () => {
  const dispatch = useDispatch();
  const callLog = useSelector(state => state.user.callLog);

  useEffect(() => {
    dispatch(getCallLog());
  }, [dispatch]);

  const renderCallMembers = names => {
    return names.map(name => (
      <List key={name}>
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

  const renderCallLog = callLog.map(({ call_id, usernames }) => (
    <Accordion
      sx={{
        width: "60vw"
      }}
      key={call_id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <p>{call_id}</p>
      </AccordionSummary>
      <AccordionDetails>{renderCallMembers(usernames)}</AccordionDetails>
    </Accordion>
  ));

  return (
    <div style={{backgroundImage:"linear-gradient(#00ADB5, #AAD8D3)", width:"100%", height:"100vh"}}>
      {callLog.length ? (
        renderCallLog
      ) : (
        <Text fs="2rem">No calls made yet</Text>
      )}
    </div>
  );
};

export default CallLog;
