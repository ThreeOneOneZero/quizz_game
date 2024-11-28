import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Autocomplete,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { ClassService } from "../../../Services/ClassService";
import { type User } from "../../../models/User";
import { type Class } from "../../../models/Class";
import UserServiceInstance from "../../../Services/UserService";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CreateClass = () => {
  const navigate = useNavigate();

  const [className, setClassName] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<User[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const studentsData = await UserServiceInstance.getAllStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleCreateClass = async () => {
    if (!className || selectedStudents.length === 0) return;
    const userId = UserServiceInstance.getCurrentUser()?.id;
    if (!userId) return;
    const newClass: Class = {
      name: className,
      authorId: userId,
      students: selectedStudents,
    };

    try {
      await ClassService.createClass(newClass);
      // TODO NAVIGATE TO MENU
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2, minWidth: 450 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <IconButton
          onClick={() => navigate("/menu")}
          sx={{ color: "var(--text-weak-color)" }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={{ ml: 2, color: "var(--text-color)" }}>
          Criar Turma
        </Typography>
      </Box>

      <TextField
        fullWidth
        label="Nome da Turma"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        sx={{ mb: 1, bgcolor: "var(--light-blue-color)", borderRadius: 2 }}
      />

      <Autocomplete
        id="select-multiple-chip-id"
        fullWidth
        multiple
        value={selectedStudents}
        options={students}
        getOptionLabel={(option) => option.name}
        groupBy={(option) => option.name[0].toUpperCase()}
        disabled={loading}
        onChange={(event, newValue) => {
          setSelectedStudents(newValue as User[]);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Alunos"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        sx={{ marginTop: 2 }}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleCreateClass}
        disabled={!className || selectedStudents.length === 0 || loading}
        sx={{
          marginTop: 3,
          bgcolor: "var(--primary-color)",
          "&:hover": { bgcolor: "var(--primary-weaker-color)" },
        }}
      >
        Criar Turma
      </Button>
    </Box>
  );
};

export default CreateClass;
