import React from "react";

export const UiDisplayDebugState = (props) => (
  <div style={{ margin: "1rem 0" }}>
    {/* <h3 style={{ fontFamily: "monospace" }} /> */}
    <pre
      style={{
        background: "#f6f8fa",
        fontSize: ".65rem",
        padding: ".5rem"
      }}
    >
      <strong>{props.name}</strong> = {JSON.stringify(props.state, null, 2)}
    </pre>
  </div>
);
