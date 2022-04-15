import logo from './logo.svg';
import './App.css';
import React from "react"
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { TodosCreate } from "./Components/TodosCreate";
import { Signup } from './Components/Signup';
const PrivateRoute = ({isAuthenticated, children}) => {
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  const {isAuthenticated} = useSelector((state) => state.login);


  return (
    <div className="App">
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to={"/signup"}>SingUp</Link>
        <Link to="/todos-create">Create_Todos</Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/todos-create"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <TodosCreate />
            </PrivateRoute>
          }
        ></Route>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='*' element={"404 not found"}/>
      </Routes>
    </div>
  );
}

export default App;
