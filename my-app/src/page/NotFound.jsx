import {Button, Space} from "antd";
import {Link} from "react-router-dom";
import notFound from "../assets/not-found.png";

const NotFound = () => {
  return (
    <Space
      size="large"
      direction="vertical"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="not-found-page">
        <img src={notFound} alt="not-found" style={{maxWidth: "250px"}} />
        <h1>Halaman tidak ditemukan</h1>
        <Button>
          <Link to="/">Kembali ke halaman utama</Link>
        </Button>
      </div>
    </Space>
  );
};

export default NotFound;
