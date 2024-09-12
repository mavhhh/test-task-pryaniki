import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/tokenSlice";
import { login } from "../api/auth";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!/^user\d+$/.test(user)) {
      toast.error("Неверный логин! Используйте: user{N}");
      return;
    }

    try {
      const response = await login({
        username: user,
        password: password,
      })
      
      const errorText = response.data?.error_text;
      if (errorText) {
        toast.error("Неверный логин или пароль!");
      } else {
        const newToken = response.data?.data?.token;
        await dispatch(setToken(newToken));
        navigate("/table");
      }
    } catch (err) {
      toast.error('Ошибка при входе!')
      console.log(err);
    }
  };

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user"
            label="User"
            name="user"
            autoComplete="username"
            autoFocus
            value={user}
            onChange={handleUserChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Войти
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
