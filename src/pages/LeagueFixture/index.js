import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getLeague } from "../../state/league/leagueActions";

//Styling Components
import Spinner from "../../components/Spinner";
import { Container } from "../../components/Div";

const index = ({ auth: { user }, getLeague, league: { league, loading } }) => {
  const { id, fixture_id } = useParams();

  // Get the team names
  let team1, team2;
  if (!loading) {
    console.log("hi");
    console.log(league);

    for (let i = 0; i < league.schedule.length; i++) {
      for (let j = 0; j < league.schedule[i].data.length; j++) {
        if (fixture_id === league.schedule[i].data[j]._id) {
          team1 = league.schedule[i].data[j].team_one.teamname;
          team2 = league.schedule[i].data[j].team_two.teamname;
          break;
        }
      }
    }
  }

  return (
    <Fragment>
      {league === null || loading ? (
        <Spinner />
      ) : (
        <Container>
          <Fragment>
            Page is underdevelopment. Indvidual Match ups coming soon for{" "}
            {team1} and {team2}.
          </Fragment>
        </Container>
      )}
    </Fragment>
  );
};

index.propTypes = {
  getLeague: PropTypes.func.isRequired,
  league: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({ league: state.league, auth: state.auth });

export default connect(mapStateToProps, { getLeague })(index);
