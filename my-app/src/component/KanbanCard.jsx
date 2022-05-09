import {Divider, Space, Tag} from "antd";
import {CalendarOutlined, RiseOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import InputModal from "./InputModal";
const KanbanCard = ({item, tagList, peopleList}) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [updateData, setUpdateData] = useState(item);
  const changeViewModal = () => {
    setModalOpened(!modalOpened);
  };
  useEffect(() => {
    setUpdateData(updateData);
  }, [updateData]);

  const tagsComponent = updateData.tag.map((tag, i) => {
    return (
      <Tag color="#EF3355" style={{borderRadius: 12}} key={i}>
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

  const memberComponent = updateData.member.map((member, i) => {
    return (
      <span style={{color: "#1e2235"}} key={i}>
        {member}
        {i < updateData.member.length - 1 && (
          <Divider type="vertical" style={{background: "#562BF7"}} />
        )}
      </span>
    );
  });

  return (
    <>
      <div className="kanban-card" onClick={changeViewModal}>
        <Space direction="vertical" size="small" style={{display: "flex"}}>
          <div className="tags" style={{display: "flex", gap: "2px"}}>
            {updateData.tag && tagsComponent}
          </div>

          <h4 className="card-title col-secondary">{updateData.title}</h4>
          <div className="date-n-priority flex">
            <div className="date">
              {updateData.date && (
                <Space size={8}>
                  <CalendarOutlined style={{color: "#A1A3A8"}} />
                  <span style={{color: "#1e2235"}}>{convertMonth(updateData.date)}</span>
                </Space>
              )}
            </div>
            <div className="priority">
              {updateData.priority && (
                <Space size={8}>
                  <RiseOutlined style={{color: "green"}} />
                  <span style={{color: "green"}}>{updateData.priority}</span>
                </Space>
              )}
            </div>
          </div>
          <div className="member">
            {updateData.member && <span style={{color: "#A1A3A8"}}>Member: {memberComponent}</span>}
          </div>
          {updateData.status}
        </Space>
      </div>
      <InputModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        updateData={updateData}
        setUpdateData={setUpdateData}
        tagList={tagList}
        peopleList={peopleList}
      />
    </>
  );
};

export default KanbanCard;
