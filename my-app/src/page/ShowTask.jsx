import {useQuery} from "@apollo/client";
import {Col, Divider, Row, Space, Tag} from "antd";
import {useParams} from "react-router-dom";
import Navbar from "../component/Navbar";
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
    return "loading";
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
            {cardsData.map((eachData) => {
              return (
                <Col
                  className="gutter-row"
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={8}
                  key={eachData.id}
                >
                  <div className="kanban-card">
                    <Space size="middle" direction="vertical" style={{display: "flex"}}>
                      <h4 style={{fontSize: "1.2rem", fontWeight: 600}}>{eachData.title}</h4>
                      {eachData.card_tag && (
                        <div className="tag-container">
                          {eachData.card_tag.map((tag) => {
                            return (
                              <Tag
                                color="#EF3355"
                                style={{borderRadius: 12, textAlign: "center"}}
                                key={tag.id}
                              >
                                <span className="tag-title">{tag.tag}</span>
                              </Tag>
                            );
                          })}
                        </div>
                      )}
                      {eachData.description && (
                        <div className="description-box">
                          <span className="label">Description</span>
                          {eachData.description}
                        </div>
                      )}
                      <div className="flex">
                        {eachData.date && (
                          <div className="date">
                            <span className="label">Deadline</span>
                            {eachData.date}
                          </div>
                        )}
                        {eachData.priority && (
                          <div className="urgency">
                            <span className="label">Urgency level</span>
                            {eachData.priority}
                          </div>
                        )}
                      </div>
                      {eachData.card_people && (
                        <div className="member">
                          <span className="label">Member</span>
                          <div className="member" style={{width: "100%", overflow: "hidden"}}>
                            {eachData?.card_people.map((people, i) => {
                              return (
                                <>
                                  <span style={{color: "#1e2235"}} key={i}>
                                    {people.people}
                                    {i < eachData.card_people.length - 1 && (
                                      <Divider type="vertical" style={{background: "#562BF7"}} />
                                    )}
                                  </span>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </Space>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ShowTask;
