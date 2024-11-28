import React, { Suspense } from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import ProtectedRoute from "./ProtectedRoute";
import { Role } from "../types/Role";
import {
  ButtonSeparetedSkeleton,
  ButtonSkeleton,
} from "../Components/Loading/Skeleton/ButtonsSkeleton";
import { PhotoAndTitleSkeleton } from "../Components/Loading/Skeleton/PhotoTitleSkeleton";
import CreateQuestion from "../Components/Pages/CreateQuestions";
import CreateClass from "../Components/Pages/CreateClasses";
import ManageClass from "../Components/Pages/ManageClass";

const LoginPage = React.lazy(() => import("../Components/Pages/Login"));
const HomePage = React.lazy(() => import("../Components/Pages/HomePage"));
const QuizzGame = React.lazy(() => import("../Components/Pages/QuizzGame"));
export const Routes = () => (
  <div
    style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Box
      sx={{
        bgcolor: "var(--lighter-blue-color)",
        borderRadius: 8,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      minWidth={380}
      maxWidth={480}
      margin={4}
      padding={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <PhotoAndTitleSkeleton />
            <ButtonSkeleton fields={2} />
            <ButtonSeparetedSkeleton fields={1} />
            <ButtonSkeleton fields={1} />
          </Box>
        }
      >
        <Switch>
          <Route path="/login" Component={LoginPage} />
          <Route
            path="/menu"
            element={
              <ProtectedRoute roles={[Role.Professor, Role.Student]}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quizz"
            element={
              <ProtectedRoute roles={[Role.Student]}>
                <QuizzGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question/create"
            element={
              <ProtectedRoute roles={[Role.Professor]}>
                <CreateQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class/create"
            element={
              <ProtectedRoute roles={[Role.Professor]}>
                <CreateClass />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage/class"
            element={
              <ProtectedRoute roles={[Role.Professor]}>
                <ManageClass />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Switch>
      </Suspense>
    </Box>
  </div>
);
