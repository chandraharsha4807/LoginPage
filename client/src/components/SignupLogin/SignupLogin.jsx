import React, { useState } from "react";
import "./SignupLogin.css";
import { FaUserAstronaut } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import userServices from "../../services/userServices";

const SignupLogin = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const inputFields = [
    {
      icon: <FaUserAstronaut className="input-icon" />,
      type: "text",
      modelValue: name,
      placeholder: "Name",
      condition: action !== "Login",
      functionName: setName,
      errorMsg: errors.name,
    },
    {
      icon: <MdContactMail className="input-icon" />,
      type: "email",
      modelValue: email,
      placeholder: "Email Id",
      condition: true,
      functionName: setEmail,
      errorMsg: errors.email,
    },
    {
      icon: <TbPasswordUser className="input-icon" />,
      type: "password",
      modelValue: password,
      placeholder: "Password",
      condition: true,
      functionName: setPassword,
      errorMsg: errors.password,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const validateForm = () => {
    const error = {};

    if (!email) {
      error.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.email = "Email not matched";
    }

    if (!password) {
      error.password = "Password is required";
    } else if (password.length < 6) {
      error.password = "Length should be greater > 6";
    }
    if (action === "Sign Up") {
      if (!name) {
        error.name = "Name is required";
      }
    }

    return error;
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setName("");
    setErrors([]);
  };
  const handleForgetPass = () => {
    console.log("change")
  }
  const handleRegisteration = (value) => {
    resetFields();
    setAction(value);
  };

  const handleSignUp = async () => {
    try {
      const payload = {
        name: name,
        userName: name,
        email: email,
        password: password,
        status: "Active",
      };
      const data = await userServices.validateAndSignUpUser(payload);
      if (data?.data && data?.data?.status === "SUCCESS") {
        handleRegisteration("Login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async () => {
    try {
      const payload = { email: email, password: password };
      const data = await userServices.validateAndLogin(payload);
      if (data?.data && data?.data?.status === "SUCCESS") {
        resetFields();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleFormSubmit = () => {
    const errors = validateForm();
    setErrors(errors);
    if (Object.keys(errors).length === 0 && action === "Sign Up") {
      handleSignUp();
    } else if (Object.keys(errors).length === 0 && action === "Login") {
      handleLogin();
    }
  };

  return (
    <div className="wrapper-container">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="header">
            <span className="text">{action}</span>
            <span className="underline"></span>
          </div>

          <div className="inputs">
            {inputFields.map(
              (field, index) =>
                field.condition && (
                  <div className="input-field-container" key={index}>
                    {field.icon}
                    <div>
                      <input
                        type={field.type}
                        value={field.modelValue}
                        className="input-field"
                        placeholder={field.placeholder}
                        onChange={(e) => {
                          field.functionName(e.target.value);
                        }}
                      />
                      <div className="error-msg">{field.errorMsg}</div>
                    </div>
                  </div>
                )
            )}
          </div>

          {action === "Sign Up" ? (
            ""
          ) : (
            <div className="forgot-password">
              Forgot Password ? <span onClick={() =>  handleForgetPass()}>Click here</span>
            </div>
          )}

          <div className="submit-container">
            <div
              className="submit-btn"
              onClick={() => {
                handleFormSubmit();
              }}
            >
              {action}
            </div>
          </div>

          {action === "Login" ? (
            <div className="forgot-password">
              Don't have account ?{" "}
              <span
                onClick={() => {
                  handleRegisteration("Sign Up");
                }}
              >
                register
              </span>
            </div>
          ) : (
            <div className="forgot-password">
              Already have account ?{" "}
              <span
                onClick={() => {
                  handleRegisteration("Login");
                }}
              >
                login
              </span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignupLogin;
