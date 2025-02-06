import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "./pages/Login";
import { Characters } from "./pages/Characters";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/characters" element={<Characters />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
