import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useToast from "../../../hooks/toast";
import AuthService from "../../../Services/AuthService";
import { Role } from "../../../types/Role";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const showToast = useToast();
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>(Role.Student);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const success = await AuthService.login(email, password);
      if (success) {
        navigate("/menu");
      } else {
        showToast("Login falhou. Verifique suas credenciais.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Ocorreu um erro. Tente novamente.", "error");
    }
    setLoading(false);
  };

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const success = await AuthService.register(email, password, name, role);
      if (success) {
        setIsLogin(true);
        showToast(
          "Registro realizado com sucesso! Faça login para continuar.",
          "success"
        );
      } else {
        showToast("Registro falhou. Tente novamente.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Ocorreu um erro. Tente novamente.", "error");
    }
    setLoading(false);
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      onSubmit={isLogin ? handleSubmit : handleRegisterSubmit}
    >
      <>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          fontWeight={"bold"}
          color={"var(--text-color)"}
        >
          {isLogin ? "Login" : "Registro"}
        </Typography>
        {!isLogin && (
          <TextField
            label="Nome"
            type="text"
            required
            fullWidth
            value={name}
            disabled={loading}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        )}
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          required
          fullWidth
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        {!isLogin && (
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="role-label">Tipo de Usuário</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              label="Tipo de Usuário"
              onChange={(e) => setRole(e.target.value as Role)}
              disabled={loading}
            >
              <MenuItem value={Role.Student}>Estudante</MenuItem>
              <MenuItem value={Role.Professor}>Professor</MenuItem>
            </Select>
          </FormControl>
        )}
        {isLogin && (
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ marginTop: 2 }}
          >
            Esqueceu a senha?
          </Typography>
        )}
        <Button
          type="button"
          variant="text"
          fullWidth
          onClick={() => setIsLogin(!isLogin)}
          disabled={loading}
          sx={{
            marginTop: 2,
            fontWeight: "bold",
            bgcolor: "transparent",
            color: "var(--text-color)",
            ":hover": { color: "var(--text-color)" },
          }}
        >
          {isLogin
            ? "Não tem uma conta? Registre-se"
            : "Já tem uma conta? Faça login"}
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            background: "var(--primary-color)",
            marginTop: 2,
            fontWeight: "bold",
            ":hover": { background: "var(--primary-weaker-color)" },
          }}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? "Loading..." : isLogin ? "Entrar" : "Registrar"}
        </Button>
      </>
    </Box>
  );
};

export default LoginPage;
