import React,{useState} from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Typography, TextField, FormControlLabel, Checkbox,
  Button, Grid, Container, Box } from '@mui/material';

import { useNavigate,Link  } from "react-router-dom";
export default function Signup() {

  const [idValid, setIdValid] = useState(true);
  const [validIdMsg, setValidIdMsg] = useState("");
  const navigate = useNavigate();

  //가입하기 버튼을 눌렀을 때 발생하는 로직입니다.
  const register = () => {
    //회원가입 조건 체크
    
    //이동
    navigate("/signin");
  }
  const idValidCheck = () => {
    const idCheck = true; // 중복 데이터 가져오기
    if (idCheck) {
      setIdValid(true);
      setValidIdMsg("사용가능한 아이디 입니다.");
    } else {
      setIdValid(false);
      setValidIdMsg("이미 사용중인 아이디 입니다.");
    }
  };

  const [pwValid, setPwValid] = useState(true);
  const [validPwMsg, setValidPwMsg] = useState("");

  const pwValidCheck = () => {
    const pwCheck = true; // 비밀번호 유효성
    if (pwCheck) {
      setPwValid(true);
      setValidPwMsg("")
    } else {
      setPwValid(false);
      setValidPwMsg("8~16자 영문자, 숫자 조합을 사용하세요.")
    }
  };

  const [rePwValid, setRePwValid] = useState(true);
  const [validRePwMsg, setValidRePwMsg] = useState("");

  const rePwValidCheck = () => {
    const rePwCheck = true; // 비밀번호 일치
    if (rePwCheck) {
      setRePwValid(true);
      setValidRePwMsg("비밀번호가 일치합니다.")
    } else {
      setRePwValid(false);
      setValidRePwMsg("비밀번호가 일치하지 않습니다.")
    }
  };


  const [nickValid, setNickValid] = useState(true);
  const [nickValidMsg, setNickValidMsg] = useState("");

  const nickValidCheck = () => {
    const nickCheck = true; // 중복 데이터 가져오기
    if (nickCheck) {
      setNickValid(true);
      setNickValidMsg("사용가능한 닉네임 입니다.");
    } else {
      setNickValid(false);
      setNickValidMsg("이미 사용중인 닉네임 입니다.");
    }
  };

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
                size="small"
                error={!idValid}
                helperText={validIdMsg} />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                fullWidth
                onClick={idValidCheck}>
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
                size="small"
                error={!pwValid}
                helperText={validPwMsg} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="rePassword"
                label="비밀번호 확인"
                type="rePassword"
                id="rePassword"
                size="small"
                error={!rePwValid}
                helperText={validRePwMsg} />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                id="nickName"
                label="닉네임"
                name="nickName"
                autoComplete="nickName"
                size="small"
                error={!nickValid}
                helperText={nickValidMsg} />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                fullWidth
                onClick={nickValidCheck}>
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
            onClick ={register}
            sx={{ mt: 3, mb: 2 }}>
            가입하기
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
