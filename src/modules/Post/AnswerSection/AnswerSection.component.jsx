import React, { Fragment, useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getAnswers } from "../../../redux/answers/answers.actions";
import handleSorting from "../../../utils/handleSorting";
import { useParams } from "react-router-dom";
import AnswerItem from "./AnswerItem/AnswerItem.component";
import Spinner from "../../../components/molecules/Spinner/Spinner.component";
import AnswerForm from "./AnswerForm/AnswerForm.component";
import ButtonGroup from "../../../components/molecules/ButtonGroup/ButtonGroup.component";
import axios from "axios";
import "./AnswerSection.styles.scss";
import config from "../../../config";

const token = localStorage.getItem("token");


const AnswerSection = ({ getAnswers, post: { post }, userType }) => {
  const answer = useSelector((state) => state.answer);
  const lawyer = useSelector((state) => state.auth.user);
  const role = localStorage.getItem("role");
  const { id } = useParams();

  const [chat, setChat] = useState(false);
  const [chatId, setId] = useState("");

  const onCheck = async () => {
    if (role === "client") {
      const res = await axios.get(`${config.BASE_URL}/api/chat/check`, {
        headers: {
          token: token,
          id2: answer.lawyer.id,
          body: answer.id,
        },
      });

      if (res.data.msg === "not created") {
      } else {
        console.log(res.data);
        setChat(true);
        setId(res.data._id);
      }
      console.log("aksdhasavdavhsdubabd",res)
    }
  };

  useEffect(() => {
    getAnswers(id);
    // onCheck();
    // eslint-disable-next-line
  }, [getAnswers]);

  const [sortType, setSortType] = useState("Newest");

  return (
    <Fragment>
      <div className="answer">
        <div className="answer-header fc-black-800">
          <div className="answer-sub-header">
            <div className="answer-headline">
              <h2>Answers</h2>
            </div>
            <ButtonGroup
              buttons={["Newest", "Oldest"]}
              selected={sortType}
              setSelected={setSortType}
            />
          </div>
        </div>
        {answer.loading === null ? (
          <Spinner width="25px" height="25px" />
        ) : (
          answer.answers?.sort(handleSorting(sortType)).map((answer, index) => (
            <>
              {role === "lawyer" && answer.lawyerId === lawyer._id && (
                <div key={index} className="answers">
                  <AnswerItem questionId={id}  answer={answer} />
                </div>
              )}
              <div key={index} className="answers">
                {console.log(answer)},
                <AnswerItem questionId={id}  answer={answer} />
              </div>
              {/* {role === "client"  && (
                <div key={index} className="answers">
                  {console.log(answer)},
                  <AnswerItem questionId={id} answer={answer} />
                </div>
              )} */}
            </>
          ))
        )}
        {userType && userType === "lawyer" && (
          <div className="add-answer">
            <AnswerForm />
          </div>
        )}
      </div>
    </Fragment>
  );
};

AnswerSection.propTypes = {
  getAnswers: PropTypes.func.isRequired,
  answer: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  answer: state.answer,
  post: state.post,
  userType: state.auth.role,
});

export default connect(mapStateToProps, { getAnswers })(AnswerSection);
