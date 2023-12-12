import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { uploadProfileImage } from "../../store/slice/user";

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

const UpdateImage = () => {
  const [imgFile, setImgFile] = useState({});
  const { loading, error, success } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imgFile.name && imgFile.name.length) {
      dispatch(uploadProfileImage(imgFile));
      setImgFile({});
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Check each selected file
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    // Check if the file is an image
    if (allowedTypes.includes(file.type) && file.name) {
      setImgFile(file);
    }
  };

  return (
    <Content>
      <h2>Редагувати фото</h2>
      {loading ? (
        "Loading"
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            <p>Оберіть фото:</p>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          <Button disabled={loading}>Оновити</Button>
          {success ? "" : <p className="error">{error}</p>}
        </form>
      )}
    </Content>
  );
};

export default UpdateImage;
