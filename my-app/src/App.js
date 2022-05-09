import {useState} from "react";
import Filter from "./component/Filter";
import KanbanBoard from "./component/KanbanBoard";
import KanbanCard from "./component/KanbanCard";
import TitleText from "./component/TitleText";

// data dummy buat testing UI aja
const data = [
  {
    id: 1,
    title: "Bikin UI buat tugas",
    tag: ["Research"],
    priority: 5,
    date: "20/05/2022",
    member: ["Rafli", "Asep"],
    status: "Todo",
    description: "",
  },
  {
    id: 2,
    title: "Bikin Wireframe yang bagus",
    tag: ["Design", "Development"],
    priority: 8,
    date: "29/05/2022",
    member: ["Ilham"],
    status: "Review",
    description: "",
  },
  {
    id: 3,
    title: "Bikin website",
    tag: ["Development"],
    priority: 8,
    date: "29/05/2022",
    member: ["Ilham", "Kurniawan", "Kurniadi"],
    status: "In Progress",
    description: "",
  },
  {
    id: 4,
    title: "Bikin backend",
    tag: ["Development"],
    priority: 8,
    date: "30/05/2022",
    member: ["Ilham", "Kurniawan", "Kurniadi"],
    status: "In Progress",
    description: "",
  },
];

const tagList = ["Development", "Design", "Research", "Coordination", "Testing"];
const peopleList = ["Rafli", "Eka", "Kurniawan", "Asep"];

function App() {
  const [dataTask, setDataTask] = useState(data);

  const addTask = (newTitle) => {
    const newTask = {id: Date.now(), ...newTitle};
    setDataTask((oldTaskData) => [...oldTaskData, newTask]);
  };
  return (
    <>
      <TitleText />
      <Filter />
      <KanbanBoard
        dataTask={dataTask}
        setDataTask={setDataTask}
        addTask={addTask}
        tagList={tagList}
        peopleList={peopleList}
      />
      {/* code di bawah cuma buat cek datanya udah masuk atau belum */}
      {/* {dataTask.map((data) => (
        <KanbanCard item={data} key={data.id} />
      ))} */}
    </>
  );
}

export default App;
