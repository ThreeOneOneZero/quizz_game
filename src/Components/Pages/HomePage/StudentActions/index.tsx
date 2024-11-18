import { Button, Typography } from "@mui/material";
import { Forum, Summarize } from "@mui/icons-material";
import UserService from "../../../../Services/UserService";
import { useNavigate } from "react-router-dom";

interface StudentHomeActionsProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const StudentHomeActions: React.FC<StudentHomeActionsProps> = ({
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
        onClick={() => {
          setLoading(true);
          navigate("/quizz");
        }}
      >
        Responder Quizz
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
        Desempenho
      </Button>
    </>
  );
};
export default StudentHomeActions;
