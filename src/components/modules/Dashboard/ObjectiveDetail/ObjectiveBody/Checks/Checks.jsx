import React, { Component } from "react";
import { Navigate } from "react-router-dom";
// import { TasksServices } from "../../../../../services/TasksService";
import NEXT from "../../../../../../Assets/RIGHT.png";
import PREV from "../../../../../../Assets/LEFT.png";
import "./Checks.css";
import axios from "axios";
import { baseUrl, Headers } from "../../../../../services/constants";

export default class Checks extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      checksData: [],
      checkStatus: ["ALERT", "WARNING", "OK"],
      checkStatusClassName: [
        "check-status alert-check",
        "check-status warning",
        "check-status",
      ],
      check: "",
      status: "",
      formErrors: { check: "", status: "" },
      checkValid: false,
      statusValid: false,
      formValid: false,
      showField: false,
      errorDirect: false,
    };
    this.handleClickforNext = this.handleClickforNext.bind(this);
    this.handleClickforPrev = this.handleClickforPrev.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.toggleState = this.toggleState.bind(this);
  }

  handleUserInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(
      {
        [name]: value,
      },
      this.validateField(name, value.trim())
    );
  }

  validateField(name, value) {
    let fieldValidationErrors = this.state.formErrors;
    let checkValid = this.state.checkValid;
    let statusValid = this.state.statusValid;
    switch (name) {
      case "check":
        if (value.length <= 200) {
          checkValid = value.length >= 10;
          fieldValidationErrors.check = checkValid ? "" : "Check is too short";
        } else {
          fieldValidationErrors.check = "check is too long";
          checkValid = false;
        }
        break;
      case "status":
        statusValid = value !== "select";
        fieldValidationErrors.status = statusValid ? "" : "Select the Priority";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        checkValid: checkValid,
        statusValid: statusValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.checkValid && this.state.statusValid,
    });
  }

  showForm() {
    if (this.state.showField) {
      return (
        <div className="add-check-section check-form">
          <div className="form-check">
            <div className="row">
              <div className="col-md-11">
                <input
                  autoFocus
                  className="form-input-check"
                  placeholder=" Type Here..."
                  type="text"
                  name="check"
                  value={this.state.check}
                  onChange={this.handleUserInput}
                />
              </div>
              <div className="col-md-1">
                <select
                  className="select-status button-focus"
                  name="status"
                  onChange={this.handleUserInput}
                  id="ddselect"
                >
                  <option value="select">SELECT *</option>
                  <option value="2">OK</option>
                  <option value="1">WARNING</option>
                  <option value="0">ALERT</option>
                </select>
              </div>
              <p className="check-error">{this.state.formErrors.check}</p>
            </div>
            <hr className="divider-checks" />
            <div className="button-div">
              <button
                onClick={this.handleSubmit}
                className="add-check-button button-focus"
                disabled={!this.state.formValid}
              >
                Save
              </button>
              <button
                className="cancel-check-button button-focus"
                onClick={() => {
                  this.toggleState();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="add-check-section">
          <button
            className="new-check-button button-focus"
            onClick={() => {
              this.toggleState();
            }}
          >
            New Check
          </button>
        </div>
      );
    }
  }

  toggleState() {
    this.setState(
      {
        showField: !this.state.showField,
        check: "",
        status: "",
        formErrors: { check: "", status: "" },
        checkValid: false,
        statusValid: false,
        formValid: false,
      },
      () => {}
    );
    var dropdown = document.getElementById("ddselect");
    dropdown.selectedIndex = 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let status = parseInt(this.state.status, 10);
    axios
      .post(
        `${baseUrl}/checks`,
        {
          check: this.state.check,
          objectiveId: this.props.currentObjective._id,
          status: status,
        },
        {
          headers: Headers,
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          checksData: res.data,
        });
      });
    this.setState({
      check: "",
      status: "",
      formErrors: { check: "", status: "" },
      checkValid: false,
      statusValid: false,
      formValid: false,
    });
    var dropdown = document.getElementById("ddselect");
    dropdown.selectedIndex = 0;
  };

  componentDidMount() {
    axios
      .get(
        `${baseUrl}/checks/${this.props.currentObjective._id}`,
        // { objectiveId: this.props.currentObjective._id },
        { headers: Headers }
      )
      .then((res) => {
        console.log(res, "checks");
        this.setState({
          checksData: res.data,
        });
      });
  }

  handleClickforNext = (datum) => {
    // TasksServices.updateCheck(
    //   this.props.objectives.currentObjective.objectiveId,
    //   (datum.checkStatus + 1) % 3,
    //   datum.checkId,
    //   datum.checkName
    // );
    axios
      .put(
        `${baseUrl}/check`,
        {
          objectiveId: this.props.currentObjective._id,
          checkId: datum._id,
          status: (datum.status + 1) % 3,
        },
        { headers: Headers }
      )
      .then((res) => {
        this.setState({
          checksData: res.data,
        });
      });
  };

  handleClickforPrev = (datum) => {
    let val = datum.status - 1;
    // TasksServices.updateCheck(
    //   this.props.objectives.currentObjective.objectiveId,
    //   ((val % 3) + 3) % 3,
    //   datum.checkId,
    //   datum.checkName
    // );
    axios
      .put(
        `${baseUrl}/check`,
        {
          objectiveId: this.props.currentObjective._id,
          checkId: datum._id,
          status: ((val % 3) + 3) % 3,
        },
        { headers: Headers }
      )
      .then((res) => {
        this.setState({
          checksData: res.data,
        });
      });
  };

  render() {
    return (
      <div className="checks">
        {/* {this.props.error.direct ? <Navigate to="/error" /> : null} */}
        <div className="checks-title">
          <p className="title-header-checks">Checks</p>
          <p className="title-status">Status</p>
        </div>
        {this.showForm()}
        {this.state.checksData &&
          this.state.checksData.map((datum, index) => {
            return (
              <li
                key={index}
                className={
                  (index + 1) % 2 === 0
                    ? "check-body-even-content"
                    : "check-body-odd-content"
                }
              >
                <p
                  className={
                    datum.checkStatus === 0
                      ? "check-content alert-check"
                      : "check-content"
                  }
                >
                  {index + 1}
                  {". "}
                  {datum.check}
                </p>
                <p className="change-checks-status">
                  <button
                    className={
                      datum.status === 1
                        ? "check-prev-button prev-button-warning button-focus"
                        : "check-prev-button button-focus"
                    }
                    onClick={() => {
                      this.handleClickforPrev(datum);
                    }}
                  >
                    <img src={PREV} alt="" />
                  </button>
                  <p className={this.state.checkStatusClassName[datum.status]}>
                    {this.state.checkStatus[datum.status]}
                  </p>
                  <button
                    className="check-nxt-button button-focus"
                    onClick={() => {
                      this.handleClickforNext(datum);
                    }}
                  >
                    <img src={NEXT} alt="" />
                  </button>
                </p>
              </li>
            );
          })}
      </div>
    );
  }
}
