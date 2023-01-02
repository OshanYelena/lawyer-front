import React, { Fragment, useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteAnswer } from "../../../../redux/answers/answers.actions";
import axios from "axios";
import { ReactComponent as UpVote } from "../../../../assets/ArrowUpLg.svg";
import { ReactComponent as DownVote } from "../../../../assets/ArrowDownLg.svg";
import UserCard from "../../../../components/molecules/UserCard/UserCard.component";
import config from "../../../../config";
import "./AnswerItem.styles.scss";
import censorBadWords from "../../../../utils/censorBadWords";

const role = localStorage.getItem("role");
const token = localStorage.getItem("token");

const AnswerItem = ({
  deleteAnswer,
  answer: { answer, userName, lawyerId },
  questionId,
  post: { post },
  auth,
}) => {
  const [chat, setChat] = useState(false);
  const [chatId, setId] = useState("");

  const auth1 = useSelector((state) => state.auth);

  console.log("aydhf", auth1);

  const onCheck = async () => {
    const res = await axios.get(`${config.BASE_URL}/api/chat/check`, {
      headers: {
        token: token,
        body: questionId,
        id2: lawyerId,
      },
    });
    if (res.data.msg === "not created") {
    } else {
      console.log(res.data);
      setChat(true);
      setId(res.data._id);
    }
  };
  useEffect(() => {
    if (role === "client") {
      onCheck();
    }
  }, []);

  return (
    <Fragment>
      <div className="answer-layout">
        <div className="vote-cell">
          <div className="vote-container">
            <button
              className="vote-up"
              title="This answer is useful (click again to undo)"
            >
              <UpVote className="icon" />
            </button>
            <div className="vote-count fc-black-500">0</div>
            <button
              className="vote-down"
              title="This answer is not useful (click again to undo)"
            >
              <DownVote className="icon" />
            </button>
          </div>
        </div>
        <div className="answer-item">
          <div
            className="answer-content fc-black-800"
            dangerouslySetInnerHTML={{ __html: answer }}
          ></div>
          <div className="answer-actions">
            <div className="action-btns">
              <div className="answer-menu">
                <div className="answer-links">
                  Answer From - Lawyer {userName}
                </div>
                <div className="s-navigation">
                  {/* change for lawyers */}

                  {role === "lawyer" && auth1.user._id == lawyerId ? (
                    <>
                      {" "}
                      {auth1.isAuthenticated ? (
                        <>
                          {!chatId ? (
                            <>
                              {
                                <>
                                  {" "}
                                  <Link
                                    // to={`/lawyer/contact/${lawyerId}/${questionId}`}
                                    to={`/lawyer/request/${lawyerId}/${questionId}`}
                                    title="Follow this question to receive notifications"
                                    className="s-navigation--item is-selected"
                                  >
                                    Request for a Privert Chat
                                  </Link>
                                </>
                              }
                            </>
                          ) : (
                            <>
                              <Link
                                // to={`/lawyer/contact/${lawyerId}/${questionId}`}
                                to={`/lawyer/contact/${chatId}`}
                                title="Follow this question to receive notifications"
                                className="s-navigation--item is-selected"
                              >
                                Proceed to the chat
                              </Link>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <>
                            <Link
                              // to={`/lawyer/contact/${lawyerId}/${questionId}`}
                              to={`/login`}
                              title="Follow this question to receive notifications"
                              className="s-navigation--item is-selected"
                            >
                              Please Login
                            </Link>
                          </>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {!chatId ? (
                        <>
                          {
                            <>
                              {" "}
                              <Link
                                // to={`/lawyer/contact/${lawyerId}/${questionId}`}
                                to={`/lawyer/request/${lawyerId}/${questionId}`}
                                title="Follow this question to receive notifications"
                                className="s-navigation--item is-selected"
                              >
                                Request for a Privert Chat
                              </Link>
                            </>
                          }
                        </>
                      ) : (
                        <>
                          <Link
                            // to={`/lawyer/contact/${lawyerId}/${questionId}`}
                            to={`/lawyer/contact/${chatId}`}
                            title="Follow this question to receive notifications"
                            className="s-navigation--item is-selected"
                          >
                            Proceed to the chat
                          </Link>
                        </>
                      )}
                    </>
                  )}

                  {/* {role === "client" && auth1.user._id == lawyerId &&  (
                    <>
                      {" "}
                      {auth1.isAuthenticated ? (
                        <>
                          {!chatId  ? (
                            <>
                              {(
                                <>
                                  {" "}
                                  <Link
                                    // to={`/lawyer/contact/${lawyerId}/${questionId}`}
                                    to={`/lawyer/request/${lawyerId}/${questionId}`}
                                    title="Follow this question to receive notifications"
                                    className="s-navigation--item is-selected"
                                  >
                                    Request for a Privert Chat
                                  </Link>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <Link
                                // to={`/lawyer/contact/${lawyerId}/${questionId}`}
                                to={`/lawyer/contact/${chatId}`}
                                title="Follow this question to receive notifications"
                                className="s-navigation--item is-selected"
                              >
                                Proceed to the chat
                              </Link>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <>
                            <Link
                              // to={`/lawyer/contact/${lawyerId}/${questionId}`}
                              to={`/login`}
                              title="Follow this question to receive notifications"
                              className="s-navigation--item is-selected"
                            >
                              Please Login
                            </Link>
                          </>
                        </>
                      )}
                    </>
                  )} */}
                </div>
                {/* <Link
                  className="answer-links"
                  title="Follow this question to receive notifications"
                
                >
                  {console.log(lawyerId)}
                
                </Link> */}
                {/* {!auth.loading &&
                  auth.isAuthenticated &&
                  user_id === auth.user.id && (
                    <Link
                      className="s-link s-link__danger"
                      style={{ paddingLeft: "4px" }}
                      title="Delete the answer"
                      onClick={(e) => deleteAnswer(id)}
                      to={`/questions/${post.id}`}
                    >
                      delete
                    </Link>
                  )} */}
              </div>
            </div>
            {/* <UserCard
              created_at={created_at}
              user_id={user_id}
              gravatar={gravatar}
              username={username}
              dateType={"answered"}
              backgroundColor={"transparent"}
            /> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AnswerItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { deleteAnswer })(AnswerItem);
