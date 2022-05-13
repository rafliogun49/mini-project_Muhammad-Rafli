import {Divider, Space, Spin, Tag} from "antd";
import {CalendarOutlined, RiseOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import InputModal from "./InputModal";
const KanbanCard = ({
  item,
  tagList,
  peopleList,
  dataTask,
  updateTask,
  deleteTask,
  updateTags,
  updatePeoples,
  loadingDeleteTask,
  uniquePeopleList,
  getTagList,
  addingPeople,
  loadingUpdateCard,
  loadingUpdateStatus,
}) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [updateData, setUpdateData] = useState(item);
  const changeViewModal = () => {
    setModalOpened(!modalOpened);
  };
  useEffect(() => {
    setUpdateData(updateData);
  }, [updateData]);

  const tagsComponent = updateData?.card_tag.map((tag) => {
    return (
      <Tag color="#EF3355" style={{borderRadius: 12}} key={tag.id}>
        <span className="tag-title">{tag.tag}</span>
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

  const memberComponent = updateData?.card_people.map((member, i) => {
    return (
      <>
        <span style={{color: "#1e2235"}} key={member.id}>
          {member.people}
          {i < updateData.card_people.length - 1 && (
            <Divider type="vertical" style={{background: "#562BF7"}} />
          )}
        </span>
      </>
    );
  });

  return (
    <>
      <Spin spinning={loadingUpdateStatus}>
        <div className="kanban-card" onClick={changeViewModal}>
          <Space direction="vertical" size={4} style={{display: "flex"}}>
            <div className="tags" style={{display: "flex", gap: "2px"}}>
              {updateData?.card_tag && tagsComponent}
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
            {updateData?.card_people && (
              <div className="member" style={{width: "100%", overflow: "hidden"}}>
                {updateData?.card_people && (
                  <span style={{color: "#A1A3A8", overflow: "hidden"}}>
                    Member: {memberComponent}
                  </span>
                )}
              </div>
            )}
          </Space>
        </div>
      </Spin>
      <InputModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        updateData={updateData}
        setUpdateData={setUpdateData}
        dataTask={dataTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
        updateTags={updateTags}
        updatePeoples={updatePeoples}
        loadingDeleteTask={loadingDeleteTask}
        uniquePeopleList={uniquePeopleList}
        getTagList={getTagList}
        addingPeople={addingPeople}
        loadingUpdateCard={loadingUpdateCard}
      />
    </>
  );
};

export default KanbanCard;
