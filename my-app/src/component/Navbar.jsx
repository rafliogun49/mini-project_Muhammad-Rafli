import {Badge, Button} from "antd";
import {Header} from "antd/lib/layout/layout";
import {Link} from "react-router-dom";
import Icon from "../assets/icon.png";

const Navbar = ({button, transparent}) => {
  let navButton;
  if (button === "home") {
    navButton = (
      <Button
        size="large"
        style={{
          background: "#904FC3",
          color: "white",
          padding: "0  1rem",
          borderRadius: "500px",
        }}
      >
        <Link to="/kanban">
          <span style={{fontWeight: "600"}}>Open board</span>
        </Link>
      </Button>
    );
  }
  if (button === "kanban") {
    navButton = (
      <Button
        size="large"
        style={{
          background: "#904FC3",
          color: "white",
          padding: "0  1rem",
          borderRadius: "500px",
        }}
      >
        <Link to="/kanban">
          <span style={{fontWeight: "600"}}>Back to board</span>
        </Link>
      </Button>
    );
  }
  return (
    <Header
      style={{
        zIndex: 1,
        width: "100%",
        background: transparent ? "rgba(0, 0, 0, 0.2)" : "#fff",
        borderBottom: "1px solid #fff",
        boxShadow:
          "0px 100px 164px rgba(161, 163, 168, 0.07), 0px 59.1541px 70.6355px rgba(161, 163, 168, 0.046866), 0px 37.1205px 31.3395px rgba(161, 163, 168, 0.0373569), 0px 20.699px 14.5893px rgba(161, 163, 168, 0.0298769), 0px 8.35347px 5.65038px rgba(161, 163, 168, 0.0211696)",
      }}
    >
      <div
        style={{
          float: "left",
        }}
      >
        <Link to="/">
          <Badge.Ribbon status="warning" text="Beta">
            <img src={Icon} alt="logo" />
          </Badge.Ribbon>
        </Link>
      </div>
      <div
        className="cta"
        style={{
          float: "right",
        }}
      >
        {navButton}
      </div>
    </Header>
  );
};

export default Navbar;
