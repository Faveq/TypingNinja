import "../Styles/Settings.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
const Settings = (props) => {
  const { currentSoundIndex, updateSoundIndex } = props;

  const clickSoundsNames = ["NONE", "OSU", "CLICK"];
  const [cookies, setCookie] = useCookies([]);

  useEffect(() => {
    const cookieToast = document.getElementById("cookieToast");

      const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(cookieToast);

        toastBootstrap.show();
    
    return () => {};
  }, []);

  const clearCookies = () => {
    const cookiesModal = document.getElementById("cookiesModal");
    for (const cookieName in cookies) {
      if (cookies.hasOwnProperty(cookieName)) {
        setCookie(cookieName, 0, { path: "/" });
      }
    }
  };

  return (
    <div className="container">
      <div className="sounds-settings">
        <h3>Sound</h3>
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
        <div className="cookies-settings">
          <h3>Cookies</h3>

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
                    Confirm deleting cookies
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  You'll lose record and settings
                </div>
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

          <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div
              id="cookieToast"
              class="toast"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div class="toast-header">
                <img class="rounded me-2" alt="..." />
                <strong class="me-auto">Bootstrap</strong>
                <small>11 mins ago</small>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
              <div class="toast-body">
                Hello, world! This is a toast message.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
