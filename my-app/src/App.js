import {useState} from "react";
import Filter from "./component/Filter";
import InputModal from "./component/InputModal";
import KanbanBoard from "./component/KanbanBoard";
import TitleText from "./component/TitleText";

const data = [
  {
    id: 1,
    title: "Bikin UI buat tugas",
    tag: ["Research"],
    priority: 5,
    date: "20/05/2022",
    member: ["Rafli", "Asep"],
    status: "todo",
  },
  {
    id: 2,
    title: "Bikin Wireframe yang bagus",
    tag: ["Design", "Development"],
    priority: 5,
    date: "29/05/2022",
    member: ["Ilham"],
    status: "todo",
  },
];

function App() {
  const [dataTask, setDataTask] = useState(data);
  return (
    <>
      <TitleText />
      <Filter />
      <KanbanBoard dataTask={dataTask} setDataTask={setDataTask} />
    </>
  );
}

export default App;
