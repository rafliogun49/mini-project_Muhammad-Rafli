import {Space, Tag} from "antd";
import {CalendarOutlined, RiseOutlined} from "@ant-design/icons";
import {useState} from "react";
import InputModal from "./InputModal";
const Card = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const changeViewModal = () => {
    setModalOpened(!modalOpened);
  };
  return (
    <>
      <div className="kanban-card" onClick={changeViewModal}>
        <Space direction="vertical" size="small">
          <Tag color="#EF3355" style={{borderRadius: 12}}>
            <span className="tag-title">Research</span>
          </Tag>
          <h4 className="card-title col-secondary">
            Membuat fitur-fitur pada Kanban untuk tugas weekly 2
          </h4>
          <div className="date-n-priority flex">
            <div className="date">
              <Space size={8}>
                <CalendarOutlined style={{color: "#A1A3A8"}} />
                <span style={{color: "#1e2235"}}>28 April 2022</span>
              </Space>
            </div>
            <div className="priority">
              <Space size={8}>
                <RiseOutlined style={{color: "green"}} />
                <span style={{color: "green"}}>5</span>
              </Space>
            </div>
          </div>
          <div className="member">
            <span style={{color: "#A1A3A8"}}>Member: </span>
            <span style={{color: "#1e2235"}}>Rafli | Aryo | Zahra</span>
          </div>
        </Space>
      </div>
      <InputModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </>
  );
};

export default Card;
