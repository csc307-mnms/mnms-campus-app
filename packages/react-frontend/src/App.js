import Login from "./sections/Login.js";
import CreateAccount from "./sections/CreateAccount.js";
import ChangePass from "./sections/ChangePass.js";
import ForgotChangePass from "./sections/ForgotChangePass.js";
import ForgotPassword from "./sections/ForgotPassword.js";
import ProfilePage from "./sections/ProfilePage.js";
import Map from "./sections/Map.js";
import Schedules from "./sections/Schedules.js";
import NewSchedule from "./sections/NewSchedule.js";
import { SectionID } from "./data/data.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "./hooks/useToken.js";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          {/* Login Section */}
          <Route path={"/"} element={<Login setToken={setToken} />} />

          {/* Create Account Section */}
          <Route
            path={`/${SectionID.CreateAccount}`}
            element={<CreateAccount />}
          />
          <Route
            path={`/${SectionID.ForgotPassword}`}
            element={<ForgotPassword />}
          />
          <Route
            path={`/${SectionID.ForgotChangePass}`}
            element={<ForgotChangePass />}
          />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          {/* Root */}
          <Route path={"/"} element={<Schedules />} />

          {/* Schedules Section */}
          <Route path={`/${SectionID.Schedules}`} element={<Schedules />} />

          {/* New Schedule Section */}
          <Route path={`/${SectionID.NewSchedule}`} element={<NewSchedule />} />

          {/* Map Section */}
          <Route path={`/${SectionID.Map}`} element={<Map />} />

          {/* Change Password Sections */}
          <Route path={`/${SectionID.ChangePass}`} element={<ChangePass />} />
          <Route
            path={`/${SectionID.Profile}`}
            element={<ProfilePage token={token} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
