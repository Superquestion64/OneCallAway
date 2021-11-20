import React from "react";
import {
  SiteLogo,
  NavLinks,
  PhoneIcon,
  StyledNavbar
} from "./styles/Navbar.styled";
import { Btn, Flex, FlexItem, StyledLink } from "../../styles/General.styled";
import { Link } from "react-scroll";

// navRoutes = [{path, title}]
const Navbar = ({ navItems = [] }) => {
  const renderNavItems = navItems.map(navItem => {
    const { title, path } = navItem;
    if (title === "features") {
      return (
        <Link to={title} key={title} spy={true} smooth={true} duration={1000}>
          <Btn>{title}</Btn>
        </Link>
      );
    }
    return (
      <StyledLink to={path} key={title}>
        <Btn
          onClick={() =>
            typeof navItem.onClick === "function" ? navItem.onClick() : null
          }>
          {title}
        </Btn>
      </StyledLink>
    );
  });

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
          <Flex ai="center">{renderNavItems}</Flex>
        </NavLinks>
      </Flex>
    </StyledNavbar>
  );
};

export default Navbar;
