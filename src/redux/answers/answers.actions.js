import { setAlert } from "../alert/alert.actions";
import {
  GET_ANSWERS,
  ANSWER_ERROR,
  ADD_ANSWER,
  DELETE_ANSWER,
} from "./answers.types";
import {  deleteSingleAnswer } from "../../api/answersApi";
import axios from "axios";

import { createSingleAnswer, allAnswersData } from "../../api/urls";

export const getAnswers = (id) => async (dispatch) => {
  try {

    const res = await axios.get(`${allAnswersData}/${id}`);
    console.log("aaygsdyga",res)
    dispatch({
      type: GET_ANSWERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
      
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Answer
export const addAnswer = ({postId, formBody, userId, userName}) => async (dispatch) => {
  try {
    console.log(postId, formBody, userId)
    const body = JSON.stringify({ postId, formBody, userId, userName });

    const config_headers = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const res = await axios.post(createSingleAnswer, body, config_headers);

    dispatch({
      type: ADD_ANSWER,
      payload: res.data,
    });

    dispatch(setAlert(res.data.msg, "success"));

    dispatch(getAnswers(postId));
  } catch (err) {
    console.log(err)
    dispatch(setAlert(err.response.data.msg, "danger"));

    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Answer
export const deleteAnswer = (AnswerId) => async (dispatch) => {
  try {
    const res = await deleteSingleAnswer(AnswerId);

    dispatch({
      type: DELETE_ANSWER,
      payload: AnswerId,
    });

    dispatch(setAlert(res.data.message, "success"));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"));

    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
