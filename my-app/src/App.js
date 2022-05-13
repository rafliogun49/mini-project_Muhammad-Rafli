import {Route, Routes} from "react-router-dom";
import Kanban from "./page/Kanban";
import LandingPage from "./page/LandingPage";
import ShowTask from "./page/ShowTask";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/showtasks/:url" element={<ShowTask />} />
        <Route path="kanban" element={<Kanban />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
