import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCircleUser,
  faFilePen,
} from "@fortawesome/free-solid-svg-icons";
import StyledDiv from "./StyledDiv";
import Button from "../Button";

const index = () => {
  return (
    <StyledDiv>
      <Button link="/edit-profile" color="primary">
        <FontAwesomeIcon icon={faCircleUser} /> Edit
      </Button>
      <Button link="/create-league" color="primary">
        <FontAwesomeIcon icon={faFilePen} /> Create
      </Button>
      <Button link="/join-league" color="primary">
        <FontAwesomeIcon icon={faPlus} /> Join
      </Button>
    </StyledDiv>
  );
};

export default index;
