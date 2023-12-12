import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginUser } from "../store/slice/auth";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  h2 {
    font-family: Merriweather;
    font-size: 28px;
    font-weight: 700;
    line-height: 34px;
    letter-spacing: 0px;
    text-align: left;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin-top: 2em;
    label {
      display: flex;
      flex-direction: column;
      p {
        font-family: Merriweather;
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0px;
        text-align: left;
      }
      input {
        padding: 0.8em 1.2em;
        border: 2px solid #e0e0e0;
        border-radius: 5px;
        background: #e0e0e0;
        color: #172234;

        font-family: Lato;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0px;
        text-align: left;
      }
      span {
        padding-left: 1.2em;
      }
      & + p {
        color: #b29f7e;
        font-family: Lato;
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
        letter-spacing: 0px;
        text-align: right;
      }
    }
    & + p {
      font-family: Lato;
      font-size: 14px;
      font-weight: 600;
      line-height: 22px;
      letter-spacing: 0px;
      text-align: center;
      span {
        color: #b29f7e;
      }
    }
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  border: 1px solid #fff;
  background: #b29f7e;
  color: #fff;
  padding: 0.5em 1.5em;
  border-radius: 5px;

  font-family: Merriweather;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: center;
`;
const Login = () => {
  const { loading, error, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = errors.email.length || errors.password.length;

    if (!hasErrors) {
      sendData(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regexp = () => {
      switch (name) {
        case "email":
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        case "pwd":
          return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        default:
          return;
      }
    };

    !value.match(regexp())
      ? setErrors((prevErrorsData) => {
          return {
            ...prevErrorsData,
            [name]: `${name} не валідне`,
          };
        })
      : setErrors((prevErrorsData) => {
          return {
            ...prevErrorsData,
            [name]: "",
          };
        });

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const sendData = (data) => {
    const { email, password } = data;
    dispatch(loginUser({ email: email.toLowerCase(), password }));
  };

  return (
    <Content>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email:</p>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <span className="error">{errors.email}</span>
        </label>
        <label>
          <p>Password:</p>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="error">{errors.password}</span>
        </label>
        <p>Forgot password?</p>
        <Button disabled={loading}>Sign In</Button>
        {success ? "" : <p className="error">{error}</p>}
      </form>
      <p>
        Don’t have account?
        <span onClick={() => navigate("/signup")}> Sign Up</span>
      </p>
    </Content>
  );
};

export default Login;
