import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="loader-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <RingLoader color="#36d7b7" size={60} />
    </div>
  );
};

export default Loader;