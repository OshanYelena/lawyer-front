import React, { Fragment, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthForm from "../../components/organisms/AuthForm/AuthForm.component";
import Footer from "../../components/organisms/Footer/Footer.component";
import config from "../../config";

const role = localStorage.getItem("role");

const AcceptChat = ({ isAuthenticated }) => {
  const { token } = useParams();

  const [chat, setChat] = useState();

  //   if (isAuthenticated) {
  //     return <Redirect to="/" />;
  //   }

  useEffect(() => {
    onSubmit();
  }, []);

  const onSubmit = async () => {
    const res = await axios.post(`${config.BASE_URL}/api/chat/activate`, {
      token: token,
    });
    console.log(res);
    setChat(res.data.conver);

    if (res.data.msg === "Conversation Created") {
      alert("appointment Accepted");
    }
  };

  return (
    <Fragment>
      <div className="">
        <div className="register-content">
          <div className="">
            <Fragment>
              <div>
                <div className="form-container">
                  <div className="text-center s-label">Appointment Created</div>

                  <div>
                    {role === "lawyer" ? (
                      <>
                        {" "}
                        <Link to={`/lawyer/contact/${chat}`}>
                          <button>To the Chat</button>
                        </Link>
                      </>
                    ) : (
                      <>
                        {" "}
                        <Link to={`/login`}>
                          <button>Login</button>
                        </Link>
                      </>
                    )}
                  </div>

                  {/* <div className="fs-caption license fc-black-500">
                    <input type="hidden" name="legalLinksShown" value="1" />
                  </div> */}
                </div>
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AcceptChat.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(AcceptChat);
