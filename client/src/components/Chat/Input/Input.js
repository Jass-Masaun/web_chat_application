import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const Input = ({ name, type, placeholder, getData, formLabelInvisible }) => {
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const formLabel = capitalize(placeholder.split(" ")[1]);
  const [input, setInput] = useState({
    [name]: "",
  });

  const handleChange = (e) => {
    setInput({ [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getData(input[name]);
  }, [input[name]]);

  // useEffect(() => {
  //   if (setData == "") {
  //     setInput((input.message = ""));
  //   }
  // }, [setData]);
  return (
    <>
      <Form.Group controlId="formBasicEmail">
        {!formLabelInvisible && (
          <Form.Label>
            {formLabel == "Email" ? "Email address" : formLabel}
          </Form.Label>
        )}
        <Form.Control
          name={name}
          value={input[name]}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          required
        />
      </Form.Group>
    </>
  );
};

export default Input;
