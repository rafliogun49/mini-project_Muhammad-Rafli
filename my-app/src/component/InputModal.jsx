import {Button, Col, DatePicker, InputNumber, message, Modal, Row, Select, Space} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import {useState} from "react";

const {Option} = Select;

const extractPeopleValue = (val) => {
  let value = [];
  for (let index = 0; index < val?.length; index++) {
    let element = val[index].people;
    value.push(element);
  }
  return value;
};

const extractTagValue = (val) => {
  let value = [];
  for (let index = 0; index < val?.length; index++) {
    let element = val[index].tag;
    value.push(element);
  }
  return value;
};

const updateLoading = () => {
  message.loading("Sedang memperbaharui data");
};
const loadingDelete = () => {
  message.loading("Sedang menghapus task");
};
const alert = () => {
  message.error("Tag tidak boleh lebih dari 2");
};
const InputModal = ({
  modalOpened,
  setModalOpened,
  updateData,
  setUpdateData,
  updateTask,
  deleteTask,
  updateTags,
  updatePeoples,
  uniquePeopleList,
  getTagList,
}) => {
  const [listPeople, setListPeople] = useState(updateData.card_people.map((v) => v.people));
  const [listTag, setListTag] = useState(updateData.card_tag.map((v) => v.tag));
  const handleOk = () => {
    setModalOpened(!handleOk);
    updateTask(
      updateData.id,
      updateData.priority,
      updateData.description,
      updateData.date,
      updateData.status
    );
    updateTags(
      updateData.id,
      listTag,
      updateData.card_tag.map((v) => v.tag)
    );
    updatePeoples(
      updateData.id,
      listPeople,
      updateData.card_people.map((v) => v.people)
    );
    updateLoading();
  };

  const handleCancel = () => {
    setModalOpened(!handleOk);
  };
  const handleDelete = () => {
    setModalOpened(!handleOk);
    deleteTask(updateData.id);
    loadingDelete();
  };

  const peopleList = extractPeopleValue(uniquePeopleList);

  const tagList = extractTagValue(getTagList);
  const uniquePeoples = [...new Set(peopleList)];
  const uniqueTags = [...new Set(tagList)];
  const peopleOptions = uniquePeoples.map((people) => (
    <Option value={people} key={people}>
      {people}
    </Option>
  ));
  const tagOptions = uniqueTags.map((tag) => (
    <Option value={tag} key={tag}>
      {tag}
    </Option>
  ));

  const handleChangeDate = (value) => {
    setUpdateData({
      ...updateData,
      date: value.format("DD/MM/YYYY"),
    });
  };

  const handleChangeDescription = ({target: {value}}) => {
    setUpdateData({
      ...updateData,
      description: value,
    });
  };

  const handleChangeMember = (value) => {
    setListPeople(value);
  };

  const handleChangeTag = (value) => {
    if (value.length > 2) {
      alert();
    } else {
      setListTag(value);
    }
  };

  const handleChangePriority = (value) => {
    setUpdateData({
      ...updateData,
      priority: value,
    });
  };

  return (
    <>
      <Modal
        title={updateData.title}
        visible={modalOpened}
        onOk={handleOk}
        onCancel={handleCancel}
        width="768px"
        style={{borderRadius: "8px"}}
        footer={[
          <Button
            key="delete"
            style={{background: "#DC3545", borderRadius: "4px", color: "#fff", fontWeight: 700}}
            onClick={handleDelete}
          >
            Delete
          </Button>,
          <Button
            key="submit"
            style={{background: "#562BF7", borderRadius: "4px", color: "#fff", fontWeight: 700}}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Space direction="vertical" size="middle" style={{display: "flex"}}>
          <div className="description-box">
            <span style={{display: "block"}}>Description</span>
            <TextArea
              placeholder="Details...."
              autoSize={{minRows: 3, maxRows: 5}}
              onChange={handleChangeDescription}
              defaultValue={updateData.description}
            />
          </div>
          <Row gutter={32}>
            <Col className="gutter-row" span={12}>
              <div className="member">
                <span style={{display: "block"}}>Member</span>
                <Select
                  mode="tags"
                  placeholder="member name"
                  style={{width: "100%"}}
                  name="member"
                  onChange={handleChangeMember}
                  defaultValue={updateData.card_people.map((v) => v.people)}
                >
                  {peopleOptions}
                </Select>
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div className="date">
                <span style={{display: "block"}}>Date</span>
                <DatePicker
                  defaultValue={updateData.date ? moment(updateData.date, "DD/MM/YYYY") : moment()}
                  format={"YYYY/MM/DD"}
                  style={{minWidth: "50%"}}
                  onChange={handleChangeDate}
                  name="date"
                />
              </div>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col className="gutter-row" span={12}>
              <div className="tag">
                <span style={{display: "block"}}>Tag</span>
                <Select
                  mode="tags"
                  placeholder="tag"
                  style={{width: "100%"}}
                  name="tag"
                  onChange={handleChangeTag}
                  defaultValue={updateData.card_tag.map((v) => v.tag)}
                >
                  {tagOptions}
                </Select>
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div className="urgency">
                <span style={{display: "block"}}>Urgency level</span>
                <div className="urgency-level">
                  <InputNumber
                    min={1}
                    max={10}
                    defaultValue={1}
                    style={{minWidth: "50%"}}
                    name="priority"
                    onChange={handleChangePriority}
                    value={updateData.priority}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Space>
      </Modal>
    </>
  );
};

export default InputModal;
