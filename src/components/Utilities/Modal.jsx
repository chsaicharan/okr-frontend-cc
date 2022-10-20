import React from "react";
import "./Modal.css";
import { createPortal, ReactDOM } from "react-dom";
// We get hold of the div with the id modal that we have created in index.html
const modalRoot = document.getElementById("modal");
class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    // We create an element div for this modal
    this.element = document.createElement("div");
  }
  // We append the created div to the div#modal
  componentDidMount() {
    modalRoot.appendChild(this.element);
  }
  /**
   * We remove the created div when this Modal Component is unmounted
   * Used to clean up the memory to avoid memory leak
   */
  componentWillUnmount() {
    modalRoot.removeChild(this.element);
    console.log("unmounted");
  }

  render() {
    // Use a portal to render the children into the element
    console.log(this.props.disable);

    return createPortal(
      <div
        className="modal fade show"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        data-keyboard="false"
        data-backdrop="fade"
        style={{ display: "block" }}
        aria-modal="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {this.props.title}
              </h5>
              <button
                onClick={this.props.close}
                type="button"
                className="btn cancel-button button-focus"
                data-dismiss="modal"
              >
                CANCEL
              </button>
              <button
                type="button"
                className="submit-button button-focus"
                onClick={this.props.save}
                data-dismiss="modal"
                disabled={!this.props.disable}
              >
                SAVE
              </button>
            </div>
            <div className="modal-body">{this.props.children}</div>
          </div>
        </div>
      </div>,
      this.element
    );
  }
}
export default Modal;
