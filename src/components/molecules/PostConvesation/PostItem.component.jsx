import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import LinkButton from "../LinkButton/LinkButton.component";

import censorBadWords from "../../../utils/censorBadWords";

import htmlSubstring from "../../../utils/htmlSubstring";
import injectEllipsis from "../../../utils/injectEllipsis";

import UserCard from "../UserCard/UserCard.component";
import TagBadge from "../TagBadge/TagBadge.component";

import "./PostItem.styles.scss";

const PostItem = ({ conver1, conver2 }) => {
  // const answerVoteUp = (
  //   <div className="vote answer">
  //     <span className="vote-count">{answer_count}</span>
  //     <div className="count-text">answers</div>
  //   </div>
  // );

  // const answerVoteDown = (
  //   <div className="vote">
  //     <span className="vote-count">{answer_count}</span>
  //     <div className="count-text">answers</div>
  //   </div>
  // );

  return (
    <div className="posts">
      <div className="stats-container fc-black-500">
        <div className="stats">
          {/* <div className="vote">
            <span className="vote-count">{comment_count}</span>
            <div className="count-text">comments</div>
          </div> */}
          {/* {answer_count > 0 ? answerVoteUp : answerVoteDown} */}
          <div className="vote">
            {/* <span className="vote-count">{tags.length}</span> */}
            <div className="count-text"> Coments</div>
          </div>
          {/* <div className="vote">
            <div className="count-text">{views} views</div>
          </div> */}
        </div>
      </div>
      <div className="summary">
        <h3>Lawyer Comments</h3>
        {conver2 &&
          conver2.map(() => {
            return( <>
            
              <div
                className="brief"
                // dangerouslySetInnerHTML={{
                //   __html: injectEllipsis(censorBadWords(htmlSubstring(body))),
                // }}
              >
                {" "}
                message 2
              </div>
              <div className="profile-tags">
                message -1
                {/* {tags.map((tag, index) => (
                  <TagBadge key={index} tag_name={tag.tagname} size={"s-tag"} />
                ))} */}
              </div>
              <LinkButton
              text={"Ask Question"}
              link={"/add/question"}
              type={"s-btn__primary"}
            />
            </>)
           
          })}

        {/* <UserCard
          created_at={created_at}
          user_id={user_id}
          gravatar={gravatar}
          username={username}
          float={"right"}
          backgroundColor={"transparent"}
        /> */}
      </div>
      <div className="summary">
        <h3>Client Comments</h3>
        {conver1 &&
          conver1.map(() => {
           return(<>
              <div
                className="brief"
                // dangerouslySetInnerHTML={{
                //   __html: injectEllipsis(censorBadWords(htmlSubstring(body))),
                // }}
              >
                {" "}
                message 2
              </div>

              <div className="profile-tags">
                message -1
                {/* {tags.map((tag, index) => (
                  <TagBadge key={index} tag_name={tag.tagname} size={"s-tag"} />
                ))} */}
              </div>
              <LinkButton
                text={"Ask Question"}
                link={"/add/question"}
                type={"s-btn__primary"}
              />
            </>)
          })}

        {/* <UserCard
          created_at={created_at}
          user_id={user_id}
          gravatar={gravatar}
          username={username}
          float={"right"}
          backgroundColor={"transparent"}
        /> */}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default connect(null)(PostItem);
