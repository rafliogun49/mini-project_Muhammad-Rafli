import {Divider, Tooltip} from "antd";
import KanbanCard from "./KanbanCard";
import NewTask from "./NewTask";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useEffect, useState} from "react";
import {DoubleRightOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

//ngambilin data berdasarkan kolomnya
const KanbanBoard = ({
  dataTask,
  addTask,
  updateTask,
  deleteTask,
  updateTags,
  updatePeoples,
  loadingAddTask,
  loadingDeleteTask,
  updateStatusTask,
  uniquePeopleList,
  getTagList,
  addingPeople,
  loadingUpdateCard,
  loadingUpdateStatus,
}) => {
  const [columns, setColumns] = useState({});
  // bagian items di variabel columnsKanban ini ga mau update data setiap ada perubahan di dataTask
  useEffect(() => {
    const columnsKanban = {
      todo: {name: "Todo", items: dataTask?.filter((data) => data.status === "Todo"), url: "todo"},
      inProgress: {
        name: "In Progress",
        items: dataTask?.filter((data) => data.status === "In Progress"),
        url: "progress",
      },
      review: {
        name: "Review",
        items: dataTask?.filter((data) => data.status === "Review"),
        url: "review",
      },
      done: {
        name: "Done",
        items: dataTask?.filter((data) => data.status === "Done"),
        url: "done",
      },
    };
    setColumns(columnsKanban);
  }, [dataTask]);
  // problemnya sampe sini
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const {source, destination} = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destinationColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destinationItems = [...destinationColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, removed);
      updateStatusTask(removed.id, destinationColumn.name);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          items: destinationItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    //buat wadah drag n dropnya
    <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
      <div className="board">
        {/* ngelooping setiap kolomnya */}
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div className="column" key={id}>
              <div className="flex">
                <h2>
                  {column.name} {column.items.length}
                </h2>
                <Link to={"/showtasks/" + column.url}>
                  <Tooltip title="Open details">
                    <DoubleRightOutlined style={{color: "#A1A3A8"}} />
                  </Tooltip>
                </Link>
              </div>
              <Divider style={{backgroundColor: "#562BF7"}} />
              {/* masangin fitur drop di kolom */}
              <Droppable droppableId={id} key={id}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{minHeight: 400, background: snapshot.isDraggingOver && "#F0F4F6"}}
                    >
                      {/* looping setiap card di kolomnya, terus dipakein fitur drag cardnya */}
                      {column.items.map((item, i) => {
                        return (
                          <Draggable key={item.id} draggableId={String(item.id)} index={i}>
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  key={item.id}
                                >
                                  <KanbanCard
                                    key={item.id}
                                    item={item}
                                    updateTask={updateTask}
                                    deleteTask={deleteTask}
                                    updateTags={updateTags}
                                    updatePeoples={updatePeoples}
                                    loadingDeleteTask={loadingDeleteTask}
                                    uniquePeopleList={uniquePeopleList}
                                    getTagList={getTagList}
                                    addingPeople={addingPeople}
                                    loadingUpdateCard={loadingUpdateCard}
                                    loadingUpdateStatus={loadingUpdateStatus}
                                  />
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
              {/* ini button buat nambahin task baru */}
              <NewTask addTask={addTask} name={column.name} loadingAddTask={loadingAddTask} />
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
