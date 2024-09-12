import React from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setToken } from "../redux/slices/token";

export const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.token);

  const handleSignOut = () => {
    dispatch(setToken(""));
  };

  if (!token) {
    return <></>;
  }

  return (
    <Box sx={{ marginRight: "1rem", height: "4rem", display: "flex", alignItems: "center", position: "fixed", top: 0, right: 0 }}>
      <Button onClick={handleSignOut} variant="outlined" color="error">
        Выйти
      </Button>
    </Box>
  );
};
