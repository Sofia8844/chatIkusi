import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../App";          // tu página actual
import AppEditor from "../components/editorCanva/pageInit/AppCanva"; // la página del UI
import EditPage from "../components/editorCanva/editPage/EditPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editMenu" element={<AppEditor/>} />
         <Route path="/editPage" element={<EditPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
