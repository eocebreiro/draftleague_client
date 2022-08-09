import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StyledLeague from "./StyledLeague";
import P from "../../components/P";
import { CenterRow, RowItem } from "../../components/Div";
import Link from "../../components/Link";

const League = ({ leagues }) => {
  const league = leagues.map((l) => (
    <CenterRow key={l._id}>
      <Link to={"/league/" + l._id}>
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

League.propTypes = { leagues: PropTypes.array.isRequired };

export default League;
