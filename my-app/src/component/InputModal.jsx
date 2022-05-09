import {Button, Col, DatePicker, InputNumber, Modal, Row, Select, Space} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import {useState} from "react";

const {Option} = Select;

// belum digarap
const InputModal = ({
  modalOpened,
  setModalOpened,
  updateData,
  setUpdateData,
  tagList,
  peopleList,
}) => {
  const handleOk = () => {
    setModalOpened(!handleOk);
    console.log(updateData);
  };
  const handleCancel = () => {
    setModalOpened(!handleOk);
  };
  const handleDelete = () => {
    setModalOpened(!handleOk);
  };

  const peopleOptions = peopleList.map((people) => <Option value={people}>{people}</Option>);
  const tagOptions = tagList.map((tag) => <Option value={tag}>{tag}</Option>);

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
    setUpdateData({
      ...updateData,
      member: value,
    });
  };

  const handleChangeTag = (value) => {
    setUpdateData({
      ...updateData,
      tag: value,
    });
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
                >
                  {peopleOptions}
                </Select>
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div className="date">
                <span style={{display: "block"}}>Date</span>
                <DatePicker
                  defaultValue={moment("01/01/2015", "YYYY/MM/DD")}
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
