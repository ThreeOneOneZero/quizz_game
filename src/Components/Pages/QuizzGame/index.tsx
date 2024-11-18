import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Fade,
  CircularProgress,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import QuizzService from "../../../Services/QuizzService";
import { Question } from "../../../models/Question";

const QuizzGame: React.FC = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const quizzes = QuizzService.getAllQuizzes();
    const selectedQuizz = quizzes[Math.floor(Math.random() * quizzes.length)];
    setQuestions(selectedQuizz.questions);
  }, []);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleAnswerChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex].userAnswer = Number(
        event.target.value
      );
      setQuestions(updatedQuestions);
    },
    [currentQuestionIndex, questions]
  );

  const resetQuizz = useCallback(() => {
    // not working properly
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => ({
        ...question,
        userAnswer: undefined,
      }))
    );
    setCurrentQuestionIndex(0);
  }, []);

  const submitQuizz = useCallback(async () => {
    setSubmitting(true);
    try {
      console.log("Respostas enviadas:", questions);
      // To do: Send answers to the server and show results
      await resetQuizz();
    } catch (error) {
      console.error("Erro ao enviar respostas:", error);
    } finally {
      setSubmitting(false);
    }
  }, [questions, resetQuizz]);

  const handleNavigation = useCallback(
    (direction: "prev" | "next") => {
      if (direction === "prev" && currentQuestionIndex > 0) {
        setCurrentQuestionIndex((prev) => prev - 1);
      } else if (
        direction === "next" &&
        currentQuestionIndex < totalQuestions - 1
      ) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    },
    [currentQuestionIndex, totalQuestions]
  );

  const handleExit = useCallback(async () => {
    const hasAnswers = questions.some((q) => q.userAnswer !== undefined);

    if (hasAnswers) {
      const confirmed = window.confirm(
        "Tem certeza que deseja sair? Todo o progresso será perdido."
      );
      if (!confirmed) return;
    }

    await resetQuizz();
    navigate("/");
  }, [questions, resetQuizz, navigate]);

  useEffect(() => {
    return () => {
      resetQuizz();
    };
  }, [resetQuizz]);

  if (questions.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 15,
          mt: 15,
          mb: 15,
        }}
      >
        <CircularProgress sx={{ color: "var(--text-color)" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: { xs: 2, sm: 7 },
        paddingRight: { xs: 2, sm: 7 },
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        {/* Progresso */}
        <Box
          sx={{
            width: "100%",
            height: "4px",
            bgcolor: "var(--dark-blue-color)",
            borderRadius: "2px",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
              height: "100%",
              bgcolor: "var(--primary-color)",
              borderRadius: "2px",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </Box>

        {/* Header com navegação */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <IconButton
            onClick={() => handleNavigation("prev")}
            disabled={currentQuestionIndex === 0}
            sx={{
              color: "var(--text-weak-color)",
              "&:hover": {
                color: "var(--text-color)",
              },
              "&.Mui-disabled": {
                color: "transparent",
              },
            }}
            aria-label="Pergunta anterior"
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h6"
            component="h1"
            sx={{ color: "var(--text-color)" }}
          >
            {`Pergunta ${currentQuestionIndex + 1} de ${totalQuestions}`}
          </Typography>
          <IconButton
            onClick={() => handleNavigation("next")}
            disabled={submitting || currentQuestionIndex + 1 === totalQuestions}
            sx={{
              color: "var(--text-weak-color)",
              "&:hover": {
                color: "var(--text-color)",
              },
              "&.Mui-disabled": {
                color: "transparent",
              },
            }}
            aria-label={isLastQuestion ? "Finalizar quiz" : "Próxima pergunta"}
          >
            <ArrowForward />
          </IconButton>
        </Box>

        {/* Questão atual com animação */}
        <Fade in={true} key={currentQuestionIndex}>
          <Box>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                color: "var(--text-color)",
                mb: 3,
                textAlign: "center",
                padding: { xs: 1, sm: 2 },
              }}
            >
              {currentQuestion?.questionText}
            </Typography>

            {/* Opções de resposta */}
            <FormControl component="fieldset" sx={{ width: "100%" }}>
              <RadioGroup
                value={currentQuestion?.userAnswer?.toString() || ""}
                onChange={handleAnswerChange}
              >
                {currentQuestion?.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={index.toString()}
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          wordWrap: "break-word",
                          overflow: "auto",
                          textOverflow: "ellipsis",
                          width: "100%",
                          maxHeight: "4rem",
                          "&::-webkit-scrollbar": {
                            width: "6px",
                            height: "6px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            borderRadius: "3px",
                          },
                          "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            borderRadius: "3px",
                          },
                        }}
                      >
                        {option}
                      </Box>
                    }
                    disabled={submitting}
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        bgcolor: "var(--dark-blue-color)",
                        transform: "scale(1.05)",
                      },
                      ...(currentQuestion?.userAnswer === index && {
                        bgcolor: "var(--dark-blue-color)",
                        borderColor: "var(--text-color)",
                        color: "var(--text-color)",
                        transform: "scale(1.05)",
                      }),
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Fade>

        {/* Botões de navegação */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
            gap: 2,
          }}
        >
          <Button
            onClick={handleExit}
            variant="outlined"
            disabled={submitting}
            sx={{
              color: "var(--text-color)",
              fontWeight: "bold",
              bgcolor: "var(--error-color)",
              "&:hover": {
                borderColor: "var(--text-color)",
                bgcolor: "var(--error-weaker-color)",
              },
            }}
          >
            Sair
          </Button>
          <Button
            onClick={() =>
              isLastQuestion ? submitQuizz() : handleNavigation("next")
            }
            variant="contained"
            disabled={currentQuestion?.userAnswer === undefined || submitting}
            sx={{
              bgcolor: "var(--primary-color)",
              color: "var(--text-color)",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "var(--primary-weaker-color)",
              },
            }}
          >
            {submitting ? (
              <CircularProgress size={24} sx={{ color: "var(--text-color)" }} />
            ) : isLastQuestion ? (
              "Finalizar"
            ) : (
              "Próxima"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default QuizzGame;
