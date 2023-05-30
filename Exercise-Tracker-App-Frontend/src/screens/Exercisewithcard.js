import { Container } from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';

import 'animate.css';

import React, { useEffect, useState } from "react";

import axios from "axios";

import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

import SmCard from "../components/Smcard";

const ExerciseWithCard = () => {
  const navigation = useNavigate();
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
  
    axios
      .get('http://localhost:5000/exercises/', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Unauthorized access, token expired or invalid
          console.log('Token expired or invalid');
          // Perform any necessary actions, such as logging out the user
        } else {
          // Other errors
          console.log('Error: ', error.message);
        }
      });
  }, []);
  


  const deleteExercise = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This exercise will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
  
        axios
          .delete(`http://localhost:5000/exercises/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            console.log(response.data);
            setExercises((prevExercises) => prevExercises.filter((el) => el._id !== id));
            Swal.fire({
              icon: 'success',
              title: 'Exercise Deleted',
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  



  // const deleteExercise = (id) => {
  //   const token = localStorage.getItem('token'); // Retrieve token from local storage

  //   axios
  //     .delete(`http://localhost:5000/exercises/${id}`, {
  //       headers: {
  //         Authorization: token, // Set the Authorization header with the token
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setExercises((prevExercises) => prevExercises.filter((el) => el._id !== id));
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Exercise Deleted',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };


  let goToTable = () => {
    navigation(`/Dashboard/Exerciselogs`);
  };

  return (
    <>
      <div className="d-flex justify-content-between my-2">
        <h2 className="animate__animated animate__fadeInLeft text-primary">Logged Exercises</h2>
        <button type="button" onClick={goToTable} class="btn btn-primary ">
        <GridViewIcon/>  Table View
        </button>
      </div>
      <Container>
      <div className="row">
        {exercises.map((currentExercise) => {
          return (

            <div className="col-md-6 my-3">
           
              <SmCard
                userName={currentExercise.username}
                description={currentExercise.description}
                duration={currentExercise.duration}
                date={currentExercise.date.substring(0, 10)}
                exercise={currentExercise}
                key={currentExercise._id}
                editClick={`/Dashboard/Editexercise/${currentExercise._id}`}
                deleteClick={() => deleteExercise(currentExercise._id)}
              />
            </div>
          );
        })}
      </div>
      </Container>
    </>
  );
};

export default ExerciseWithCard;
