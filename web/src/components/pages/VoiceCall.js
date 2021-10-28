import React, { useEffect } from "react";
import {
  Btn,
  Container,
  FlexCentered,
  Title
} from "../../styles/General.styled";

const VoiceCall = () => {
  useEffect(() => {
    if (!localStorage.getItem("firstLoad")) {
      localStorage["firstLoad"] = true;
      window.location.reload();
    } else {
      localStorage.removeItem("firstLoad");
    }
  }, []);
  return (
    <Container
      c="#fff"
      mh="100vh"
      bg='linear-gradient(rgba(0, 0, 0, 0.5), rgba(67, 67, 67, 0.5)), url("https://images.unsplash.com/photo-1598257006458-087169a1f08d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80") no-repeat center center/cover'>
      <FlexCentered h="90vh">
        <Title>Make a Call</Title>
        <Btn
          hoverColor="#FF0000"
          br="1.8rem"
          fs="1.6rem"
          m="6rem 0 0 0"
          bgColor="#950101"
          p=".9rem 1.5rem"
          boxShadowColor="#fff">
          Button 1
        </Btn>
        <Btn
          hoverColor="#D8E9A8"
          br="1.8rem"
          fs="1.6rem"
          m="6rem 0 0 0"
          bgColor="#4E9F3D"
          p=".9rem 1.5rem"
          boxShadowColor="#fff">
          Button 2
        </Btn>
      </FlexCentered>
    </Container>
  );
};

export default VoiceCall;
