import React from "react";

const Spinner = () => {
  return (
    <div
      className="fa-4x"
      style={{
        margin: "auto",
        display: "flex",
        justifyContent: "center"
      }}>
      <i
        style={{
          display: "inline-block",
          height: "100%"
        }}
        className="fa fa-spin fa-spinner"
      />
    </div>
  );
};

export default Spinner;
