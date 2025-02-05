import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
