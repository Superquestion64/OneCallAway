import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { StyledFooter } from "./styles/Footer.styled";

const Footer = () => {
  return (
    <StyledFooter>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="#">
          One Call Away
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </StyledFooter>
  );
};

export default Footer;
