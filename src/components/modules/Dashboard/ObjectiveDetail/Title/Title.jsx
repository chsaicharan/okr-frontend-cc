import React from "react";
import "./Title.css";
import DateFormatter from "../../../../Utilities/DateFormatter";

export default function Title(props) {
  const { currentObjective } = props;
  return (
    <div className="title-container">
      <div className="objective-title">{currentObjective.objective}</div>
      <div className="objective-details">
        <div className="column">
          <p className="objective-details-title">Quarter</p>
          <p className="objective-details-content">
            {DateFormatter.getQuarter(currentObjective.startDate)}
          </p>
        </div>
        <div className="column">
          <p className="objective-details-title">Start Date</p>
          <p className="objective-details-content">
            {DateFormatter.setFormatter(currentObjective.startDate)}
          </p>
        </div>
        <div className="column">
          <p className="objective-details-title">End Date</p>
          <p className="objective-details-content">
            {DateFormatter.setFormatter(currentObjective.endDate)}
          </p>
        </div>
        <div className="column">
          <p className="objective-details-title">Owner</p>
          <p className="objective-details-content">
            {localStorage.getItem("name")}
          </p>
        </div>
      </div>
    </div>
  );
}
