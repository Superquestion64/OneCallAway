import styled from "styled-components";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";

export const StyledNavbar = styled.div`
  height: 4rem;
  background-image: linear-gradient(
    -225deg,
    #AAD8D3 0%,
    #00ADB5 100%
  );
`;

export const PhoneIcon = styled(PhoneEnabledIcon)`
  transform: scale(1.8);
  margin: 0 1.5rem;
  filter: invert(61%) sepia(7%) saturate(907%) hue-rotate(330deg)
    brightness(90%) contrast(84%);
`;

export const SiteLogo = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  flex-grow: 1;
  /* color: #b3e5fc; */

  background: -webkit-linear-gradient(#393E46 0%, #393E46 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`;

export const NavLinks = styled.div`
  font-size: 2rem;
`;
