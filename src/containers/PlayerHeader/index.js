import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import flag from "flag-icons";
import iso3311a2 from "iso-3166-1-alpha-2";

//Styling Components
import Spinner from "../../components/Spinner";
import { Container, Row, CenterDiv, Col } from "../../components/Div";
import H1 from "../../components/H1";

let countryCode, flagSymbol;
const index = ({ player }) => {
  if (player.nationality === "USA") {
    countryCode = iso3311a2.getCode("United States");
  } else {
    countryCode = iso3311a2.getCode(player.nationality);
  }

  if (countryCode) {
    flagSymbol = "fi fi-" + countryCode.toLowerCase();
  } else {
    flagSymbol = null;
  }

  return (
    <Fragment>
      <Row>
        <Col>
          <H1 size="L">{player.common_name}</H1>
          <Row>
            <img src={player.image_path} />
            <img src={player.team.logo_path} />
            <span class={flagSymbol} style={{ width: "150px" }}></span>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

index.propTypes = {
  player: PropTypes.object.isRequired,
};

export default index;
