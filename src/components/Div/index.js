import styled from "styled-components";
import showcase from "../../img/showcase.jpg";
import soccerfield from "../../img/soccerfield.jpg";

export const Container = styled.div`
  margin: auto;
  overflow: hidden;
  margin-top: 3.5rem;
  margin-bottom: 3rem;
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
    padding-left: 2rem;
    padding-right: 2rem;
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
  border: 2px solid red;
  margin-right: 10px;
`;
export const FieldContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border: 2px solid red;
  height: 800px;
`;

export const PlayerWrapper = styled.div`
  position: relative;
  border: 2px solid green;
  width: 150px;
  height: 150px;
  margin: 10px;
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
