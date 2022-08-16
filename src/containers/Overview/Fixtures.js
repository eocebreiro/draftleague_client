import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

//Styling Components
import P from "../../components/P";
import {
  FixtureRow,
  FixtureTeam,
  FixtureMatchup,
  FixtureData,
  Score,
} from "../../components/Div";
import { Button } from "../../components/Button";
import Spinner from "../../components/Spinner";

const Fixtures = ({ fixture }) => {
  let color = "black";
  let result = null;
  if (fixture.time.status === "NS") {
    // Display Scheule time
    // TODO
  } else if (fixture.time.status === "HT") {
    // Get live scores
    color = "red";
    result = (
      <FixtureData>
        <Score style={{ color: color }}>{fixture.score.localteam_score}</Score>
        <Score style={{ color: "green" }}>{"HT"}</Score>
        <Score style={{ color: color }}>
          {fixture.score.visitorteam_score}
        </Score>
      </FixtureData>
    );
  } else if (fixture.time.status !== "FT") {
    // Get live scores
    color = "red";
    result = (
      <FixtureData>
        <Score style={{ color: color }}>{fixture.score.localteam_score}</Score>
        <Score style={{ color: "green" }}>
          {fixture.time.minute}
          {"'"}
        </Score>
        <Score style={{ color: color }}>
          {fixture.score.visitorteam_score}
        </Score>
      </FixtureData>
    );
  } else {
    result = (
      <FixtureData>
        <Score>{fixture.score.localteam_score}</Score>
        <Score>{"Full Time"}</Score>
        <Score>{fixture.score.visitorteam_score}</Score>
      </FixtureData>
    );
  }

  return (
    <FixtureRow>
      <FixtureTeam>
        <img src={fixture.localTeam.logo_path} width="60px" />
        <div>{fixture.localTeam.name}</div>
      </FixtureTeam>
      <FixtureMatchup>
        {fixture.time.status === "NS"
          ? "SHOW TIME"
          : fixture.time.status !== "FT"
          ? result
          : result}
      </FixtureMatchup>
      <FixtureTeam>
        <img src={fixture.visitorTeam.logo_path} width="60px" />{" "}
        <div>{fixture.visitorTeam.name}</div>
      </FixtureTeam>
    </FixtureRow>
  );
};

export default Fixtures;
