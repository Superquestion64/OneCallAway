import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "styled-components";
import LandingBg from "../../../images/LandingBg2.jpg";

// Main landing
export const LandingImage = styled.div`
  background-color: ${({ theme }) => theme.bg.landing};
  width: 100%;
  height: 60rem;
  overflow: hidden;
  background: -webkit-linear-gradient(rgba(0, 0, 0, 0.2), rgba(67, 67, 67, 0.2)),
    url("${LandingBg}") no-repeat center center/cover;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(67, 67, 67, 0.2)),
    url("${LandingBg}") no-repeat center center/cover;
`;

export const LandingInner = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  margin-top: -1rem;
`;

export const Subtitle = styled.div`
  margin-top: 1.3rem;
  font-size: 1.5rem;
`;

// Section
export const Section = styled.div`
  height: 20rem;
  width: 100%;
  padding: 1rem;
  background-color: ${({ bgColor }) => bgColor || "#fff"};
  margin-bottom: ${({ mb }) => mb || ""};
`;

//Button Section

export const Section2 = styled.div`
  height: 80%;
  width: 50%;
  margin-left: 10%;
  text-align: center;
  background-color: #393E46;
  border: solid;
  border-color: #AAD8D3;
  border-radius: 6rem;
`;

// Features
export const FeatureList = styled.ul`
  list-style: none;
`;

export const Feature = styled.li`
  font-size: 1.2rem;
  cursor: pointer;
  padding: 1rem 0rem;
`;

export const Icon = styled(ArrowForwardIosIcon)`
  filter: invert(61%) sepia(12%) saturate(540%) hue-rotate(330deg)
    brightness(89%) contrast(88%);
  height: 100%;
  width: auto;
  transform: scale(0.8);
  margin-bottom: -0.3rem;
`;


// Used for spacing the buttons
export const Indent = styled.div`
  float: left;
  height: 150px;
  margin-left: 6rem;
  margin-top: 3rem;
`;



// Review section
export const ReviewSection = styled.div`
  height: 12rem;
  background-color: #393E46;
  padding: 0 3rem;
  width: 60%;
  margin-top: -3rem;
`;

export const Stars = styled.h5`
  letter-spacing: 0.1rem;
`;

export const Review = styled.div`
  text-align: center;
  color: "#EEEEEE"
`;

export const Reviewer = styled.h5`
  color: "#e0e0e0";
  text-decoration: none;
`;
