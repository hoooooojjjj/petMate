import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Avatar,
  Box,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Myfirebase";

export default function Signin() {
  const navigate = useNavigate();
  const [signUp, setsignUp] = useState({
    email: "",
    password: "",
  }); // 이메일, 비밀번호 입력값

  // 이메일 및 비밀번호 input change 됐을 때
  const handleChange = (e) => {
    setsignUp({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인
  const onSignIn = () => {
    signInWithEmailAndPassword(auth, signUp.email, signUp.password)
      .then((userCredential) => {
        // Signed in
        navigate("/MainPage");
      })
      .catch((error) => {});
  };

  // 구글 로그인
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/MainPage");
      })
      .catch((error) => {});
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          펫 메이트
        </Typography>
        <TextField
          margin="normal"
          label="아이디"
          required
          fullWidth
          name="email"
          autoFocus
          value={signUp.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="비밀번호"
          type="password"
          required
          fullWidth
          name="password"
          autoComplete="current-password"
          value={signUp.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={onSignIn}
          sx={{ mt: 3, mb: 2 }}
        >
          로그인
        </Button>
        <Button
          style={{ marginBottom: 20 }}
          type="submit"
          fullWidth
          variant="contained"
          onClick={googleSignIn}
        >
          구글로 로그인
        </Button>
        <Grid container>
          <Grid item>
            <Link style={{ marginLeft: 170 }} to="/signup">
              회원가입
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}