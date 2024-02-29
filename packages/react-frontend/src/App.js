import HomePage from "./sections/homepage.js";
import CreateAccount from "./sections/createAccount.js";
import Schedules from "./sections/schedules.js";
import ChangePass from "./sections/ChangePass.js";
import HomeChangePass from "./sections/homeChangePass.js";
import ForgotPassword from "./sections/forgotPassword.js";
import { SectionID } from "./data/data.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "./hooks/useToken.js";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <HomePage setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ForgotPassword />} />
          <Route
            path={`/${SectionID.CreateAccount}`}
            element={<CreateAccount />}
          />
          <Route path={`/${SectionID.ChangePass}`} element={<ChangePass />} />
          <Route
            path={`/${SectionID.ChangePass}`}
            element={<HomeChangePass />}
          />
          <Route
            path={`/${SectionID.ForgotPassword}`}
            element={<ForgotPassword />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
