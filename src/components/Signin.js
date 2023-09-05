import React from "react";
import { TextField, Checkbox, Button, FormControlLabel, Grid,
  Typography, Avatar, Box, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate,Link  } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const login = () => {
    //로그인 로직이 필요합니다.

    navigate("/MainPage");
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }} >
        <Avatar
          sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
          name="id"
          autoFocus />
        <TextField
          margin="normal"
          label="비밀번호"
          type="password"
          required
          fullWidth
          name="password"
          autoComplete="current-password" />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="아이디 저장" />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={login}
          sx={{ mt: 3, mb: 2 }} >
          로그인
        </Button>
        <Grid container>
          <Grid item xs>
            <Link>비밀번호 찾기</Link>
          </Grid>
          <Grid item>
            <Link to="/signup">회원가입</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}