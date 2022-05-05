import {Row, Col, Space} from "antd";
import KanbanCard from "./KanbanCard";
import NewTask from "./NewTask";

const KanbanBoard = () => {
  return (
    <Row gutter={32} className="board">
      <Col className="gutter-row" span={6}>
        <Space direction="vertical" size="small" style={{display: "flex"}}>
          <h2>Todo</h2>
          <KanbanCard />
          <NewTask />
        </Space>
      </Col>
      <Col className="gutter-row" span={6}>
        <Space direction="vertical" size="small" style={{display: "flex"}}>
          <h2>In Progress</h2>
          <KanbanCard />
          <NewTask />
        </Space>
      </Col>
      <Col className="gutter-row" span={6}>
        <Space direction="vertical" size="small" style={{display: "flex"}}>
          <h2>Review</h2>
          <KanbanCard />
          <NewTask />
        </Space>
      </Col>
      <Col className="gutter-row" span={6}>
        <Space direction="vertical" size="small" style={{display: "flex"}}>
          <h2>Done</h2>
          <KanbanCard />
          <NewTask />
        </Space>
      </Col>
    </Row>
  );
};

export default KanbanBoard;
