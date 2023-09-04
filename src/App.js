import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InsertForm from "./components/WriteForm.js";
import Signin from "./components/Signin.js";
import Signup from "./components/Signup.js";
import MainPage from "./components/MainPage.js";
import NotFound from "./components/NotFound.js";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/InsertForm" element={<InsertForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
