import {Button} from "antd";
import Navbar from "../component/Navbar";
import Hero from "../assets/hero.png";
import {Link} from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar button="home" transparent="true" />
      <div
        className="content"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
          padding: "1.2rem 0",
        }}
      >
        <span className="title-big">Create Successful Project With Kabo </span>
        <Button
          size="large"
          style={{
            background: "white",
            padding: "0 3rem",
            borderRadius: "500px",
            border: "1px solid #562BF7",
          }}
        >
          <Link to="/kanban">
            <span style={{color: "#562BF7", fontWeight: "600"}}>Getting Started</span>
          </Link>
        </Button>
        <img src={Hero} alt="hero" className="image" />
      </div>
    </div>
  );
};

export default LandingPage;
