import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../../redux/auth/auth.actions";
import { registerClient } from "../../../redux/auth/auth.actions";

import { ReactComponent as Logo } from "../../../assets/LogoGlyphMd.svg";
import { ReactComponent as ExternalLink } from "../../../assets/ExternalLink.svg";

import "./AuthForm.styles.scss";

const AuthFormCLient = ({ registerClient, login, action }) => {

    
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const { username, password, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    registerClient({ username, password, email });
  };

  return (
    <Fragment>
      <div>
        <div className="form-container">
          <div className="text-center s-label">Client Register</div>
          <form className="login-form" onSubmit={(e) => onSubmit(e)}>
            <div>
              <label className="form-label s-label fc-black-600">
                Username
              </label>
              <input
                className="form-input s-input"
                type="text"
                name="username"
                value={username}
                onChange={(e) => onChange(e)}
                id="username"
                required
              />
            </div>
            <div>
              <label className="form-label s-label fc-black-600">Email</label>
              <input
                className="form-input s-input"
                type="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                id="email"
                required
              />
            </div>
            <div>
              <label className="form-label s-label fc-black-600">
                Password
              </label>
              <input
                className="form-input s-input"
                type="password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                id="password"
                required
              />
            </div>
            <div className="grid gs4 gsy fd-column js-auth-item ">
              <button
                className="s-btn s-btn__primary"
                id="submit-button"
                name="submit-button"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="fs-caption license fc-black-500">
            <input type="hidden" name="legalLinksShown" value="1" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AuthFormCLient.propTypes = {
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, registerClient })(AuthFormCLient);
