import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import axios from "axios";

const HOST = "https://test.v5.pryaniky.com";

type LoginResponse = {
  data: {
    token: string;
  };
};

type LoginPageProps = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const LoginPage: React.FC<LoginPageProps> = ({
  token,
  setToken,
}: LoginPageProps) => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!/^user\d+$/.test(user)) {
      console.log("Логин должен быть в формате user{число}, например: user23");
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
      const token = response.data?.data?.token;
      setToken(token);
      console.log("response:", response?.data?.data);
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
