import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../../redux/auth/auth.actions';
import {registerLawyer} from '../../../redux/auth/auth.actions';

import {ReactComponent as Logo} from '../../../assets/LogoGlyphMd.svg';
import {ReactComponent as ExternalLink} from '../../../assets/ExternalLink.svg';

import './AuthForm.styles.scss';

const LawyerAuthForm = ({registerLawyer, login, action}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email:""
  });

  const {username, password, email} = formData;

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
      registerLawyer({username, password, email});

  };

  return (
    <Fragment>
      <div>
        <div className='form-container'>
            <div className='text-center s-label'>Lawyer Register</div>
          <form className='login-form' onSubmit={(e) => onSubmit(e)}>
            <div>
              <label className='form-label s-label fc-black-600'>
                Username
              </label>
              <input
                className='form-input s-input'
                type='text'
                name='username'
                value={username}
                onChange={(e) => onChange(e)}
                id='username'
                required
              />
            </div>
            <div>
              <label className='form-label s-label fc-black-600'>
                Email
              </label>
              <input
                className='form-input s-input'
                type='email'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                id='email'
                required
              />
            </div>
            <div>
              <label className='form-label s-label fc-black-600'>
                Password
              </label>
              <input
                className='form-input s-input'
                type='password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                id='password'
                required
              />
            </div>
            {/* <div>
              <label className='form-label s-label fc-black-600'>
                Location
              </label>
              <input
                className='form-input s-input'
                type='password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                id='password'
                required
              />
            </div> */}
            <div className='grid gs4 gsy fd-column js-auth-item '>
              <button
                className='s-btn s-btn__primary'
                id='submit-button'
                name='submit-button'
              >
                {action}
              </button>
            </div>
          </form>
        </div>

      </div>
    </Fragment>
  );
};

LawyerAuthForm.propTypes = {
    registerLawyer: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  s :console.log(state)
});

export default connect(mapStateToProps, {login, registerLawyer})(LawyerAuthForm);
