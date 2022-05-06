import {Button, Col, DatePicker, InputNumber, Modal, Row, Select, Space} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {Option} from "antd/lib/mentions";
import moment from "moment";
import {useState} from "react";

// belum digarap
const InputModal = ({modalOpened, setModalOpened}) => {
  const handleOk = () => {
    setModalOpened(!handleOk);
  };
  const handleCancel = () => {
    setModalOpened(!handleOk);
  };
  const handleDelete = () => {
    setModalOpened(!handleOk);
  };
  const [date, setDate] = useState("");
  const handleChangeDate = (value) => {
    setDate(value.format("DD/MM/YYYY"));
    console.log(typeof date);
  };
  return (
    <>
      <Modal
        title="Membuat fitur-fitur pada Kanban untuk tugas weekly 2"
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
            <TextArea placeholder="Details...." autoSize={{minRows: 3, maxRows: 5}} />
          </div>
          <Row gutter={32}>
            <Col className="gutter-row" span={12}>
              <div className="member">
                <span style={{display: "block"}}>Member</span>
                <Select mode="tags" placeholder="member name" style={{width: "100%"}}>
                  <Option>Rafli</Option>
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
                />
              </div>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col className="gutter-row" span={12}>
              <div className="tag">
                <span style={{display: "block"}}>Tag</span>
                <Select mode="tags" placeholder="tag" style={{width: "100%"}}>
                  <Option>Design</Option>
                  <Option>Research</Option>
                </Select>
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div className="urgency">
                <span style={{display: "block"}}>Urgency level</span>
                <div className="urgency-level">
                  <InputNumber min={1} max={10} defaultValue={1} style={{minWidth: "50%"}} />
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
