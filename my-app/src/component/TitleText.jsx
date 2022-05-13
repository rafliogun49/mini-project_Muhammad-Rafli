import {Typography} from "antd";
const {Title} = Typography;

const TitleText = () => {
  return (
    <>
      <Title>
        <span className="col-secondary" style={{background: "#fff"}}>
          Kanban Board
        </span>
      </Title>
    </>
  );
};

export default TitleText;
