import PageHeader from "./components/PageHeader.js";
import Button from "./components/Button.js";
import NavBar from "./components/NavBar.js";
import { SectionID } from "./data/data.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <PageHeader text="Login" />
      <p className="text-red-500">Hello World</p>
      <Button
        text="Sign In"
        onClick={() => {
          window.location.href = `#${SectionID.Schedules}`;
        }}
        className="bg-[#003831] text-white font-bold py-1 px-32 rounded"
      />
      <NavBar activePage="schedules" />
    </div>
  );
}

export default App;
