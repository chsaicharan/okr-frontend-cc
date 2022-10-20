import React from "react";
import KeyResults from "./KeyResults/KeyResults";
import Checks from  "./Checks/Checks";
import "./ObjectiveBody.css";

export default function ObjectiveBody(props) {
  const { currentObjective } = props;
  return (
    <div className="dashboard-body">
      <KeyResults currentObjective={currentObjective} />
      <Checks currentObjective={currentObjective} />
    </div>
  );
}
