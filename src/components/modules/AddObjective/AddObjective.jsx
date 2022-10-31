import React from "react";
import AddObjPopup from "./AddObjPopup";

export default function AddObjective(props) {
  const { getObjective } = props;
  return (
    <div>
      <h1>Create an Objective</h1>
      <AddObjPopup getObjective={getObjective} />
    </div>
  );
}
