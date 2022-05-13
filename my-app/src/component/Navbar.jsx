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
        borderBottom: "2px solid A1A3A8",
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
