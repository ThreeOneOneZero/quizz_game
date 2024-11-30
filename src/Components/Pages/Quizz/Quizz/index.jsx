import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import apiClient from "../../Services/apiClient";
import useToast from "../../hooks/toast";
import { ClassService } from "../../../../Services/ClassService";
import UserServiceInstance from "../../../../Services/UserService";

const QuizzSelection = () => {
  const navigate = useNavigate();
  const showToast = useToast();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("");

  useEffect(() => {
    const fetchClassesAndQuizzes = async () => {
      try {
        const user = await UserServiceInstance.getCurrentUser();
        const classes = await ClassService.getClassesByUserId(user.id);
        if (!classes) {
          showToast("Nenhuma turma encontrada", "warning");
          return;
        }
        setClasses(response.data.classes);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar turmas e quizzes:", error);
        showToast("Erro ao buscar turmas e quizzes", "error");
        setLoading(false);
      }
    };

    fetchClassesAndQuizzes();
  }, [navigate, showToast]);

  const handleClassChange = async (event) => {
    const classId = event.target.value;
    setSelectedClass(classId);
    setLoading(true);
    try {
      const response = await apiClient.get(`/quizzes/${classId}`);
      setQuizzes(response.data.quizzes);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar quizzes:", error);
      showToast("Erro ao buscar quizzes", "error");
      setLoading(false);
    }
  };

  const handleQuizChange = (event) => {
    setSelectedQuiz(event.target.value);
  };

  const handleStartQuiz = () => {
    if (selectedQuiz) {
      setCountdown(3);
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval);
            navigate(`/quizz/${selectedQuiz}`);
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } else {
      showToast("Selecione um quiz para iniciar", "warning");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      padding={3}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Selecione um Quiz
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel id="class-select-label">Selecione a Turma</InputLabel>
            <Select
              labelId="class-select-label"
              value={selectedClass}
              onChange={handleClassChange}
            >
              {classes.map((classItem) => (
                <MenuItem key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" disabled={!selectedClass}>
            <InputLabel id="quiz-select-label">Selecione o Quiz</InputLabel>
            <Select
              labelId="quiz-select-label"
              value={selectedQuiz}
              onChange={handleQuizChange}
            >
              {quizzes.map((quiz) => (
                <MenuItem key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartQuiz}
            disabled={!selectedQuiz}
            sx={{ marginTop: 2 }}
          >
            {countdown > 0 ? `Iniciando em ${countdown}...` : "Iniciar Quiz"}
          </Button>
        </>
      )}
    </Box>
  );
};

export default QuizzSelection;
