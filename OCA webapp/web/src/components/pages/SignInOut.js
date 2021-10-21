import React, { useState } from "react";
import {
  Container,
  Flex,
  FlexItem,
  FlexCentered,
  Title,
  StyledLink
} from "../styles/general/General.styled";
import {
  Image,
  TextField,
  SignBtn,
  StyledForm
} from "../styles/SignInOut.styled";
import Navbar from "./general/Navbar";
import { Formik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import {
  registerationSchema,
  loginSchema
} from "./schema_validation/schemaValidation";

const SignInOut = ({ location }) => {
  const { pathname } = location;

  const signUpInitVals = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  };

  const signInInitVals = {
    email: "",
    password: ""
  };
  const initialValues =
    pathname === "/signup" ? signUpInitVals : signInInitVals;

  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  return (
    <>
      <Navbar />
      <Container
        p="10rem 4rem"
        mh="100vh"
        bgColor="rgba(224, 247, 250, 0.8)"
        h="60%">
        <Flex bgColor="#f3e5f5" h="75vh" br="6rem">
          <FlexItem fg="1" h="75vh">
            <Image pathname={pathname === "/signup" ? true : false} />
          </FlexItem>
          <FlexItem
            w="75%"
            m={pathname === "/signup" ? "4rem 0 0 0" : "8rem 0 0 0"}>
            <FlexCentered>
              <Formik
                initialValues={initialValues}
                validationSchema={
                  pathname === "signup" ? registerationSchema : loginSchema
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setTimeout(() => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 1000);
                    resetForm();
                  }, 1500);
                }}>
                {({ values, errors, isSubmitting }) => (
                  <>
                    <Title fs="3rem">
                      {pathname === "/signup" ? "Sign Up" : "Sign In"}
                    </Title>
                    <StyledForm>
                      <Flex fd="column" ai="center">
                        {pathname === "/signup" ? (
                          <TextField
                            label="Username"
                            name="username"
                            type="input"
                          />
                        ) : null}
                        <TextField
                          label="Email Address"
                          name="email"
                          type="email"
                        />
                        <TextField
                          name="password"
                          label="Password"
                          type={showPw ? "text" : "password"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPw(!showPw)}>
                                  {showPw ? (
                                    <VisibilityOffIcon />
                                  ) : (
                                    <VisibilityIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                        {pathname === "/signup" ? (
                          <TextField
                            id="passwordConfirm"
                            name="passwordConfirm"
                            label="Confirm Password"
                            type={showConfirmPw ? "text" : "password"}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowConfirmPw(!showConfirmPw)
                                    }>
                                    {showConfirmPw ? (
                                      <VisibilityOffIcon />
                                    ) : (
                                      <VisibilityIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                          />
                        ) : null}
                        <FlexItem h="auto">
                          {pathname === "/signup" ? (
                            <>
                              Already have an account?{" "}
                              <StyledLink to="/signin">Sign In</StyledLink>
                            </>
                          ) : (
                            <>
                              New to One Call Away?{" "}
                              <StyledLink to="/signup">Sign Up</StyledLink>
                            </>
                          )}
                        </FlexItem>
                        <SignBtn
                          m="2rem 0 0 0"
                          type="submit"
                          variant="contained"
                          disabled={isSubmitting}>
                          {pathname === "/signup" ? "Sign Up" : "Sign In"}
                        </SignBtn>
                        {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                      </Flex>
                    </StyledForm>
                  </>
                )}
              </Formik>
            </FlexCentered>
          </FlexItem>
        </Flex>
      </Container>
    </>
  );
};

export default SignInOut;
