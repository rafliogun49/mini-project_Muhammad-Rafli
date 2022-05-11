import {PlusOutlined} from "@ant-design/icons";
import {Button, Col, Input, message, Row} from "antd";
import {useState} from "react";

const NewTask = ({addTask, name}) => {
  const [addNewTask, setAddNewTask] = useState(false);
  const loadingMessage = () => {
    message.loading("Sedang diupload");
  };
  const [title, setTitle] = useState("");
  const changeNewTaskStatus = () => {
    setAddNewTask(!addNewTask);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const addingNewTask = (e) => {
    e.preventDefault();
    if (!title) {
      message.error("Judul tidak boleh kosong");
    } else {
      addTask(title, name);
      loadingMessage();
      setTitle("");
      changeNewTaskStatus();
    }
  };

  return (
    <div className="new-task-card">
      {addNewTask ? (
        <div className="input-new-task">
          <Row gutter={8}>
            <Col className="gutter-row" span={20}>
              <Input
                placeholder="new task"
                bordered={false}
                style={{width: "100%"}}
                name="title"
                onChange={handleChange}
                onPressEnter={addingNewTask}
              />
            </Col>
            <Col className="gutter-row">
              <Button
                shape="circle"
                style={{background: "#562BF7", borderRadius: "8px"}}
                onClick={addingNewTask}
              >
                <PlusOutlined style={{color: "white"}} />
              </Button>
            </Col>
          </Row>
        </div>
      ) : (
        <div className="button-task">
          <Button
            block
            size="large"
            style={{
              background: "#562BF7",
              borderRadius: "8px",
            }}
            onClick={changeNewTaskStatus}
          >
            <h4 style={{color: "#fff"}}>Add new task</h4>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewTask;
