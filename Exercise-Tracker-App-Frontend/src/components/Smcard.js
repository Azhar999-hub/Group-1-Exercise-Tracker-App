import { Delete, Edit } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";

import React from "react";

import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";

// style={{background:"#1976d2", color:"white"}}

const SmCard = (props) => {
  let { userName, description, duration, date, editClick, deleteClick } = props;

  return (
    <Card
      elevation={8}
      className="card-design img-fluid"
      style={{ color: "white" }}>
      <CardContent className="ms-3">
        <Typography variant="h5" className="">
          <span className="ms-2">Name : {userName}</span>{" "}
        </Typography>
        <Typography variant="h5" className="">
          <span className="ms-2"> Description : {description}</span>{" "}
        </Typography>
        <Typography variant="h5" className="">
          <span className="ms-2">Duration : {duration} Min</span>{" "}
        </Typography>
        <Typography variant="h5" className="">
          <span className="ms-2">Date : {date}</span>{" "}
        </Typography>
        <div className="mt-3">
          <Link to={editClick} className="btn btn-primary ms-3 me-3">
            <Edit /> Edit
          </Link>
          <Button className="btn btn-danger" onClick={deleteClick}>
            <Delete /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmCard;
