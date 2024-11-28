import { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Typography,
  Modal,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import { ClassService } from "../../../Services/ClassService";
import { useNavigate } from "react-router-dom";
import { Class } from "../../../models/Class";
import UserServiceInstance from "../../../Services/UserService";
import { ArrowBack } from "@mui/icons-material";

const ManageClass: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      const currentUser = UserServiceInstance.getCurrentUser();
      const userClasses = await ClassService.getClassesByAuthorId(
        currentUser ? currentUser : undefined
      );
      setClasses(userClasses);
    };
    fetchClasses();
    setLoading(false);
  }, []);

  const handleManageStudents = () => {
    if (selectedClass) {
      navigate(`/class/manage/${selectedClass.name}`);
    }
  };

  const handleViewPerformance = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ padding: 2, width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ color: "var(--text-weak-color)" }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={{ color: "var(--text-color)" }}>
          Gerenciar Turma
        </Typography>
      </Box>
      <Autocomplete
        options={classes}
        fullWidth
        disabled={loading}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          setSelectedClass(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Selecione uma turma" />
        )}
      />
      {!selectedClass && (
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            fullWidth
            disabled={loading}
            onClick={handleManageStudents}
            sx={{ marginRight: 2, marginBottom: 2 }}
          >
            Gerenciar Alunos
          </Button>

          <Button
            fullWidth
            disabled={loading}
            variant="contained"
            onClick={handleViewPerformance}
          >
            Desempenho
          </Button>
        </Box>
      )}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            padding: 4,
            backgroundColor: "white",
            borderRadius: 2,
            maxWidth: 400,
            margin: "auto",
            marginTop: "20%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Relatório de Desempenho - {selectedClass?.name}
          </Typography>
          {/* Aqui você pode adicionar o conteúdo do relatório de desempenho */}
          <Button
            onClick={handleCloseModal}
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManageClass;
