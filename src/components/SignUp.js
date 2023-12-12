import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slice/auth";
import { useNavigate } from "react-router-dom";

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

const SignUp = () => {
  const { loading, error, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pwd: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    pwd: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors =
      errors.email.length || errors.name.length || errors.pwd.length;

    if (!hasErrors) {
      sendData(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regexp = () => {
      switch (name) {
        case "name":
          return /^[a-zA-Z0-9_]*$/;
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
    const { name, email, pwd } = data;

    dispatch(registerUser({ name, email: email.toLowerCase(), password: pwd }));
  };

  return (
    <Content>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Ім'я (латиниця):</p>
          <input
            type="text"
            placeholder="Ім'я"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <span className="error">{errors.name}</span>
        </label>
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
          <p>Пароль (min 5 літер та 3 цифр):</p>
          <input
            type="password"
            placeholder="Пароль"
            name="pwd"
            value={formData.pwd}
            onChange={handleChange}
            required
          />
          <span className="error">{errors.pwd}</span>
        </label>
        <Button disabled={loading}>Зареєструватись</Button>
        {success ? "" : <p className="error">{error}</p>}
      </form>
    </Content>
  );
};

export default SignUp;
