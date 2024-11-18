import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { PhotoAndTitleSkeleton } from "../../Loading/Skeleton/PhotoTitleSkeleton";
import useToast from "../../../hooks";
import AuthService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { localLogin } from "../../../Utils/localAuth_toDelete/localAuth";
import FieldsSkeleton from "../../Loading/Skeleton/FieldsSkeleton";

const LoginPage: React.FC = () => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const showToast = useToast();
  const navigate = useNavigate();

  // methods
  const handleLogin = async () => {
    setLoading(true);
    const response = await AuthService.login(email, password);
    setLoading(false);
    if (response) {
      showToast("Login successful!", "success");
      navigate("/menu");
    } else {
      const localSuccess = localLogin(email, password);
      if (localSuccess) {
        showToast("Login successful!", "success");
        navigate("/menu");
      } else {
        showToast("User not found!", "error");
      }
    }
  };

  // useEffect
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate("/menu");
    }
  }, [navigate]);

  useEffect(() => {
    setTimeout(() => {
      setLoadingSkeleton(false);
    }, 2000);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      {loadingSkeleton ? (
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          height="100%"
          paddingLeft={16}
          paddingRight={16}
          alignItems="center"
          justifyContent="center"
        >
          <PhotoAndTitleSkeleton />
          <FieldsSkeleton fields={4} />
          <Skeleton width="100%" height={60} sx={{ marginBottom: 0 }} />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              marginTop: 4,
              justifyContent: "space-between",
            }}
          >
            <Skeleton width="40%" height={80} />
            <Skeleton width="40%" height={80} />
          </Box>
        </Box>
      ) : (
        <>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight={"bold"}
            color={"var(--text-color)"}
          >
            Login
          </Typography>
          <TextField
            label="Email"
            type="email || number"
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

          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ marginTop: 2 }}
          >
            Esqueceu a senha?
          </Typography>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
            sx={{
              background: "var(--primary-color)",
              marginTop: 2,
              ":hover": { background: "var(--primary-weaker-color)" },
            }}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Loading..." : "Entrar"}
          </Button>
        </>
      )}
    </Box>
  );
};

export default LoginPage;
