import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getLeague } from "../../state/league/leagueActions";

//Styling Components
import Spinner from "../../components/Spinner";
import { Container } from "../../components/Div";
import {
  Table,
  TableRow,
  TableItem,
  TableHeader,
  TableRowHeader,
} from "../../components/Table";

const index = ({ getLeague, league: { league } }) => {
  const { id, fixture_id } = useParams();
  console.log(id);
  useEffect(() => {
    getLeague(id);
  }, []);

  // Varables
  let team1name = null;
  let team2name = null;
  let week = null;
  let team1 = [];
  let team2 = [];

  // Get the team names
  if (league !== null) {
    for (let i = 0; i < league.schedule.length; i++) {
      for (let j = 0; j < league.schedule[i].data.length; j++) {
        if (fixture_id === league.schedule[i].data[j]._id) {
          team1name = league.schedule[i].data[j].team_one.teamname;
          team2name = league.schedule[i].data[j].team_two.teamname;
          week = league.schedule[i].week;

          // get their lineups
          break;
        }
      }
    }
  }

  return (
    <Fragment>
      {league === null ? (
        <Spinner />
      ) : (
        <Container>
          <Table>
            <TableRowHeader>
              <TableHeader>Week: {week}</TableHeader>
            </TableRowHeader>

            <TableRowHeader>
              <TableHeader>{team1name}</TableHeader>
              <TableHeader>{team2name}</TableHeader>
            </TableRowHeader>

            <TableRowHeader>
              <TableHeader>Player</TableHeader>

              <TableHeader>Score</TableHeader>
              <TableHeader>Player</TableHeader>
              <TableHeader>Score</TableHeader>
            </TableRowHeader>
            <TableRow>
              <TableItem>Coming soon! It's on my todo list. </TableItem>
            </TableRow>
          </Table>
        </Container>
      )}
    </Fragment>
  );
};

index.propTypes = {
  getLeague: PropTypes.func.isRequired,
  league: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({ league: state.league });

export default connect(mapStateToProps, { getLeague })(index);
