import styled from "styled-components";
import showcase from "../../img/showcase.jpg";
import soccerfield from "../../img/soccerfield.jpg";
import { device } from "../utils/device";

//DashBoard divs
export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  padding-bottom: 20px;
  justify-content: left;
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }
  @media ${device.mobileL} {
    grid-template-columns: 1fr 1fr;
  }
  @media ${device.mobile} {
    grid-template-columns: 1fr 1fr;
  }
`;

//Dashboard League divs
export const LeaguesContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.5px solid black;
  background: #cccccc;
  margin: auto;
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  box-shadow: 8px 5px 20px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;

export const LeagueNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;

export const LeagueName = styled.div``;

export const ArrowBox = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

export const LeagueDataWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 20px;
  width: 100%;
  height: 90px;
  padding: 0 20px;
  padding-bottom: 30px;
  justify-content: center;
`;

export const LeagueData = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  column-gap: 30px;
  width: 100%;
  padding: 0 10px;
`;

export const Team1 = styled.div`
  display: grid;
  grid-template-areas: "crest name points";
  column-gap: 30px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 992px) {
    justify-content: space-around;
    grid-template-areas: "crest points";
  }
`;

export const Team2 = styled.div`
  display: grid;
  grid-template-areas: "points name crest";
  column-gap: 30px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 992px) {
    justify-content: space-around;
    grid-template-areas: "points crest";
  }
`;

export const MatchUpBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Crest = styled.div`
  grid-area: crest;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background: green;
`;
export const Name = styled.div`
  grid-area: name;
  @media (max-width: 992px) {
    display: none;
  }
`;
export const Team1Name = styled.div`
  @media (max-width: 992px) {
    display: flex;
    justify-content: left;
    align-items: left;
  }
`;

export const Team2Name = styled.div`
  @media (max-width: 992px) {
    display: flex;
    justify-content: right;
    align-items: center;
  }
`;

export const Points = styled.div`
  grid-area: points;
`;

export const RankData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: 1px solid gray;
  padding: 0 10px;
`;

export const InviteBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
  height: 90px;
`;

//////OLD
export const Container = styled.div`
  margin: auto;
  overflow: hidden;
  margin-top: 3.5rem;
  margin-bottom: 3rem;
  margin-left: 0;
  margin-right: 0;
  padding-left: 3rem;
  padding-right: 3rem;
  min-height: 95vh;
  max-width: 1400px;

  @media (max-width: 1200px) {
    max-width: 1140px;
  }
  @media (max-width: 992px) {
    max-width: 960px;
  }
  @media (max-width: 768px) {
    max-width: 720px;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  @media (max-width: 576px) {
    max-width: 540px;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export const DarkOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  color: #fff;

  @media (max-width: 768px) {
  }
  @media (max-width: 576px) {
  }
`;

export const LandingContent = styled.div`
  padding-top: 7rem;
  height: 100%;
  text-align: center;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;

  @media (max-width: 1200px) {
    max-width: 1140px;
    padding-top: 6rem;
  }
  @media (max-width: 992px) {
    padding-top: 5rem;
    max-width: 960px;
  }
  @media (max-width: 768px) {
    padding-top: 4rem;
    max-width: 720px;
    padding-left: 4rem;
    padding-right: 4rem;
  }
  @media (max-width: 576px) {
    padding-top: 1rem;
    max-width: 540px;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export const LandingImg = styled.div`
  position: relative;
  background: url(${showcase}) no-repeat center center/cover;
  background-size: cover;
  background-position: 50%;
  height: 100vh;
  margin-top: -50px;
  margin-bottom: 0px;
`;

// Mostly used in overview

export const OverviewContent = styled.div`
  display: grid;
`;

export const FieldImg = styled.div`
  position: relative;
  background: url(${soccerfield}) no-repeat center center/cover;
  width: 100%;
  max-width: 900px;
  height: 800px;
  margin-right: 10px;
`;
export const FieldContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 800px;
`;

export const PlaceHolderWrapper = styled.div`
  width: 150px;
  height: 155px;
  margin: 10px;
  position: relative;
`;

export const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background: white;
  border-radius: 15px;
  box-shadow: 10px 5px 25px rgba(0, 0, 0, 0.5);
  border: 2px solid black;
  width: 160px;
  height: 155px;
  margin: 10px;
  overflow: hidden;
`;
export const RosterContent = styled.div`
  position: relative;
  min-width: 300px;
  height: 800px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const RosterRow = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: space-between;
  padding: 10px;
`;

export const RosterItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 100%;
`;

export const RosterHeader = styled(RosterItem)`
  color: white;
  font-weight: 700;
`;

export const RosterRowHeader = styled(RosterRow)`
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Fixtures table
export const FixturesContent = styled.div`
  position: relative;
  min-width: 100%;
  margin: 50px 0;
`;

export const FixtureTeam = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  min-width: 200px;
`;
export const FixtureMatchup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  min-width: 300px;
`;
export const FixtureData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  min-width: 300px;
`;
export const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  min-width: 100px;
`;
export const FixtureItemHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  color: white;
  font-weight: 700;
`;

export const FixtureRow = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: center;
  padding: 10px;
  gap: 20px;
`;
export const FixtureRowHeader = styled(FixtureRow)`
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
`;

export const MainCol = styled.div`
  width: 100%;
`;

export const FieldItem = styled(RosterItem)`
  padding-top: 10px;
`;
export const FieldImage = styled(RosterItem)``;

// -----------

export const Div = styled.div`
  position: relative;
  width: 100%;
  min-height: 1px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

export const CenterDiv = styled(Div)`
  text-align: center;
  }
`;

// Flex
export const Row = styled(Div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

export const Col = styled(Div)`
  width: 100%;
`;

export const CenterRow = styled(Row)`
  text-align: center;
  justify-content: center;
`;

export const RowItem = styled.div`
  flex: "${(props) => props.flex}";
  text-align: center;
  width: 100%;
`;
