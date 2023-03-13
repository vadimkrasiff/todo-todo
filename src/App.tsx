import React, { useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import { Route, Routes } from 'react-router';
import { BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import store from './redux/store';
import {compose } from "redux";
import { setTasks } from './redux/tasks-reducer';
import { type } from 'os';
import Tasks from './components/Tasks/Tasks';
import { clearTasks } from './api/api';
import Footer from './components/Footer/Footer';
import CreateTask from './components/CreateTask/CreateTask';
import Task from './components/Task/Task';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';

interface Props {
  initialized: boolean;
  initializeApp: () => void;
}

let App: React.FC<Props> = ({initialized,initializeApp}) => {

  useEffect(()=> {initializeApp()}, [])

  return <>{initialized ? <div><Preloader/></div> :<div className="App">
      <Header />
      <div className='content'>

        <Routes>
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/task/:id' element={<Task />} />
          <Route path='/createtask' element={<CreateTask /> } />
          <Route path='/' element={<Navigate to="/tasks" replace />} />
          <Route path='*'element={<div>404 Not Found<Preloader/></div>}  />
        </Routes>
      </div>
      <footer><Footer /></footer>
    </div>}
    </> 
};

let mapStateToProps = (state:any) => ({
  initialized: state.app.initialized
});
const AppContainer = compose(connect(mapStateToProps, {initializeApp}))(App);

const ExportApp = () => {
  return<BrowserRouter>
  <Provider store={store}>
    <AppContainer />
  </Provider>
</BrowserRouter>
}

export default ExportApp;
