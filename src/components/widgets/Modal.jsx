import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Modal extends Component {
  get modalBody() {
    const {
      modalTitle,
      showFooter,
      showSaveBtn,
      disableSaveBtn,
      saveBtnText,
      onSave,
      onClose,
      children
    } = this.props;
    const style = {
      display: "block",
      paddingRight: "15px",
      backgroundColor: "rgba(0,0,0,0.5)",
      animation: 'fadeIn 0.4s linear'
    };

    return (
      <div className="modal" style={ style }>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{ modalTitle }</h4>
              <button type="button" className="close" onClick={onClose}>
                &times;
              </button>
            </div>
            <div className="modal-body" style={{ paddingLeft: '25px', paddingRight: '25px' }}>{ children }</div>
            { showFooter && (
              <div className="modal-footer">
                { showSaveBtn && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onSave}
                    disabled={disableSaveBtn}
                  >
                    { saveBtnText }
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={ onClose }
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return ReactDOM.createPortal(this.modalBody, document.body);
  }
}

Modal.propTypes = {
  modalTitle: PropTypes.string,
  showFooter: PropTypes.bool,
  showSaveBtn: PropTypes.bool,
  disableSaveBtn: PropTypes.bool,
  saveBtnText: PropTypes.string,
  onSave: PropTypes.func,
  onClose: PropTypes.func
};

Modal.defaultProps = {
  showFooter: true,
  showSaveBtn: false,
  saveBtnText: "Save"
};

export default Modal;
