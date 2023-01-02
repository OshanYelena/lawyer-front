import config from "../config";

// Users
export const usersData = config.BASE_URL + '/api/users/user';
export const profileData = config.BASE_URL + '/api/users/{id}';

// Auth
export const loadUserData = config.BASE_URL + '/api/auth/user';
export const register_Client = config.BASE_URL + '/api/users/client';
export const register_Lawyer = config.BASE_URL + '/api/users/lawyer';
export const loginUser = config.BASE_URL + '/api/auth/login';

// Posts
export const allPostsData = config.BASE_URL + '/api/posts';
export const single_PostData = config.BASE_URL + '/api/posts/';
export const allTagPostsData = config.BASE_URL + '/api/posts/tag/{tagName}';
export const createSinglePost = config.BASE_URL + '/api/posts';
export const deleteSinglePost = config.BASE_URL + '/api/posts/{id}';

// Answers
export const allAnswersData = config.BASE_URL + '/api/posts/answers/';
export const createSingleAnswer = config.BASE_URL + '/api/posts/answers';
export const deleteSingleAnswer = config.BASE_URL + '/api/posts/answers/{AnswerId}';

// Comments
export const allCommentsData = config.BASE_URL + '/api/posts/comments/{id}';
export const createSingleComment = config.BASE_URL + '/api/posts/comments/{postId}';
export const deleteSingleComment = config.BASE_URL + '/api/posts/comments/{CommentId}';

// Tags
export const allTagsData = config.BASE_URL + '/api/tags';
export const singleTagData = config.BASE_URL + '/api/tags/{tagName}';