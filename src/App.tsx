import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "./pages/Login";
import { Characters } from "./pages/Characters";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
