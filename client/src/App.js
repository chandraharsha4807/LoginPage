import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupLogin from "./components/SignupLogin/SignupLogin.jsx";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" exact element={<SignUpLoginView />} />
        </Routes>
      </main>
    </Router>
  );
}

const SignUpLoginView = () => {
  return (
    <Fragment>
      <div className="app-container">
        <SignupLogin />
      </div>
    </Fragment>
  );
};

export default App;
