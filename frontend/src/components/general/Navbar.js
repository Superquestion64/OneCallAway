import React from "react";
import {
  SiteLogo,
  NavLinks,
  PhoneIcon,
  StyledNavbar
} from "./styles/Navbar.styled";
import { Btn, Flex, FlexItem, StyledLink } from "../../styles/General.styled";
import { Link } from "react-scroll";
import { useSelector } from "react-redux";

// navRoutes = [{path, title}]
const Navbar = ({ navItems = [] }) => {
  const { isAuthenticated } = useSelector(state => state.user);

  const logoTo = isAuthenticated ? "/dashboard" : "/";
  const renderNavItems = navItems.map(navItem => {
    const { title, path } = navItem;
    if (title === "Features") {
      return (
        <Link to={title} key={title} spy={true} smooth={true} duration={1000}>
          <Btn c="#393E46" fs="1.7rem">{title}</Btn>
        </Link>
      );
    }
    return (
      <StyledLink to={path} key={title}>
        <Btn
          c="#393E46" 
          fs="1.7rem"
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
            <StyledLink c="#00ADB5" to={logoTo}>OCA</StyledLink>
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
