import React from "react";
import CLOSE from "../../../Assets/CLOSE.png";
import "./AddObjPopup.css";
import moment from "moment";
import axios from "axios";
import { baseUrl, Headers } from "../../services/constants";

export default class AddObjPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      objective: "",
      values: [],
      confidence: [],
      formErrors: { objective: "", error: [], confidence: [] },
      valuesValid: false,
      confidenceValid: false,
      objectiveValid: false,
      formValid: false,
      dataValid: [],
      disableButton: 0,
    };
  }

  createUI = () => {
    return this.state.values.map((el, i) => (
      <div key={i} className="kr-input">
        Key Result{" "}
        <input
          type="text"
          value={el}
          onChange={(e) => this.handleChange(e, i, "string")}
          className="keyResult"
          autoFocus
        />
        <p className="keyresult-error">{this.state.formErrors.error[i]}</p>
      </div>
    ));
  };
  createConfidence = () => {
    return this.state.confidence.map((el, i) => (
      <div key={i} className="confidence-level">
        Confidence{" "}
        <input
          type="number"
          value={el}
          onChange={(e) => this.handleUserChange(e, i)}
          className="confidence-input-field"
          autoFocus
        />
        <p className="keyresult-error">{this.state.formErrors.confidence[i]}</p>
      </div>
    ));
  };
  removeButton = () => {
    return this.state.confidence.map((el, i) => (
      <div key={i}>
        <button
          value="remove"
          className="remove-button button-focus"
          onClick={this.removeClick.bind(this, i)}
        >
          <img src={CLOSE} alt="" />
        </button>
      </div>
    ));
  };

  handleUserChange = (e, i) => {
    e.preventDefault();
    let confidence = [...this.state.confidence];
    confidence[i] = e.target.value || "";
    this.setState({ confidence });
    this.validateField(i, confidence[i].replace(/[^0-9]*/g, ""));
  };
  handleChange = (e, i, type) => {
    e.preventDefault();
    let values = [...this.state.values];
    values[i] = e.target.value || "";
    this.setState({ values });
    this.validate(i, values[i].trim());
  };
  handleUserInput = (e) => {
    const objective = e.target.value;
    this.setState({ objective }, () => {
      this.validateObjective(objective.trim());
    });
  };

  validateObjective = (value) => {
    if (value.length < 10) {
      this.state.formErrors.objective = "Objective is too short";
    } else if (value.length >= 200) {
      this.state.formErrors.objective = "Objective is too long";
    } else {
      this.state.formErrors.objective = "";
      this.setState(
        {
          objectiveValid: true,
        },
        this.validateForm
      );
    }
  };

  validate(i, values) {
    let temp = this.state.valuesValid;
    if (values.length < 10) {
      this.state.formErrors.error[i] = "Key Result is too short";
      temp = false;
    } else if (values.length >= 200) {
      this.state.formErrors.error[i] = "Key Result is too long";
      temp = false;
    } else {
      this.state.formErrors.error[i] = "";
      temp = true;
    }
    this.validateForm();
    this.state.dataValid[i].kr = temp;
  }

  validateField = (i, confidence) => {
    const { confidenceValid, formErrors, dataValid } = this.state;
    let temp = false;
    if (confidence >= 1 && confidence <= 10) {
      formErrors.confidence[i] = "";
      temp = true;
    } else {
      formErrors.confidence[i] = "Enter Value between 1 and 10";
      temp = false;
    }
    dataValid[i].conf = temp;
    this.setState({ confidenceValid, formErrors, dataValid }, () =>
      this.validateForm()
    );
  };

  validateForm = () => {
    let abc = this.state.disableButton;
    let temp = 0;
    let buttonValid = false;
    this.state.dataValid.map((d) => {
      if (d.kr && d.conf) {
        temp += 1;
      }
    });
    if (abc !== 0) {
      if (abc === temp) {
        buttonValid = true;
      }
    } else {
      buttonValid = false;
    }
    this.setState({
      formValid: this.state.objectiveValid && buttonValid,
    });
  };

  addClick() {
    let buttonDisable = this.state.disableButton;
    buttonDisable += 1;
    this.setState({
      disableButton: buttonDisable,
      formValid: false,
      valuesValid: false,
      confidenceValid: false,
    });
    this.setState((prevState) => ({
      values: [...prevState.values, ""],
      confidence: [...prevState.confidence, ""],
    }));
  }

  removeClick(i) {
    let buttonDisable = this.state.disableButton;
    buttonDisable -= 1;
    this.setState(
      {
        disableButton: buttonDisable,
      },
      () => {
        this.validateForm();
      }
    );
    let values = [...this.state.values];
    let confidence = [...this.state.confidence];
    values.splice(i, 1);
    confidence.splice(i, 1);
    this.setState({ values, confidence });
    this.state.dataValid[i].kr = false;
    this.state.dataValid[i].conf = false;
  }

  validateData() {
    let temp = [];
    for (let index = 0; index < 5; index++) {
      var obj = {};
      obj.kr = false;
      obj.conf = false;
      temp.push(obj);
    }
    this.setState(
      {
        dataValid: temp,
      },
      () => {}
    );
  }

  onSubmit = () => {
    // event.preventDefault();
    let temp = [];
    let a = this.state.values;
    var b = 0;
    this.state.values &&
      this.state.values.map((datum) => {
        let obj = {};
        obj.keyResult = a[b];
        obj.confidence = this.state.confidence[b];
        temp.push(obj);
        b += 1;
      });
    let dataObject = {};
    dataObject.actualEndDate = 0;
    dataObject.collabStatus = true;
    dataObject.collaborators = null;
    dataObject.endDate = 0;
    dataObject.objective = this.state.objective;
    dataObject.objectiveId = 0;
    dataObject.owner = localStorage.getItem("name");
    dataObject.permission = 2;
    dataObject.pin = false;
    dataObject.progress = 0;
    dataObject.startDate = 0;
    dataObject.state = true;
    dataObject.status = 0;
    // ObjectiveService.addObjective(dataObject, this.state.objective, temp);
    // console.log(dataObject, this.state.objective, temp);
    axios.post(
      `${baseUrl}/objective`,
      {
        objective: this.state.objective,
        keyResults: temp,
      },
      { headers: Headers }
    );
    this.setState({
      objective: "",
      values: [],
      confidence: [],
      formErrors: { objective: "", error: [], confidence: [] },
      valuesValid: false,
      confidenceValid: false,
      objectiveValid: false,
      formValid: false,
      disableButton: 0,
      showModal: !this.state.showModal,
    });
  };

  sendData = (temp) => {
    // this.props.parentCallBack(
    //   {
    //     objective: this.state.objective,
    //     temp: temp
    //   },
    //   () => {}
    // );
  };
  componentDidMount() {
    this.getDate();
    this.getendDate();
    this.validateData();
  }

  getDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var startDate = year + "-" + month + "-" + date;
    this.setState({ startDate });
  };

  getendDate = () => {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var quarter = Math.ceil(month / 3);
    var endDate;
    if (quarter === 1 || quarter === 4) {
      endDate = year + "-" + quarter * 3 + "-31";
    } else if (quarter === 2 || quarter === 3) {
      endDate = year + "-" + quarter * 3 + "-30";
    }
    var Quarter = "Quarter " + quarter + ", " + year;
    this.setState({ endDate, Quarter });
  };

  setFormat = (datefromdb) => {
    var simple = new Date(datefromdb);
    var date = simple.getDate();
    const month = simple.toLocaleDateString("default", { month: "long" });
    var year = simple.getFullYear();
    var finaldate = date + " " + month.substring(0, 3) + ", " + year;
    return finaldate;
  };

  onClose = () => {
    console.log(this.state);

    this.setState({
      objective: "",
      values: [],
      confidence: [],
      formErrors: { objective: "", error: [], confidence: [] },
      valuesValid: false,
      confidenceValid: false,
      objectiveValid: false,
      formValid: false,
      disableButton: 0,
      showModal: !this.state.showModal,
    });
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    const { showModal } = this.state;

    return (
      <React.Fragment>
        {/* <button className="btn add-obj button-focus" onClick={this.toggleModal}>
          New Objective
        </button> */}
        {showModal ? (
          // <Modal
          //   close={this.onClose}
          //   save={this.onSubmit}
          //   title="Add New Objective"
          //   disable={this.state.formValid}
          // >
          <>
            <div className="row obj-alignment">
              <div className="col-md-4">
                Quarter:{" "}
                <input
                  value={this.state.Quarter}
                  className="read-only-fields"
                  readOnly
                />
              </div>
              <div className="col-md-4">
                Start Date:{" "}
                <input
                  value={this.setFormat(new Date())}
                  className="read-only-fields"
                  readOnly
                />
              </div>
              <div className="col-md-4">
                Due Date:{" "}
                <input
                  value={this.setFormat(
                    moment().quarter(moment().quarter()).endOf("quarter")
                  )}
                  className="read-only-fields"
                  readOnly
                />
              </div>
            </div>
            <div className="objective-input-title">
              Objective Title{" "}
              <input
                autoFocus
                type="text"
                className="objective-input"
                placeholder="Objective"
                width="100%"
                value={this.state.objective}
                onChange={this.handleUserInput}
              />
            </div>
            <div className="error-objective">
              {this.state.formErrors.objective}{" "}
            </div>
            <div className="keyresult-formatting">
              <table width="100%">
                <tbody>
                  <tr>
                    <td className="table-kr">{this.createUI()} </td>
                    <td className="table-confidence">
                      {this.createConfidence()}
                    </td>
                    <td className="table-remove">{this.removeButton()}</td>
                  </tr>
                </tbody>
              </table>
              {this.state.disableButton === 5 ? null : (
                <button
                  className="keyresult-add-button button-focus"
                  onClick={this.addClick.bind(this)}
                  disabled={this.state.disableButton === 5 ? true : false}
                >
                  {/* <img src={PLUS} alt="" />  */}
                  New Key Result
                </button>
              )}
            </div>
            <div>
              <button
                onClick={this.toggleModal}
                type="button"
                className="btn cancel-button button-focus"
                data-dismiss="modal"
              >
                CANCEL
              </button>
              <button
                type="button"
                className="submit-button button-focus"
                onClick={this.onSubmit}
                data-dismiss="modal"
                disabled={!this.state.formValid}
              >
                SAVE
              </button>
            </div>
          </>
        ) : (
          // </Modal>
          <button
            className="btn add-obj button-focus"
            onClick={this.toggleModal}
          >
            New Objective
          </button>
        )}
      </React.Fragment>
    );
  }
}
