import HomePage from "./sections/homepage.js";
import Schedules from "./sections/schedules.js";
import ChangePass from "./sections/ChangePass.js";
import Map from "./sections/Map.js";
import { SectionID } from "./data/data.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "./hooks/useToken.js";

function App() {
  const { token, setToken } = useToken();
  console.log("Token:", token);

  if (!token) {
    return <HomePage setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Schedules />} />
          <Route path={`/${SectionID.ChangePass}`} element={<ChangePass />} />
          <Route path={`/${SectionID.Map}`} element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
