import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { Box } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {
  const navigation = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .matches(/^[A-Za-z].*$/, "Username must start with a letter")
        .required("Username is required"),
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email is Required"),
      password: Yup.string()
        .trim()
        .min(8, "Must be at least 8 characters")
        .max(14, "Must be 20 characters or less")
        .required("Password is Required"),
    }),

    onSubmit: (values) => {
      fetch("http://localhost:5000/signup", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: values.name.trim(),
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
              title: " Good Job",
              text: "Registration Successful",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.href = "./Login";
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "User Already Registered",
              text: "Enter a Different Email.",
            });
          }
        });
    },
  });

  const goToLogin = (e) => {
    e.preventDefault();
    navigation("/Login");
    console.log("Run");
  };

  return (
    <div className="background">
      <div className="container">
        <div className="row ss g-0">
          <div className="col-lg-7">
            <img
              src="/images/formimg.jpg"
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div className="col-lg-5 text-center py-4">
            <h2 className="animate__animated animate__heartBeat animate__infinite text-primary">
              SignUp <FingerprintIcon fontSize="large" />
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-row py-2 pt-5">
                <div className="col-lg-10 offset-1">
                  <input
                    name="name"
                    type="text"
                    className="inp px-3"
                    placeholder="User Name"
                    id="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-danger">{formik.errors.name}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-row py-2">
                <div className="col-lg-10 offset-1">
                  <input
                    type="email"
                    className="inp px-3"
                    placeholder="User Email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-row py-2">
                <div className="col-lg-10 offset-1">
                  <input
                    type="password"
                    className="inp px-3"
                    placeholder="User Password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-row py-2">
                <div className="col-lg-10 offset-1">
                  <button type="submit" className="btn-one px-3">
                    SignUp
                  </button>
                </div>
              </div>
            </form>
            <Box className="mt-2 d-flex justify-content-center align-items-center">
              <p>
                Already have an account!{" "}
                <a
                  href=" "
                  style={{ textDecoration: "none" }}
                  onClick={goToLogin}
                >
                  Login
                </a>
              </p>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
