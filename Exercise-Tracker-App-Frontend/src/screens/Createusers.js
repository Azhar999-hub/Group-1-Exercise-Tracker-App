import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

import axios from "axios";

import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigation = useNavigate()
  const initialValues = {
    username: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().trim()
      .matches(/^[A-Za-z].*$/, "Username must start with a letter")
      .min(3, "Must be at least 3 characters")
      .max(18, "Must be 18 characters or less")
      .required("Username is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {

    const token = localStorage.getItem("token"); 

    axios
      .post("http://localhost:5000/usersexercise/add", values,{
        headers: {
          Authorization: token,
        },
      } )
      .then((res) => {
        console.log(res.data);
        resetForm();
        showSuccessAlert();
        navigation(`/dashboard/Createexercise`)
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Success",
      text: "User created successfully!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div>
      <h2 className="animate__animated animate__fadeInLeft text-primary">Create New User</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group my-3">
            <label htmlFor="username">Username:</label>
            <Field
              type="text"
              id="username"
              name="username"
              className="form-control"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Create User
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateUser;
