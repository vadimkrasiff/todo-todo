import React from 'react';
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

function App() {

  // clearTasks()
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="App">
      <Header />
      <div className='content'>

        <Routes>
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/task/:id' element={<Task />} />
          <Route path='/createtask' element={<CreateTask /> } />
          <Route path='/' element={<Navigate to="/tasks" replace />} />
          <Route path='*'element={<div>404 Not Found</div>}  />
        </Routes>
      </div>
      <footer><Footer /></footer>
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
