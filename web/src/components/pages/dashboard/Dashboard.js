import React from "react";
import { Wrapper } from "../styles/Dashboard.styled";
import { Btn, FlexCentered } from "../../../styles/General.styled";
import Navbar from "../../general/Navbar";
import CallLog from "./CallLog";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navItems = [
    {
      title: "sign out",
      path: "/"
    }
  ];
  const user = useSelector(state => state.user);
  console.log(user)
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
        <CallLog />
      </FlexCentered>
    </Wrapper>
  );
};

export default Dashboard;
