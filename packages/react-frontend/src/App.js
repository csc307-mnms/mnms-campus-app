import HomePage from "./sections/homepage.js";
import ChangePass from "./sections/ChangePass.js";
import { SectionID } from "./data/data.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={`/${SectionID.HomePage}`} element={<HomePage />} />
        <Route path={`/${SectionID.ChangePass}`} element={<ChangePass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
