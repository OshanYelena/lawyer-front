import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthForm from "../../components/organisms/AuthForm/AuthForm.component";
import Footer from "../../components/organisms/Footer/Footer.component";
import config from "../../config";

const token = localStorage.getItem("token");

const RequestChat = ({ isAuthenticated }) => {
  const { id, id1 } = useParams();
  //   if (isAuthenticated) {
  //     return <Redirect to="/" />;
  //   }
  const [verify, setVerify] = useState(false);
  console.log(token)

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${config.BASE_URL}/api/chat/create`, {
      token: token,
      id: id1,
      id1: id,
      appointmentBody: form,
    });
    if (res.data.msg === "Chat Request Send") {
      setVerify(true);
    }
  };
  const formData = Object.freeze({
    name: "",
    email: " ",
    time: "",
  });

  const [form, setForm] = useState(formData);

  const onChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    console.log(form);
  };

  return (
    <Fragment>
      <div className="">
        <div className="register-content">
          <div className="">
            <Fragment>
              <div>
                {!verify ? (
                  <div className="form-container">
                    <div className="text-center s-label">
                      Privet Chat Request Form
                    </div>
                    <form className="login-form" onSubmit={(e) => onSubmit(e)}>
                      <div>
                        <label className="form-label s-label fc-black-600">
                          Your Question Id
                        </label>
                        <input
                          className="form-input s-input"
                          type="text"
                          name="email"
                          value={id1}
                          // onChange={(e) => onChange(e)}
                          id="email"
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label s-label fc-black-600">
                          Requested Lawyer Id
                        </label>
                        <input
                          className="form-input s-input"
                          value={id}
                          // onChange={(e) => onChange(e)}
                          id="text"
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label s-label fc-black-600">
                          Your Email Address
                        </label>
                        <input
                          className="form-input s-input"
                          // value={id1}
                          onChange={(e) => onChange(e)}
                          id="email"
                          type="email"
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label s-label fc-black-600">
                          Your Name
                        </label>
                        <input
                          className="form-input s-input"
                          // value={id1}
                          onChange={(e) => onChange(e)}
                          id="name"
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label s-label fc-black-600">
                          Requested Time Slot
                        </label>
                        <input
                          className="form-input s-input"
                          // value={id1}
                          id="time"
                          onChange={(e) => onChange(e)}
                          // id="text"
                          type={"date"}
                          required
                        />
                      </div>
                      <div className="grid gs4 gsy fd-column js-auth-item ">
                        <button
                          className="s-btn s-btn__primary"
                          id="submit-button"
                          name="submit-button"
                        >
                          Send Request
                        </button>
                      </div>
                    </form>
                    {/* <div className="fs-caption license fc-black-500">
                    <input type="hidden" name="legalLinksShown" value="1" />
                  </div> */}
                  </div>
                ) : (
                  <>
                    {" "}
                    <div className="text-center s-label">
                      Privet Chat Request Send! Wait for the Verification
                    </div>
                  </>
                )}
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

RequestChat.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(RequestChat);
