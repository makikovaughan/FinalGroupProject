import React from "react";
import Button from "./Button";
//Needs to be implemented so the user can add teams
const TeamBox = (props) => {
  return (
    <div
      key={props.key}
      style={{
        backgroundColor: "#0b305d",
        borderRadius: "8px",
        // margin: "16px",
        padding: "16px",
        minWidth: "300px",
        minHeight: "300px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
          paddingBottom: "8px",
        }}
      >
        <h2 style={{ margin: 0, color: "#fff" }}>{props.name}</h2>
        <span style={{ color: "#fff" }}># of projects: {props.projects}</span>
      </div>
      <h2 style={{ margin: "20px", color: "#fff", textAlign: "center" }}>Members</h2>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", justifyItems: "center", alignItems: "center"}}
      >
        {props.members.map((member, idx) => (
          <Button
            key={idx}
            w="103px"
            h="50px"
            bg="#1ba098"
            c="#fff"
            style = {{margin: "10px"}}
          >
            {member}
        </Button>
        ))}
      </div>
    </div>
  );
};

export default TeamBox;
