import LoginIcon from "@mui/icons-material/Login";
import { Box } from "@mui/material";

import { useFormik } from "formik";

import * as Yup from "yup";

import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';


const Login = () => {
  const navigation = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().email("Invalid email address").required("Required"),
      password: Yup.string().trim().max(14, 'Must be 20 characters or less').min(8, "Must be at least 8 characters").
      required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  let goToSignup = () => {
    navigation(`/signup`);
  };

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn) {
      Swal.fire({
        icon: "success",
        title: "You are Already login.",
        showConfirmButton: false,
        timer: 2000
      })
      navigation("/Dashboard");
    }
    else{
      Swal.fire({
        icon: "error",
        title: "First you have to login",
        text: "If you are not Register Please Signup",
        timer: 2000,
      });
    }
  }, []);

  function handleSubmit(values) {
    fetch("http://localhost:5000/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: values.email.trim(),
        password: values.password.trim(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.localStorage.setItem("token", data.data);
            window.localStorage.setItem("loggedIn", true);
            window.location.href = "./Dashboard";
          });
        }else if(data.status === "not found") {
          Swal.fire({
            icon: "error",
            title: "User not found",
            text: "Please Enter a valid Email."
          });
        }else if(data.status === "error") {
          Swal.fire({
            icon: "error",
            title: "Incorrect password",
            text: "Enter a Correct Password."
          });
        }
      });
  }

  

  return (
    <div className="background">
    <div className="container">
      <div className="row sl g-0">
        <div className="col-lg-7">
          <img
            src="/images/formimg.jpg"
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="col-lg-5 text-center py-4">
          <h2 className="animate__animated animate__heartBeat animate__infinite text-primary">
            Login <LoginIcon fontSize="large" />
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-row py-2 pt-5">
              <div className="col-lg-10 offset-1">
                <input
                  type="email"
                  className="inp px-3"
                  placeholder="User Email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
            <div className="form-row py-2 ">
              <div className="col-lg-10 offset-1">
                <input
                  type="password"
                  className="inp  px-3"
                  placeholder="User Password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>
            <div className="form-row py-2 ">
              <div className="col-lg-10 offset-1">
                <button type="submit" className="btn-one  px-3">
                  Login
                </button>
              </div>
            </div>
          </form>
          <Box className="mt-2 d-flex justify-content-center align-items-center">
            <p>
              Not a member?{" "}
              <a
                href=" "
                style={{ textDecoration: "none" }}
                onClick={goToSignup}
              >
                Signup
              </a>
            </p>
          </Box>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
