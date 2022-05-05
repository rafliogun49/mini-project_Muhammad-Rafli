import {Row, Col, Space, Divider} from "antd";
import KanbanCard from "./KanbanCard";
import NewTask from "./NewTask";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useState} from "react";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const {source, destination} = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destinationitems = [...destinationColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destinationitems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        items: destinationitems,
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

const KanbanBoard = ({dataTask, setDataTask}) => {
  const columnsKanban = {
    todo: {name: "Todo", items: dataTask},
    inProgress: {name: "In Progress", items: []},
    review: {name: "Review", items: []},
    done: {name: "Done", items: []},
  };
  const [columns, setColumns] = useState(columnsKanban);
  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
      <Row gutter={32} className="board">
        {Object.entries(columns).map(([id, column]) => {
          return (
            <Col className="gutter-row" span={6} key={id}>
              <div className="title-column">
                <h2>{column.name}</h2>
                <Divider style={{backgroundColor: "#562BF7"}} />
              </div>
              <Droppable droppableId={id} key={id}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{minHeight: 300}}
                    >
                      {column.items.map((item, i) => {
                        return (
                          <Draggable key={item.id} draggableId={String(item.id)} index={i}>
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <KanbanCard item={item} />
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
              <NewTask dataTask={dataTask} setDataTask={setDataTask} />
            </Col>
          );
        })}
      </Row>
    </DragDropContext>
  );
};

export default KanbanBoard;
