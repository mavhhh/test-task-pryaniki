import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const HOST = "https://test.v5.pryaniky.com";

type LoginResponse = {
  data: {
    token: string;
  };
  error_text: string;
};

type LoginPageProps = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const LoginPage: React.FC<LoginPageProps> = ({
  token,
  setToken,
}: LoginPageProps) => {
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
      const response = await axios.post<LoginResponse>(
        `${HOST}/ru/data/v3/testmethods/docs/login`,
        {
          username: user,
          password: password,
        }
      );
      console.log("response:", response);

      const errorText = response.data?.error_text;
      !!errorText && toast.error("Неверный логин или пароль!");

      const token = response.data?.data?.token;
      await setToken(token);
      navigate("/table");
    } catch (err) {
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
          Sign in
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
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
