import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StyledLeague from "./StyledLeague";
import P from "../../components/P";
import { CenterRow, RowItem } from "../../components/Div";
import Link from "../../components/Link";
import { getRoster } from "../../state/roster/rosterActions";
import { getLeague } from "../../state/league/leagueActions";

const League = ({ auth: { user }, leagues, getLeague }) => {
  const onClick = async (league_id, e) => {
    getLeague(league_id);
    getRoster(league_id, user._id);
  };
  const league = leagues.map((l) => (
    <CenterRow key={l._id}>
      <Link to={"/league/" + l._id} onClick={(e) => onClick(l._id, e)}>
        <StyledLeague>
          <RowItem>
            <P color="black">{l.leaguename}</P>
          </RowItem>
          <RowItem>
            <P color="black">Rank:</P>
          </RowItem>
          <RowItem>
            <P color="black">Match Up COMING SOON</P>
          </RowItem>
        </StyledLeague>
      </Link>
    </CenterRow>
  ));
  return <Fragment>{league}</Fragment>;
};

League.propTypes = {
  leagues: PropTypes.array.isRequired,
  getLeague: PropTypes.func.isRequired,
  getRoster: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getRoster, getLeague })(League);
