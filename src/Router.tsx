import { Routes, Route } from "react-router-dom";
import List from "./pages/List";
import Upload from "./pages/Upload";
import NotFound from "./pages/404";

export default function AppRouter() {
  return (
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}