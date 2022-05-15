import {Col, Divider, Space, Tag} from "antd";

const TaskCard = ({id, title, card_tag, description, date, priority, card_people}) => {
  return (
    <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={8} key={id}>
      <div className="kanban-card outlined">
        <Space size="middle" direction="vertical" style={{display: "flex"}}>
          <h4 style={{fontSize: "1.2rem", fontWeight: 600}}>{title}</h4>
          {card_tag && (
            <div className="tag-container">
              {card_tag.map((tag) => {
                return (
                  <Tag color="#EF3355" style={{borderRadius: 12, textAlign: "center"}} key={tag.id}>
                    <span className="tag-title">{tag.tag}</span>
                  </Tag>
                );
              })}
            </div>
          )}
          {description && (
            <div className="description-box">
              <span className="label">Description</span>
              {description}
            </div>
          )}
          <div className="flex">
            {date && (
              <div className="date">
                <span className="label">Deadline</span>
                {date}
              </div>
            )}
            {priority && (
              <div className="urgency">
                <span className="label">Urgency level</span>
                {priority}
              </div>
            )}
          </div>
          {card_people && (
            <div className="member">
              <span className="label">Member</span>
              <div className="member" style={{width: "100%", overflow: "hidden"}}>
                {card_people.map((people, i) => {
                  return (
                    <>
                      <span style={{color: "#1e2235"}} key={i}>
                        {people.people}
                        {i < card_people.length - 1 && (
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
};

export default TaskCard;
