import React from "react";

import {
  Btn,
  Container,
  Divider,
  FlexCentered,
  StyledLink,
  Title
} from "../../styles/General.styled";
import {
  Feature,
  FeatureList,
  Icon,
  LandingImage,
  LandingInner,
  Review,
  Reviewer,
  ReviewSection,
  Section,
  Stars,
  Subtitle
} from "./styles/Landing.styled";
import Navbar from "../general/Navbar";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Landing = () => {
  const { isAuthenticated } = useSelector(state => state.user);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container mh="100vh">
      <Navbar landing={true} />
      <LandingImage>
        <LandingInner>
          <FlexCentered>
            <Title>One Call Away</Title>
            <Subtitle>
              Connect with friends and families anytime, anywhere
            </Subtitle>
            <StyledLink to="/signup">
              <Btn
                hoverColor="rgba(237, 66, 100, 1)"
                br="1.8rem"
                fs="1.5rem"
                m="6rem 0 0 0"
                bgColor="rgba(237, 66, 100, 0.9)"
                p="0.8rem 1.5rem"
                boxShadowColor="#fff">
                Sign Up
              </Btn>
            </StyledLink>
          </FlexCentered>
        </LandingInner>
      </LandingImage>
      <Divider />
      <Section bgColor="#fffde7">
        <FlexCentered>
          <Title fs="2.5rem" margin="0 0 1rem 0" textDecoration="underline">
            Features
          </Title>
          <FeatureList name="features">
            <Feature>
              <Icon />
              Invite friends with a simple link
            </Feature>
            <Feature>
              <Icon />
              Chat with anyone - anywhere
            </Feature>
            <Feature>
              <Icon />
              All for FREE!
            </Feature>
          </FeatureList>
        </FlexCentered>
      </Section>
      <Divider />
      <Section bgColor="#dcedc8" mb="1.1rem">
        <Title fs="2.5rem" margin="1rem 0" textDecoration="underline">
          What our users are saying...
        </Title>
        <FlexCentered>
          <ReviewSection>
            <FlexCentered>
              <Stars>⭐ ⭐ ⭐ ⭐ ⭐</Stars>
              <Review>
                This site makes it crazy easy for me to hop in a call with my
                bros during a game. What a revolutionary product!
              </Review>
              <Reviewer>- John Doe</Reviewer>
            </FlexCentered>
          </ReviewSection>
        </FlexCentered>
      </Section>
    </Container>
  );
};

export default Landing;
