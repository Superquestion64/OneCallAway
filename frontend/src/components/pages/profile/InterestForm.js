import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInterests, getInterests } from "../../../actions/profile";
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
  const interestsList = useSelector(state => state.profile.interests);
  const [interests, setInterests] = useState([]);
  const [currentInput, setCurrentInput] = useState("");

  useEffect(() => {
    dispatch(getInterests());
  }, [dispatch]);

  useEffect(() => {
    if (interestsList && interestsList.length) {
      setInterests(interestsList);
    }
  }, [interestsList]);

  // renders all of the user's interest
  const renderInterests = interests.map((interest, i) => {
    return (
      <TextField
        key={i}
        label={interest}
        InputLabelProps={{ required: false }}
        disabled={true}
        name={interest}
      />
    );
  });

  const addInterest = () => {
    if (!currentInput) return;
    setInterests([...interests, currentInput]);
    setCurrentInput("");
  };

  const handleInput = e => {
    setCurrentInput(e.target.value);
  };
  return (
    <Container p="10rem 4rem" mh="100vh" bgColor="#00ADB5">
      <FlexCentered bgColor="#AAD8D3" h="75vh" br="2rem">
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
                      hoverColor="#EEEEEE"
                      fs="1.6rem"
                      m="2rem 0 0 0"
                      bgColor="#00ADB5"
                      p="0.8rem 1.5rem"
                      boxShadowColor="#393E46"
                      variant="contained"
                      onClick={addInterest}
                      type="button">
                      Add Interest
                    </Btn>
                    <Btn
                      hoverColor="#EEEEEE"
                      fs="1.6rem"
                      m="2rem 0 0 0"
                      bgColor="#00ADB5"
                      p="0.8rem 1.5rem"
                      boxShadowColor="#393E46"
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
