import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SnippetApp from "./pages/SnippetApp.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<SnippetApp />} />
    </Routes>
  );
}
