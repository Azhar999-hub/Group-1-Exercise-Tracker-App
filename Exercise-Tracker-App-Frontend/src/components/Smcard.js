import { Delete, Edit } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";

import React from "react";

import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";

// style={{background:"#1976d2", color:"white"}}
const SmCard = (props) => {
  let { userName, description, duration, date, editClick, deleteClick } = props;

  return (
    <Card elevation={8} className="card-design img-fluid" style={{ color: "white" }}>
      <div className="row">
        <div className="col-md-8">
          <CardContent>
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
        </div>
        <div className="col-md-4">
            <img
              style={{ height: "210px" }}
              src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/ae5b5c40400159.577dcf3658686.gif"
              alt="Exercise-gif"
            />
        </div>
      </div>
    </Card>
  );
};

export default SmCard;
