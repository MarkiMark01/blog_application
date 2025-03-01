import { BeatLoader } from "react-spinners";

const BeatLoader = () => {
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
      <BeatLoader color="lightblue" size={15} />
    </div>
  );
};

export default BeatLoader;