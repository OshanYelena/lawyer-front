import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {Switch} from 'react-router-dom';

import store, { presistor } from "./redux/store";
import setAuthToken from './redux/auth/auth.utils';
import {loadUser} from './redux/auth/auth.actions';

import Header from './components/organisms/Header/Header.component';
import Alert from './components/Alert/Alert.component';
import HomePage from './modules/HomePage/HomePage.component';
import QuestionsPage from './modules/QuestionsPage/QuestionsPage.component';
import ChatAcceptComponent from './modules/chatRequest/ChatAccept.component';
import AllTagsPage from './modules/AllTagsPage/AllTagsPage.component';
import RegisterLawyer from './modules/Register/RegisterLawyer.component';
import AllUsersPage from './modules/AllUsersPage/AllUsersPage.component';
import Register from './modules/Register/Register.component';
import RegisterClient from './modules/Register/RegisterClient.component';
import LawyerContactComponent from './modules/Lawyer/LawyerContact.component';

import RequestComponent from './modules/chatRequest/Request.component';

import Login from './modules/Login/Login.component';
import Post from './modules/Post/Post.component';
import PostForm from './modules/PostForm/PostForm.component';
import TagPage from './modules/TagPage/TagPage.component';
import ProfilePage from './modules/ProfilePage/ProfilePage.component';
import NotFound from './modules/NotFound/NotFound.component';

import { BaseRoute, LayoutRoute } from './Router';

import { PersistGate } from "redux-persist/integration/react";

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={presistor}>
      <div className='App'>
        <Header />
        <Alert />
        <Switch>
          <LayoutRoute
            exact
            path='/'
            title='Know The Rules - Where Developers Learn, Share, & Build Careers'
          >
            <HomePage/>
          </LayoutRoute>
          <LayoutRoute
            exact
            path='/questions'
            title='All Questions - Know The Rules'
          >
            <QuestionsPage/>
          </LayoutRoute>
          <LayoutRoute
            exact
            path='/chat-request/activation/:token'
            title='All Questions - Know The Rules'
          >
            <ChatAcceptComponent/>
          </LayoutRoute>
          <LayoutRoute
            exact
            path='/tags'
            title='Tags - Know The Rules'
          >
            <AllTagsPage/>
          </LayoutRoute>
          <LayoutRoute
            exact
            path='/users'
            title='Users - Know The Rules'
          >
            <AllUsersPage/>
            
          </LayoutRoute>
          <LayoutRoute
            exact
            path='/lawyer/contact/:id'
            title='Users - Know The Rules'
          >
            <LawyerContactComponent/>
            
          </LayoutRoute>
          <LayoutRoute
            exact
            path='/lawyer/request/:id/:id1'
            title='Users - Know The Rules'
          >
            <RequestComponent/>
            
          </LayoutRoute>
          <BaseRoute
            exact
            path='/login'
            title='Log In - Know The Rules'
          >
            <Register/>
          </BaseRoute>
          <BaseRoute
            exact
            path='/register/client'
            title='Sign Up - Know The Rules'
          >
            <RegisterClient/>
          </BaseRoute>
          <BaseRoute
            exact
            path='/register/lawyer'
            title='Sign Up - Know The Rules'
          >
            <RegisterLawyer/>
          </BaseRoute>
          <BaseRoute
            exact
            path='/login'
            title='Log In - Know The Rules'
          >
            <Login/>
          </BaseRoute>
          <LayoutRoute
            exact
            path='/questions/:id'
            title='Users - Know The Rules'
          >
            <Post/>
          </LayoutRoute>
          <LayoutRoute
            exact
            path='/users/:id'
            title='Users - Know The Rules'
          >
            <ProfilePage/>
          </LayoutRoute>
          <LayoutRoute
            exact
            path='/tags/:tagname'
            title='Users - Know The Rules'
          >
            <TagPage/>
          </LayoutRoute>
          <BaseRoute
            exact
            path='/add/question'
            title='Ask a Question - Know The Rules'
          >
            <PostForm/>
          </BaseRoute>
          <BaseRoute
            path='*'
            title='Error 404'
          >
            <NotFound/>
          </BaseRoute>
        </Switch>
      </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
