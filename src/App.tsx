import React from "react";
import FileUpload from "./FileUpload";

const App: React.FC = () => {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Upload CSV</h1>
      <FileUpload />
    </div>
  );
};

export default App;
