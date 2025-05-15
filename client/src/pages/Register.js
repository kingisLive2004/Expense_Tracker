import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      setLoading(false);
      message.success("Registration successful");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Registration failed. Please try again.");
    }
  };

  return (
    <>
    <div className="register-page">
      {loading && <Spinner />}
      <Form layout="vertical" onFinish={submitHandler}>
        <h1>Register Form</h1>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input type="password" />
        </Form.Item>
        <div className="d-flex justify-content-between">
          <Link to="/login">Already Registered? Click Here to login</Link>
          <button className="btn btn-primary">Register</button>
        </div>
      </Form>
    </div>
    </>
  );
};

export default Register;