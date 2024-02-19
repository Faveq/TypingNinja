import "../Styles/Settings.css";
import React from "react";
import { useCookies } from "react-cookie";
/* global bootstrap */

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
const Settings = (props) => {
  const { currentSoundIndex, updateSoundIndex } = props;

  const clickSoundsNames = ["NONE", "OSU", "CLICK"];
  const [cookies, setCookie] = useCookies([]);

  const clearCookies = () => {
    const cookieToast = document.getElementById("cookieToast");

    for (const cookieName in cookies) {
      if (cookies.hasOwnProperty(cookieName)) {
        setCookie(cookieName, 0, { path: "/" });
      }
    }
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(cookieToast);
    console.log(toastBootstrap);
    toastBootstrap.hide();
    toastBootstrap.show();
  };

  return (
    <div className="container offset-md-3">
      <div className="sounds-settings">
        <h4>Sound</h4>
        <div className="sound-buttons">
          {clickSoundsNames.map((value, key) => (
            <button
              className={
                key === currentSoundIndex
                  ? "btn btn-primary active"
                  : "btn btn-outline-primary"
              }
              key={key}
              name={key}
              onClick={() => updateSoundIndex(key)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <div className="cookies-settings">
        <h4>Cookies</h4>

        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#cookiesModal"
          className="btn btn-outline-danger"
        >
          Clear cookies
        </button>

        <div
          className="modal fade"
          id="cookiesModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Are you sure?
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">You'll lose record and settings</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={clearCookies}
                >
                  Clear cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="cookieToast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-delay="1500"
        >
          <div className="toast-header">
            <strong className="me-auto">Success</strong>
            <small>Now</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">Cookies cleared</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
