import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Stepper,
  Step as StepperStep,
  StepLabel,
  Button,
  Card,
} from "@mui/material";
import { Step } from "./Step";
import { steps, questions } from "../constants";
import { Question } from "./Question";

export default function FormComponent({ setFinishStatus }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(questions.map(() => null));

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === questions.length - 1;
  const isDisableToNext = answers[currentStep] === null;

  const saveAnswer = (answer, index) => {
    const updatedAnswer = answers.map((x, i) => (i === index ? answer : x));
    setAnswers(updatedAnswer);
  };

  const handleFinish = (e) => {
    let sum = 0;
    for (let i in answers) {
      sum += answers[i];
    }
    if (sum > 39) {
      setFinishStatus(true);
    } else {
      setFinishStatus(false);
    }
  };

  return (
    <Box
      className="mainbg"
      height={"100vh"}
      sx={{
        backgroundColor: "#6dc7e8",
      }}
    >
      <Box>
        <Box
          sx={{
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stepper
            sx={{
              mt: 1,
              color: "black",
              pt: 2,
            }}
            activeStep={currentStep}
            model={steps}
            alternativeLabel
          >
            {steps.map((label) => (
              <StepperStep
                key={label}
                sx={{ pl: { xs: 0.6, sm: "8px" }, pr: { xs: 0.5, sm: "8px" } }}
              >
                <StepLabel sx={{ color: "black" }}>{label}</StepLabel>
              </StepperStep>
            ))}
          </Stepper>
        </Box>
        <Box
          sx={{
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Card
            sx={{
              borderRadius: 4,
              ml: 4,
              pl: 4,
              pr: 4,
              mr: 4,
              pt: 2,
              width: "90%",

              bgcolor: "transparent",
              color: "black",
              height: "auto",
              boxShadow: "0 5px 15px rgba(0,0,0,.5)",
              position: "relative",
              zIndex: "1",
              "&:before": {
                position: "absolute",
                content: '""',
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                opacity: "0.3",
                background: "#fff",
                zIndex: "-1",
              },
            }}
          >
            {questions.map((question, index) => (
              <Step
                index={index}
                key={index}
                activeIndex={currentStep}
                component={
                  <Question
                    details={question}
                    answer={answers[index]}
                    setAnswer={(answer) => saveAnswer(answer, index)}
                  />
                }
              />
            ))}

            <Box sx={{ display: "flex", mt: 3, mb: 2 }}>
              <Button
                variant="contained"
                disabled={isFirstStep}
                onClick={() => setCurrentStep((previous) => previous - 1)}
              >
                Previous
              </Button>
              {isLastStep ? (
                <Link to="/result" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{ ml: "4px" }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleFinish(e)}
                  >
                    Finish
                  </Button>
                </Link>
              ) : (
                <Button
                  sx={{ ml: "4px" }}
                  variant="contained"
                  disabled={isDisableToNext}
                  color="primary"
                  onClick={() => setCurrentStep((previous) => previous + 1)}
                >
                  Next
                </Button>
              )}
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
