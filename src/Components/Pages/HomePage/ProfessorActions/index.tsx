import { Button, Typography } from "@mui/material";
import { Forum, Group, LiveHelp, ManageAccounts } from "@mui/icons-material";
import UserService from "../../../../Services/UserService";
import { useNavigate } from "react-router-dom";

interface ProfessorHomeActionsProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const ProfessorHomeActions: React.FC<ProfessorHomeActionsProps> = ({
  loading,
  setLoading,
}) => {
  const user = UserService.getCurrentUser();
  const navigate = useNavigate();
  return (
    <>
      <Typography
        gutterBottom
        padding={2}
        variant="h5"
        component="h1"
        fontWeight={"bold"}
        color={"var(--text-color)"}
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
          maxWidth: { sm: "450px", xs: "70vw" },
          textAlign: "center",
        }}
      >
        {`Olá, ${user?.role} ${user?.name}`}
      </Typography>

      <Button
        fullWidth
        disabled={loading}
        startIcon={<Forum />}
        sx={{
          background: "var(--primary-color)",
          fontWeight: "bold",
          marginTop: 2,
          position: "relative",
          ":hover": { background: "var(--primary-weaker-color)" },
          ".MuiButton-startIcon": {
            position: "absolute",
            left: 8,
            marginLeft: 1,
          },
        }}
      >
        Criar Quizz
      </Button>
      <Button
        fullWidth
        disabled={loading}
        startIcon={<LiveHelp />}
        sx={{
          background: "var(--secondary-color)",
          fontWeight: "bold",
          marginTop: 2,
          position: "relative",
          ":hover": { background: "var(--secondary-weaker-color)" },
          ".MuiButton-startIcon": {
            position: "absolute",
            left: 8,
            marginLeft: 1,
          },
        }}
        onClick={() => {
          setLoading(true);
          navigate("/question/create");
          setLoading(false);
        }}
      >
        Criar Pergunta
      </Button>
      <Button
        fullWidth
        disabled={loading}
        startIcon={<Group />}
        sx={{
          background: "var(--quinary-color)",
          fontWeight: "bold",
          marginTop: 2,
          position: "relative",
          ":hover": { background: "var(--quinary-weaker-color)" },
          ".MuiButton-startIcon": {
            position: "absolute",
            left: 8,
            marginLeft: 1,
          },
        }}
        onClick={() => {
          setLoading(true);
          navigate("/class/create");
          setLoading(false);
        }}
      >
        Criar Turma
      </Button>

      <Button
        fullWidth
        disabled={loading}
        startIcon={<ManageAccounts />}
        sx={{
          background: "var(--tertiary-color)",
          fontWeight: "bold",
          marginTop: 2,
          position: "relative",
          ":hover": { background: "var(--tertiary-weaker-color)" },
          ".MuiButton-startIcon": {
            position: "absolute",
            left: 8,
            marginLeft: 1,
          },
        }}
        onClick={() => {
          setLoading(true);
          navigate("/manage/class");
          setLoading(false);
        }}
      >
        Gerenciar Turma(s)
      </Button>
    </>
  );
};

export default ProfessorHomeActions;
