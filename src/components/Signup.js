import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Box,
} from "@mui/material";

import { useNavigate, Link } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Myfirebase";

export default function Signup() {
  const navigate = useNavigate();

  const [rePwValid, setRePwValid] = useState(null); // 비밀번호 일치 여부
  const [existingEmail, setexistingEmail] = useState(""); // 이메일 이미 존재 메세지

  const [signUp, setsignUp] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    displayName: "",
  }); // 이메일, 비밀번호 , 비밀번호 확인, 닉네임 입력값

  // 이메일 및 비밀번호 input change 됐을 때
  const handleChange = (e) => {
    setsignUp({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  // 비밀번호 일치 불일치
  const rePwValidCheck = () => {
    if (signUp.password !== signUp.passwordCheck) {
      alert("비밀번호가 일치하지 않습니다");
      setRePwValid(false);
    } else {
      setRePwValid(true);
    }
  };

  // 회원가입을 클릭 시
  const onSignUp = async () => {
    rePwValidCheck();
    // 회원가입
    if (rePwValid && window.confirm("회원가입을 하시겠습니까?")) {
      createUserWithEmailAndPassword(auth, signUp.email, signUp.password)
        .then(async (userCredential) => {
          setexistingEmail(null);
          const user = userCredential.user;
          // 닉네임(displayName) 설정
          user.displayName = signUp.displayName;
          console.log(userCredential);
          alert("회원가입이 완료되었습니다");
          navigate("/signin");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setexistingEmail(errorMessage);
        });
    }
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
          회원가입
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                style={{ width: 500 }}
                required
                fullWidth
                id="id"
                label="이메일"
                name="email"
                autoComplete="id"
                size="small"
                value={signUp.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="new-password"
                size="small"
                value={signUp.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordCheck"
                label="비밀번호 확인"
                type="password"
                id="rePassword"
                size="small"
                value={signUp.passwordCheck}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                style={{ width: 500 }}
                required
                fullWidth
                id="nickName"
                label="닉네임"
                name="displayName"
                autoComplete="nickName"
                size="small"
                value={signUp.displayName}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {existingEmail && existingEmail}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onSignUp}
          >
            가입하기
          </Button>
        </Box>
        <Grid container>
          <Grid item>
            <Link style={{ marginLeft: 180 }} to="/signin">
              로그인
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
