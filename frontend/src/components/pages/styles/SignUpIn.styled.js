import styled from "styled-components";

import SignInBg from "../../../images/SignInBg.jpeg";
import SignUpBg from "../../../images/SignUpBg.jpeg";

export const Image = styled.div`
  background: ${({ pathname }) =>
    `url("${
      pathname === true ? SignUpBg : SignInBg
    }") no-repeat center center/cover;`};
  height: 75vh;
  width: 100%;
  border-radius: 6rem 0 0 6rem;
`;

export const SignBtn = styled.button`
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  color: ${({ c }) => c || "#fff"};
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor || "#00ADB5"};
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857rem;
  text-transform: uppercase;
  padding: 6px 16px;
  border-radius: 0.3rem;
  user-select: none;
  vertical-align: middle;
  outline: 0;
  border: 0;
  margin: ${({ m }) => m || "0"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  width: 70%;

  &:hover {
    background-color: rgba(233, 30, 99, 0.6);
  }
`;
