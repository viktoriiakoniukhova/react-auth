import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../store/slice/user";

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  h2 {
    font-family: Merriweather;
    font-size: 24px;
    font-weight: 700;
    line-height: 25px;
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

const UpdateName = () => {
  const { loading, data, error, success } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = errors.name.length;

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
    const { name } = data;

    dispatch(updateUser({ name }));
  };

  return (
    <Content>
      <h2>Редагувати ім'я</h2>
      {loading ? (
        "Loading"
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            <p>Ім'я:</p>
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
          <Button disabled={loading}>Оновити</Button>
          {success ? "" : <p className="error">{error}</p>}
        </form>
      )}
    </Content>
  );
};

export default UpdateName;
