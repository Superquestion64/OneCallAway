import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, getProfile } from "../../../actions/profile";
import { profileSchema } from "../../../schema_validation/schemaValidation";
import {
  Btn,
  Container,
  Flex,
  FlexCentered,
  StyledForm,
  TextField,
  Title
} from "../../../styles/General.styled";

const initialValues = {
  email: "",
  password: ""
};

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [showPw, setShowPw] = useState(false);
  const profile = useSelector(state => state.profile.profile);
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <Container p="10rem 4rem" mh="100vh" bgColor="#600ADB5">
      <FlexCentered bgColor="#AAD8D3" h="75vh" br="2rem">
        <Formik
          initialValues={initialValues}
          validationSchema={profileSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              dispatch(updateProfile(values));
              resetForm();
              setSubmitting(false);
            }, 1500);
          }}>
          {({ values, errors, isSubmitting }) => (
            <FlexCentered m="8rem 0 0 0">
              <Title fs="3rem">Edit Profile</Title>
              <StyledForm>
                <Flex fd="column" ai="center">
                  <TextField label={profile.email} name="email" type="email" />
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
                  <Btn
                    hoverColor="#EEEEEE"
                    br="1.8rem"
                    fs="1.6rem"
                    m="6rem 0 0 0"
                    bgColor="#00ADB5"
                    p="0.8rem 1.5rem"
                    boxShadowColor="#393E46"
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}>
                    Update Profile
                  </Btn>
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                </Flex>
              </StyledForm>
            </FlexCentered>
          )}
        </Formik>
      </FlexCentered>
    </Container>
  );
};

export default ProfileForm;
