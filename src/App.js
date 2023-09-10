import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WritePage from "./components/WritePage.js";
import Signin from "./components/Signin.js";
import Signup from "./components/Signup.js";
import MainPage from "./components/MainPage.js";
import NotFound from "./components/NotFound.js";
import "./App.css";
import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Myfirebase.js";
function App() {
  // 사용자 정보(=> props로 전달하면 user.displayName(유저 닉네임), user.uid(유저 토큰) 등을 가져갈 수 있음)
  const [user, setuser] = useState(null);
  // 사용자가 로그인 되어있는지 아닌지(=>props으로 전달하면 로그인 됐을때 안됐을 때 구분가능)
  const [isLogin, setisLogin] = useState(false);

  // 컴포넌트가 마운트(첫 렌더링)됐을 때 사용자가 로그인되어 있는지 확인
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser((args) => user);
        console.log(user); // -> 로그인 되어 있는 유저에 대한 정보가 들어있음(user.displayName => 유저 닉네임)
        setisLogin(true); // 로그인됨.
      } else {
        setisLogin(false); // 로그인 안됨.
      }
    });
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage user = {user} isLogin ={isLogin}/>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/MainPage"  element={<MainPage user = {user} isLogin ={isLogin}/>} />
        <Route path="/WritePage" element={<WritePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;