import { Button, Typography } from "@mui/material";
import {
  Forum,
  Group,
  LiveHelp,
  ManageAccounts,
  Summarize,
} from "@mui/icons-material";
import UserService from "../../../../Services/UserService";

interface ProfessorHomeActionsProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const ProfessorHomeActions: React.FC<ProfessorHomeActionsProps> = ({
  loading,
  setLoading,
}) => {
  const user = UserService.getCurrentUser();
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
        {`Olá, ${user?.role} ${user?.name} aaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`}
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
      >
        Criar Pergunta
      </Button>
      <Button
        fullWidth
        disabled={loading}
        startIcon={<ManageAccounts />}
        sx={{
          background: "var(--quaternary-color)",
          fontWeight: "bold",
          marginTop: 2,
          position: "relative",
          ":hover": { background: "var(--quaternary-weaker-color)" },
          ".MuiButton-startIcon": {
            position: "absolute",
            left: 8,
            marginLeft: 1,
          },
        }}
      >
        Gerenciar Alunos
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
      >
        Criar Turma
      </Button>

      <Button
        fullWidth
        disabled={loading}
        startIcon={<Summarize />}
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
      >
        Ver Desempenho
      </Button>
    </>
  );
};

export default ProfessorHomeActions;
