import styled from "styled-components";
import showcase from "../../img/showcase.jpg";

export const LandingImg = styled.div`
  background: url(${showcase}) no-repeat center center/cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  justify-content: center;
  align-items: center;
`;

export const DarkOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
`;

export const AuthFormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding-top: 5rem;
  padding-right: 2.5rem;
  padding-left: 2.5rem;
`;