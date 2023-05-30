import React, { useEffect, useState } from "react";

import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useParams } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

import Swal from "sweetalert2";

const EditExercise = () => {
  const params = useParams();
  const [users, setUsers] = useState([]);
  const initialValues = {
    username: "",
    description: "",
    duration: "",
    date: new Date(),
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    description: Yup.string()
      .trim()
      .matches(/^[A-Za-z].*$/, "Username must start with a letter")
      .min(3, "Must be at least 3 characters")
      .max(18, "Must be 18 characters or less")
      .required("Description is required"),
    duration: Yup.number()
      .required("Duration is required")
      .min(1, "Must be at least 1 minute long")
      .max(60, "Must be 60 minutes long or less")
      .positive("Duration must be a positive number"),
    date: Yup.date()
      .min(new Date(), "Date must be today or later")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        "Date must be within one year"
      )
      .required("Date is required")
      .transform((value, originalValue) => {
        // Transforming the value to a valid date within the defined range
        const selectedDate = new Date(originalValue);
        const currentDate = new Date();

        if (selectedDate < currentDate) {
          return currentDate;
        }

        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1);

        if (selectedDate > maxDate) {
          return maxDate;
        }

        return value;
      }),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/exercises/" + params.id, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const { username, description, duration, date } = response.data;
        initialValues.username = username;
        initialValues.description = description;
        initialValues.duration = duration;
        initialValues.date = new Date(date);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Unauthorized access, token expired or invalid
          console.log("Token expired or invalid");
          // Perform any necessary actions, such as logging out the user
        } else {
          // Other errors
          console.log("Error: ", error.message);
        }
      });

    axios
      .get("http://localhost:5000/usersexercise/", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          const usernames = response.data.map((user) => user.username);
          setUsers(usernames);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Unauthorized access, token expired or invalid
          console.log("Token expired or invalid");
          // Perform any necessary actions, such as logging out the user
        } else {
          // Other errors
          console.log("Error: ", error.message);
        }
      });
  }, [params.id]);

  const onSubmit = (values) => {
    const token = localStorage.getItem("token");

    const exercise = {
      username: values.username,
      description: values.description.trim(),
      duration: values.duration,
      date: values.date,
    };

    console.log(exercise);

    axios
      .post("http://localhost:5000/exercises/update/" + params.id, exercise, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Exercise Log Updated",
          showConfirmButton: true,
          timer: 1500,
        }).then(() => {
          window.location = "/Dashboard/Exercisewithcard";
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        if (error.response && error.response.status === 401) {
          // Unauthorized access, token expired or invalid
          console.log("Token expired or invalid");
          // Perform any necessary actions, such as logging out the user
        } else {
          // Other errors
          console.log("Error: ", error.message);
        }
      });
  };

  const disablePastDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero for accurate comparison
    return date >= today;
  };

  return (
    <div>
      <h2 className="animate__animated animate__fadeInLeft text-primary">
        Edit Exercise Log
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="form-group my-3">
            <label>Username: </label>
            <Field
              as="select"
              name="username"
              className="form-control"
              required
            >
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="username"
              component="div"
              className="text-danger my-1"
            />
          </div>
          <div className="form-group my-3">
            <label>Description: </label>
            <Field
              type="text"
              name="description"
              className="form-control"
              required
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-danger my-1"
            />
          </div>
          <div className="form-group my-3">
            <label>Duration (in minutes): </label>
            <Field
              type="text"
              name="duration"
              className="form-control"
              required
            />
            <ErrorMessage
              name="duration"
              component="div"
              className="text-danger my-1"
            />
          </div>
          <div className="form-group my-3">
            <label>Date: </label>
            <div>
              <Field name="date">
                {({ field, form }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => form.setFieldValue(field.name, date)}
                    className="form-control"
                    filterDate={disablePastDates}
                  />
                )}
              </Field>
            </div>
            <ErrorMessage
              name="date"
              component="div"
              className="text-danger my-1"
            />
          </div>
          <div className="form-group my-3">
            <button type="submit" className="btn btn-primary">
              Edit Exercise Log
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditExercise;
