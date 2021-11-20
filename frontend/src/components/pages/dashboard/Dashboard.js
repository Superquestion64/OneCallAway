import React from "react";
import { Wrapper } from "../styles/Dashboard.styled";
import { Title, Flex } from "../../../styles/General.styled";
import CallLog from "./CallLog";

const Dashboard = () => {
  return (
    <Wrapper h="100vh" m="0">
      <Flex ai="center" fd="column">
        <Title margin="7rem 0" fs="5rem">
          Call Log
        </Title>
        <CallLog />
      </Flex>
    </Wrapper>
  );
};

export default Dashboard;
