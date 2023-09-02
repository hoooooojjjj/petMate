import React from 'react';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Signup() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" >
          회원가입
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                id="id"
                label="아이디"
                name="id"
                autoComplete="id"
                size="small" />
            </Grid>
            <Grid item xs={4}>
              <Button 
              variant="outlined"
              fullWidth>
                중복확인
              </Button>
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
                size="small" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordCheck"
                label="비밀번호 확인"
                type="passwordCheck"
                id="passwordCheck"
                size="small" />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                id="nickName"
                label="닉네임"
                name="nickName"
                autoComplete="nickName"
                size="small" />
            </Grid>
            <Grid item xs={4}>
              <Button 
              variant="outlined"
              fullWidth>
                중복확인
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                label="이름"
                name="name"
                autoComplete="name"
                size="small" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="birthDate"
                label="생년월일"
                name="birthDate"
                autoComplete="birthDate"
                size="small" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phoneNumber"
                label="휴대전화번호"
                name="phoneNumber"
                autoComplete="phoneNumber"
                size="small" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowPersonal" color="primary" />}
                  label="(선택) 개인정보 수집 동의"
                />
              </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            가입하기
          </Button>
        </Box>
      </Box>
    </Container>
  );
}