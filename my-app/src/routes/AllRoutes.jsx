import {Route, Routes} from "react-router-dom";
import Kanban from "../page/Kanban";
import LandingPage from "../page/LandingPage";
import NotFound from "../page/NotFound";
import ShowTask from "../page/ShowTask";

const AllRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/showtasks/:url" element={<ShowTask />} />
      <Route path="kanban" element={<Kanban />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoute;
