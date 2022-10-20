import React from "react";
import "./ObjectiveDetail.css";
import ObjectiveBody from "./ObjectiveBody/ObjectiveBody";
import Title from "./Title/Title";

export default function ObjectiveDetail(props) {
  const { currentObjective } = props
  return (
    <div className="dashboard-objective">
      <Title currentObjective={currentObjective}/>
      <ObjectiveBody currentObjective={currentObjective}/>
    </div>
  );
}
