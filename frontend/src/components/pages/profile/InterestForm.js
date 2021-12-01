import { Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateInterests } from "../../../actions/profile";
import {
  Btn,
  Container,
  Flex,
  FlexCentered,
  StyledForm,
  TextField,
  Title,
  FlexItem
} from "../../../styles/General.styled";

const InterestForm = () => {
  const dispatch = useDispatch();
  const [interests, setInterest] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  // renders all of the user's interest
  const renderInterests = interests.map((interest, i) => {
    return (
      <TextField key={i} label={interest} disabled={true} name={interest} />
    );
  });

  const addInterest = () => {
    if (!currentInput) return;
    setInterest([...interests, currentInput]);
    setCurrentInput("");
  };

  const handleInput = e => {
    setCurrentInput(e.target.value);
  };
  return (
    <Container p="10rem 4rem" mh="100vh" bgColor="#D3E4CD">
      <FlexCentered bgColor="#F2DDC1" h="75vh" br="2rem">
        <Formik
          initialValues={interests}
          novalidate
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dispatch(updateInterests(interests));
              setSubmitting(false);
            }, 1500);
          }}>
          {({ values, errors, isSubmitting }) => (
            <FlexCentered m="4rem 0 0 0">
              <Title fs="3rem">Interests</Title>
              <StyledForm noValidate>
                <Flex fd="column" ai="center">
                  <FlexItem>
                    {renderInterests}
                    <TextField
                      label="Add interest"
                      name="interest"
                      onChange={handleInput}
                      value={currentInput}
                      InputLabelProps={{ required: false }}
                    />
                  </FlexItem>
                  <Flex fd="column" ai="center">
                    <Btn
                      hoverColor="#99A799"
                      fs="1.6rem"
                      m="2rem 0 0 0"
                      bgColor="#99A799"
                      p="0.8rem 1.5rem"
                      boxShadowColor="#fff"
                      variant="contained"
                      onClick={addInterest}
                      type="button">
                      Add Interest
                    </Btn>
                    <Btn
                      hoverColor="#E2C2B9"
                      fs="1.6rem"
                      m="2rem 0 0 0"
                      bgColor="#E2C2B9"
                      p="0.8rem 1.5rem"
                      boxShadowColor="#fff"
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}>
                      Save Change
                    </Btn>
                  </Flex>
                </Flex>
              </StyledForm>
            </FlexCentered>
          )}
        </Formik>
      </FlexCentered>
    </Container>
  );
};

export default InterestForm;
