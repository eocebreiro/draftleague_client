import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { getPlayer } from "../../state/player/playerActions";

//Styling Components
import Spinner from "../../components/Spinner";
import { Container, Row, CenterDiv } from "../../components/Div";
import {
  Table,
  TableRow,
  TableItem,
  TableHeader,
  TableRowHeader,
} from "../../components/Table";

const index = ({ playerInfo }) => {
  //Size for table
  let tableItemSize = "50px";

  let count = 0;
  let color = "#CCCCCC";
  const playerData = playerInfo.map((info) => {
    if (count === 0) {
      color = "#CCCCCC";
    } else if (info.week !== playerInfo[count - 1].week) {
      switch (color) {
        case "#CCCCCC":
          color = "white";
          break;
        case "white":
          color = "#CCCCCC";
          break;
      }
    }
    count++;

    if (info.played) {
      return (
        <TableRow style={{ background: color }}>
          <TableItem style={{ width: "40px" }}>{info.week}</TableItem>
          <TableItem style={{ width: "40px" }}>
            {info.home ? "vs " : "@ "}
          </TableItem>
          <TableItem
            style={{
              width: "250px",
            }}
          >
            {info.opponent_name}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            {info.stats.total_points}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.minutes.data}</p>
            {info.stats.minutes.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.minutes.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.goals.data}</p>
            {info.stats.goals.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.goals.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.assists.data}</p>
            {info.stats.assists.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.assists.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.cleansheet.data}</p>
            {info.stats.cleansheet.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.cleansheet.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.pen_saved.data}</p>
            {info.stats.pen_saved.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.pen_saved.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.pen_won.data}</p>
            {info.stats.pen_won.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.pen_won.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.pen_missed.data}</p>
            {info.stats.pen_missed.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.pen_missed.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.goals_conceded.data}</p>
            {info.stats.goals_conceded.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.goals_conceded.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.saves.data}</p>
            {info.stats.saves.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.saves.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.yellow_card.data}</p>
            {info.stats.yellow_card.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.yellow_card.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.red_card.data}</p>
            {info.stats.red_card.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.red_card.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.own_goal.data}</p>
            {info.stats.own_goal.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.own_goal.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.tackles.data}</p>
            {info.stats.tackles.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.tackles.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.passes.data}</p>
            {info.stats.passes.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.passes.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.key_passes.data}</p>
            {info.stats.key_passes.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.key_passes.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.crosses_accuracy.data}</p>
            {info.stats.crosses_accuracy.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.crosses_accuracy.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.clearance.data}</p>
            {info.stats.clearance.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.clearance.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.blocks.data}</p>
            {info.stats.blocks.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.blocks.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.interceptions.data}</p>
            {info.stats.interceptions.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.interceptions.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.shots.data}</p>
            {info.stats.shots.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.shots.score + ")"}</p>
            )}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>{info.stats.fouls_drawn.data}</p>
            {info.stats.fouls_drawn.score === 0 ? (
              <p>-</p>
            ) : (
              <p>{"(" + info.stats.fouls_drawn.score + ")"}</p>
            )}
          </TableItem>
        </TableRow>
      );
    } else {
      return (
        <TableRow style={{ background: color }}>
          <TableItem style={{ width: "40px" }}>{info.week}</TableItem>
          <TableItem style={{ width: "40px" }}>
            {info.home ? "vs " : "@ "}
          </TableItem>
          <TableItem
            style={{
              width: "250px",
            }}
          >
            {info.opponent_name}
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>0</TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
          <TableItem style={{ width: tableItemSize }}>
            <p>-</p>
            <p>-</p>
          </TableItem>
        </TableRow>
      );
    }
  });

  return (
    <Fragment>
      <Table>
        <TableRowHeader>
          <TableHeader style={{ width: "40px" }}>RD</TableHeader>
          <TableHeader style={{ width: "40px" }}></TableHeader>
          <TableHeader
            style={{
              width: "250px",
            }}
          >
            Opponent
          </TableHeader>
          <TableHeader style={{ width: tableItemSize }}>Pts</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>Min</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>G</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>A</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>CS</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>PS</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>PE</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>PM</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>GA</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>SV</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>YC</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>RC</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>OG</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>T</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>P</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>KP</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>CRS</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>CL</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>BLK</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>INT</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>SH</TableHeader>
          <TableHeader style={{ width: tableItemSize }}>FD</TableHeader>
        </TableRowHeader>
        {playerData}
      </Table>
    </Fragment>
  );
};

index.propTypes = {
  playerInfo: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
  auTableItem: state.auTableItem,
});

export default connect(mapStateToProps, { getPlayer })(index);
