import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Form } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";

const Register = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [successfull, setSuccessfull] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be 15 caracters or less")
        .min(3, "Must be 3 caracters or less")
        .required("Required"),
      password: Yup.string()
        .max(8, "Must be 15 caracters or less")
        .min(3, "Must be 3 caracters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("required"),
    }),
    onSubmit: (values) => {
      handleRegister(values.username, values.email, values.password);
    },
  });
  const handleRegister = (username, email, password) => {
    //alert(username + email + password);
    AuthService.register(username, email, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessfull(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessfull(false);
      }
    );
  };
  return (
    <div className="col-md-12">
      <h1>Registration</h1>
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile"
          className="profile-img-card"
        />
        <Form onSubmit={formik.handleSubmit}>
          <div>
            <div className="form-group">
              {formik.touched.username && formik.errors.username ? (
                <div className="alert alert-danger" role={"alert"}>
                  {formik.errors.username}
                </div>
              ) : null}
              <label> Username </label>
              <Input
                type="text"
                className="form-control"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              ></Input>
            </div>
            <div className="form-group">
              {formik.touched.email && formik.errors.email ? (
                <div className="alert alert-danger" role={"alert"}>
                  {formik.errors.email}
                </div>
              ) : null}
              <label> Email </label>
              <Input
                type="test"
                className="form-control"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              ></Input>
            </div>
            <div className="form-group">
              {formik.touched.password && formik.errors.password ? (
                <div className="alert alert-danger" role={"alert"}>
                  {formik.errors.password}
                </div>
              ) : null}
              <label> Password </label>
              <Input
                type="password"
                className="form-control"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              ></Input>
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                Sign Up
              </button>
            </div>
          </div>

          {message && (
            <div className="form-group">
              <div
                className={
                  successfull ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Register;
