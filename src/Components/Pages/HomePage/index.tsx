import { Box, Button, Skeleton } from "@mui/material";
import { useState } from "react";
import { PhotoAndTitleSkeleton } from "../../Loading/Skeleton/PhotoTitleSkeleton";
import UserService from "../../../Services/UserService";
import ProfessorHomeActions from "./ProfessorActions";
import { Role } from "../../../types/Role";
import StudentHomeActions from "./StudentActions";
import { ButtonSkeleton } from "../../Loading/Skeleton/ButtonsSkeleton";

//'https://jsonplaceholder.typicode.com/users'
const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {loading ? (
        <>
          <PhotoAndTitleSkeleton />
          <ButtonSkeleton fields={4} />
          <Skeleton
            width="100%"
            height={60}
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
        </>
      ) : (
        <Box>
          {UserService.isAuthorized(Role.Professor) && (
            <ProfessorHomeActions loading={loading} setLoading={setLoading} />
          )}
          {UserService.isAuthorized(Role.Student) && (
            <StudentHomeActions loading={loading} setLoading={setLoading} />
          )}
          <Button
            fullWidth
            onClick={() => {
              UserService.clearUser();
              window.location.reload();
            }}
            sx={{
              marginTop: 4,
              fontWeight: "bold",
            }}
          >
            Sair
          </Button>
        </Box>
      )}
    </>
  );
};

export default HomePage;
