import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../App";          // tu página actual
import AppEditor from "../components/editorCanva/pageInit/AppCanva"; // la página del UI
import EditPage from "../components/editorCanva/editPage/EditPage";
import { DesignProvider } from "../providers/DesignProvider";
import { Outlet } from "react-router-dom";
const AppRoutes = () => {

  function EditorLayout(){
    return (
      <DesignProvider>
        <Outlet/>
      </DesignProvider>
    )
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<EditorLayout/>}>
            <Route path="/editMenu" element={<AppEditor/>} />
            <Route path="/editPage" element={<EditPage/>} />
         </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
