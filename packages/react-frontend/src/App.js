import Login from "./sections/Login.js";
import CreateAccount from "./sections/CreateAccount.js";
import ChangePass from "./sections/ChangePass.js";
import ForgotChangePass from "./sections/ForgotChangePass.js";
import Map from "./sections/Map.js";
import Schedules from "./sections/Schedules.js";
import { SectionID } from "./data/data.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "./hooks/useToken.js";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Schedules />} />
          <Route
            path={`/${SectionID.CreateAccount}`}
            element={<CreateAccount />}
          />
          <Route path={`/${SectionID.ChangePass}`} element={<ChangePass />} />
          <Route path={`/${SectionID.Map}`} element={<Map />} />
          <Route
            path={`/${SectionID.ForgotChangePass}`}
            element={<ForgotChangePass />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
