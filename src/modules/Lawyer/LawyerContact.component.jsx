import React, { Fragment, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getPosts } from "../../redux/posts/posts.actions";
import PostItem from "../../components/molecules/PostConvesation/PostItem.component";
import Spinner from "../../components/molecules/Spinner/Spinner.component";
import handleSorting from "../../utils/handleSorting";
import Pagination from "../../components/organisms/Pagination/Pagination.component";
import ButtonGroup from "../../components/molecules/ButtonGroup/ButtonGroup.component";
import handleFilter from "../../utils/handleFilter";

import { ChatBubble, BubbleGroup, Message } from "react-chat-ui";
import axios from "axios";
import config from "../../config";
import "./lawyer.styles.scss";

import {
  GET_COMMENTS,
  COMMENT_ERROR,
  ADD_COMMENT,
  CRT_CONVER,
  DELETE_COMMENT,
} from "../../redux/comments/comments.types";

const api = axios.create({
  baseURL: config.BASE_URL,
});
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const itemsPerPage = 10;

const HomePage = ({ getPosts, post: { posts, loading } }) => {
  const { id, } = useParams();

  const [role1, setRole] = useState();
  const [start, setStart] = useState(false);
  const [up, setUp] = useState(false);
  const [lawyer, setLawyer] = useState("");
  const [client, setClient] = useState("");

  const auth = useSelector((state) => state.auth.user);

  const [conver, setConver] = useState([
    {
      id: 0,
      message: "Hey guys!",
    },
  ]);

  const [conver2, setConver2] = useState([
    {
      id: 0,
      message: "Hey guys!",
    },
    { id: 0, message: "Hey guys!212" },
  ]);

  const [formData, setFormData] = useState({
    message: "",
    index: 0,
  });

  const { message, index } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onSubmitLaw = async (e) => {
    setUp(false);
    e.preventDefault();
    const res = await api.post("/api/chat/conversation/lawyer", {
      id,
      token,
      formData,
    });
    setUp(true);
    console.log(res);
  };

  const onSubmit = async (e) => {
    setUp(false);
    e.preventDefault();
    const res = await api.post("/api/chat/conversation/client", {
      id,
      token,
      formData,
    });
    setUp(true);
    console.log(res);
  };

  const getconversation = async () => {
    const res = await api.get("/api/chat/create", {
      headers: {
        token: token,
        id: id,
      },
    });
    console.log("hello",res)

    setClient(res.data.clientName);
    setLawyer(res.data.lawyerName);

    if (res.data.clientMessager === null) {
      setStart(true);
    } else {
      console.log(res.data.clientMessager.length);
      if (res.data.clientMessager.length !== 0) {
        setConver2(res.data.clientMessager);
      }
      if (res.data.lawyerMessager.length !== 0) {
        setConver(res.data.lawyerMessager);
      }
    }
  };

  useEffect(() => {
    getconversation();
    setRole(role);
    getPosts();
  }, [up]);

  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState("Month");

  const handlePaginationChange = (e, value) => setPage(value);

  return loading || posts === null ? (
    <Spinner type="page" width="75px" height="200px" />
  ) : (
    <Fragment>
      <div id="mainbar" className="homepage fc-black-800">
        <div className="questions-grid">
          <h3 className="questions-headline">Discussion</h3>
          <div className="questions-btn"></div>
        </div>
        {/* <label htmlFor=""> From Lawyer - {lawyer}</label> */}
        
        
        <div className="container">
          <BubbleGroup
            messages={conver.map((item) => {
              return new Message({ message: item.message });
            })}
            showSenderName={true}
            senderName={"Lawyer " + lawyer}
          />

          {role1 === "lawyer" && (
            <form onSubmit={(e) => onSubmitLaw(e)}>
              <input
                className="tag-input-1 s-input"
                type="text"
                name="message"
                // value={tagname}
                onChange={(e) => onChange(e)}
                id="message"
                placeholder="e.g. (ajax, django, string)"
                required
              />
              {
                <div className="post-button mt32">
                  <button
                    className="s-btn s-btn__primary"
                    id="submit-button"
                    name="submit-button"
                  >
                    Send the Message
                  </button>
                </div>
              }
            </form>
          )}
          <BubbleGroup
            messages={conver2.map((item) => {
              return new Message({ id: 0, message: item.message });
            })}
            id={0}
            showSenderName={true}
            senderName={"Client" + client}
            
          />
        </div>




        {role1 === "client" && (
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              className="tag-input-1 s-input"
              type="text"
              name="message"
              value={message}
              onChange={(e) => onChange(e)}
              id="message"
              placeholder="e.g. (ajax, django, string)"
              required
            />
            <div className="post-button mt32">
              <button
                className="s-btn s-btn__primary"
                id="submit-button"
                name="submit-button"
              >
                Send the Message
              </button>
            </div>
          </form>
        )}
        <Pagination
          page={page}
          itemList={posts
            .sort(handleSorting(sortType))
            .filter(handleFilter(sortType))}
          itemsPerPage={itemsPerPage}
          handlePaginationChange={handlePaginationChange}
        />
      </div>
    </Fragment>
  );
};

HomePage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  data: console.log(state.post.posts),
});

export default connect(mapStateToProps, { getPosts })(HomePage);
