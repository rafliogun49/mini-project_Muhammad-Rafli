import Filter from "./component/Filter";
import InputModal from "./component/InputModal";
import KanbanBoard from "./component/KanbanBoard";
import TitleText from "./component/TitleText";

function App() {
  return (
    <>
      <TitleText />
      <Filter />
      <KanbanBoard />
      <InputModal />
    </>
  );
}

export default App;
