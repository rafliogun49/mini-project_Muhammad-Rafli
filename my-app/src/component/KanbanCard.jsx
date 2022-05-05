import {Divider, Space, Tag} from "antd";
import {CalendarOutlined, RiseOutlined} from "@ant-design/icons";
import {useState} from "react";
import InputModal from "./InputModal";
const KanbanCard = ({item}) => {
  const [modalOpened, setModalOpened] = useState(false);
  const changeViewModal = () => {
    setModalOpened(!modalOpened);
  };

  const tagsComponent = item.tag.map((tag) => {
    return (
      <Tag color="#EF3355" style={{borderRadius: 12}}>
        <span className="tag-title">{tag}</span>
      </Tag>
    );
  });

  const month = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const convertMonth = (date) => {
    const getMonth = date.split("/")[1];
    const monthName = month[getMonth];
    const split = date.split("/");
    return `${split[0]} ${monthName} ${split[2]}`;
  };

  const memberComponent = item.member.map((member, i) => {
    return (
      <span style={{color: "#1e2235"}}>
        {member}
        {i < item.member.length - 1 && <Divider type="vertical" style={{background: "#562BF7"}} />}
      </span>
    );
  });

  return (
    <>
      <div className="kanban-card" onClick={changeViewModal}>
        <Space direction="vertical" size="small" style={{display: "flex"}}>
          <div className="tags" style={{display: "flex", gap: "2px"}}>
            {tagsComponent}
          </div>

          <h4 className="card-title col-secondary">{item.title}</h4>
          <div className="date-n-priority flex">
            <div className="date">
              <Space size={8}>
                <CalendarOutlined style={{color: "#A1A3A8"}} />
                <span style={{color: "#1e2235"}}>{convertMonth(item.date)}</span>
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
            {memberComponent}
          </div>
        </Space>
      </div>
      <InputModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </>
  );
};

export default KanbanCard;
