import React from "react";
import {
  SiteLogo,
  NavLinks,
  PhoneIcon,
  StyledNavbar
} from "./styles/Navbar.styled";
import { Btn, Flex, FlexItem, StyledLink } from "../../styles/General.styled";

import { Link } from "react-scroll";

const Navbar = ({ landing }) => {
  return (
    <StyledNavbar>
      <Flex ai="center">
        <PhoneIcon />
        <FlexItem fg="1">
          <SiteLogo>
            <StyledLink to="/">OCA</StyledLink>
          </SiteLogo>
        </FlexItem>
        <NavLinks>
          <Flex ai="center">
            {landing ? (
              <Link to="features" spy={true} smooth={true} duration={1000}>
                <Btn>Features</Btn>
              </Link>
            ) : null}

            <Btn>Get Chrome Extension</Btn>
            <StyledLink to="/signin">
              <Btn>Sign In</Btn>
            </StyledLink>
          </Flex>
        </NavLinks>
      </Flex>
    </StyledNavbar>
  );
};

export default Navbar;
