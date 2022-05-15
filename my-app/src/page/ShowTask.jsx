import {useQuery} from "@apollo/client";
import {Divider, Row, Spin} from "antd";
import {useParams} from "react-router-dom";
import Navbar from "../component/Navbar";
import TaskCard from "../component/TaskCard";
import QueryByStatus from "../graphql/QueryByStatus";

const ShowTask = () => {
  let params = useParams();

  let title;
  if (params.url === "todo") {
    title = "Todo";
  } else if (params.url === "progress") {
    title = "In Progress";
  } else if (params.url === "review") {
    title = "Review";
  } else if (params.url === "done") {
    title = "Done";
  } else {
    title = "Not Found";
  }

  const {data, loading, error} = useQuery(QueryByStatus, {
    variables: {
      _eq: title,
    },
  });

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return error;
  }

  const cardsData = data.card;

  return (
    <div className="show-task">
      <Navbar button="kanban" />
      <div className="tasks-container">
        <h1>{title}</h1>
        <Divider />
        <div className="card-container">
          <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            {cardsData.map((eachData, index) => {
              return (
                <TaskCard
                  key={index}
                  id={eachData.id}
                  title={eachData.title}
                  card_tag={eachData.card_tag}
                  description={eachData.description}
                  date={eachData.date}
                  priority={eachData.priority}
                  card_people={eachData.card_people}
                />
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ShowTask;
