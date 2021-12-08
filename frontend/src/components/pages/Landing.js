import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Btn,
  Container,
  Divider,
  FlexCentered,
  StyledLink,
  Title
} from "../../styles/General.styled";
import Navbar from "../general/Navbar";
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
  Subtitle,
  Indent,
  Section2,
  SectionContainer
} from "./styles/Landing.styled";

const Landing = () => {  
  const { isAuthenticated } = useSelector(state => state.user);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const navItems = [
    {
      title: "Sign in",
      path: "/signin"
    }
  ];

  const genFeature = feature => {
    return (
      <Feature>
        <Icon />
        {feature}
      </Feature>
    );
  };
  return (
    <Container mh="100vh">
      <Navbar navItems={navItems} />
      <LandingImage>
        <LandingInner>
          <FlexCentered>
            <Title>One Call Away</Title>
            <Subtitle>
              Connect with friends and families anytime, anywhere
            </Subtitle>
			<StyledLink to="/signup">
              <Btn
                hoverColor="#3F0071"
                br="1.8rem"
                fs="2rem"
                m="3.5rem 0 0 0"
                bgColor="#3F0071"
                p="0.8rem 1.5rem"
                boxShadowColor="#fff">
                Sign Up
              </Btn>
            </StyledLink>
          </FlexCentered>
        </LandingInner>
      </LandingImage>
	  <Container 
	    bgColor = "#171010"
		c = "white"
		h = "30rem"
		p="5rem 0rem 2rem 0rem">
	  <Section2>
		<Indent>
		  <StyledLink to="/voice_call">
            <Btn
              hoverColor="#00ADB5"
              br="2rem"
              fs="3rem"
              m="2.5rem 5rem 0rem 15rem"
              bgColor="#00ADB5"
              p="2rem 3rem"
              boxShadowColor="#fff">
              Join a Call
            </Btn>
          </StyledLink>
		</Indent>
		<Indent bgColor = "#F0F8FF">
		  <Title fs="2.5rem" m="5rem 0">Or</Title>
		</Indent>
		<Indent bgColor = "#F0F8FF">
		  <StyledLink to="/chat">
            <Btn
              hoverColor="#B85252"
              br="1.8rem"
              fs="3rem"
              m="2.5rem 0rem 0rem 5rem"
              bgColor="#B85252"
              p="2rem 3rem"
              boxShadowColor="#fff">
              Chat with friends
            </Btn>
          </StyledLink>
		</Indent>
	  </Section2>
	  </Container>
      <Section bgColor="#fffde7">

        <FlexCentered>
          <Title fs="2.5rem" m="0 0 1rem 0">
            Features
          </Title>
          <FeatureList name="features">
            {genFeature("Invite friends with a simple link")}
            {genFeature("Chat with anyone - anywhere")}
            {genFeature("All for FREE!")}
          </FeatureList>
        </FlexCentered>
      </Section>
      <Divider />

      <Section bgColor="#dcedc8" mb="1.1rem">
        <Title fs="2.5rem" m="1rem 0">
          What our users are saying...
        </Title>
        <FlexCentered>
          <ReviewSection>
            <FlexCentered>
              <Stars>
                <span role="img" aria-label="star">
                  ⭐ ⭐ ⭐ ⭐ ⭐
                </span>
              </Stars>
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
