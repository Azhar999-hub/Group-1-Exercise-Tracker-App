import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import Swal from 'sweetalert2';

const Exercise = (props) => {
  const showDeleteConfirmation = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this exercise!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteExercise(props.exercise._id);
      }
    });
  };

  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link className="btn btn-primary" to={`/Dashboard/Editexercise/${props.exercise._id}`}>
          <EditIcon /> Edit
        </Link>
        &nbsp;
        <button className="btn btn-danger" onClick={showDeleteConfirmation}>
          <DeleteIcon /> Delete
        </button>
      </td>
    </tr>
  );
};

const ExerciseLogs = () => {
  const [exercises, setExercises] = useState([]);
  const navigation = useNavigate();

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
          console.log('Token expired or invalid');
        } else {
          console.log('Error: ', error.message);
        }
      });
  }, []);

  const deleteExercise = (id) => {
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
  };

  const exerciseList = () => {
    return exercises.map((currentExercise) => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  };

  let goToCard = () => {
    navigation(`/Dashboard/Exercisewithcard`);
  };

  return (
    <div className="table-responsive">
      <div className="d-flex justify-content-between my-3">
        <h2 className="animate__animated animate__fadeInLeft text-primary">Logged Exercises</h2>
        <button type="button" onClick={goToCard} className="btn btn-primary">
        <CreditCardIcon/>  Card View
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-responsive">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{exerciseList()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ExerciseLogs;






















// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// import React, { useEffect, useState } from 'react';

// import { Link, useNavigate } from 'react-router-dom';

// import axios from 'axios';

// import Swal from 'sweetalert2';

// const Exercise = (props) => (
//   <tr>
//     <td>{props.exercise.username}</td>
//     <td>{props.exercise.description}</td>
//     <td>{props.exercise.duration}</td>
//     <td>{props.exercise.date.substring(0, 10)}</td>
//     <td>
//       <Link className="btn btn-primary" to={`/Dashboard/Editexercise/${props.exercise._id}`}>
//         <EditIcon /> Edit
//       </Link>
//       &nbsp;
//       <a
//         className="btn btn-danger"
//         href=" "
//         onClick={() => props.deleteExercise(props.exercise._id)}
//       >
//         <DeleteIcon /> Delete
//       </a>
//     </td>
//   </tr>
// );

// const ExerciseLogs = () => {
//   const [exercises, setExercises] = useState([]);
//   const navigation = useNavigate();



//   useEffect(() => {
//     const token = localStorage.getItem('token');
  
//     axios
//       .get('http://localhost:5000/exercises/', {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((response) => {
//         setExercises(response.data);
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 401) {
//           // Unauthorized access, token expired or invalid
//           console.log('Token expired or invalid');
//           // Perform any necessary actions, such as logging out the user
//         } else {
//           // Other errors
//           console.log('Error: ', error.message);
//         }
//       });
//   }, []);

  

//   const deleteExercise = (id) => {
//     const token = localStorage.getItem('token'); // Retrieve token from local storage

//     axios
//       .delete(`http://localhost:5000/exercises/${id}`, {
//         headers: {
//           Authorization: token, // Set the Authorization header with the token
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         setExercises((prevExercises) => prevExercises.filter((el) => el._id !== id));
//         Swal.fire({
//           icon: 'success',
//           title: 'Exercise Deleted',
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const exerciseList = () => {
//     return exercises.map((currentExercise) => {
//       return (
//         <Exercise
//           exercise={currentExercise}
//           deleteExercise={deleteExercise}
//           key={currentExercise._id}
//         />
//       );
//     });
//   };

//   let goToCard = () => {
//     navigation(`/Dashboard/Exercisewithcard`);
//   };

//   return (
//     <div className="table-responsive">
//       <div className="d-flex justify-content-between my-3">
//         <h3>Logged Exercises</h3>
//         <button type="button" onClick={goToCard} className="btn btn-primary">
//           Card View
//         </button>
//       </div>
//       <div className="table-responsive">
//         <table className="table table-striped table-bordered table-responsive">
//           <thead className="thead-light">
//             <tr>
//               <th>Username</th>
//               <th>Description</th>
//               <th>Duration</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>{exerciseList()}</tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ExerciseLogs;

