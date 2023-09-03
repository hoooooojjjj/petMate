import React, { useState } from "react";

const SignUp = () => {
  const [signUp, setsignUp] = useState({
    userId: "",
    password: "",
  });

  const handleChange = (e) => {
    setsignUp({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="SignUp">
      <form>
        <input
          type="text"
          name="userId"
          value={signUp.userId}
          onChange={handleChange}
          placeholder="아이디"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={signUp.password}
          placeholder="비밀번호"
        />
        <button>회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
