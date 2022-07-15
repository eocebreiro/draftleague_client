import styled from "styled-components";

const Container = styled.div`
  margin: auto;
  overflow: hidden;
  padding: 0 5rem;
  margin-top: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 1200px) {
    max-width: 1140px;
  }
  @media (max-width: 992px) {
    max-width: 960px;
    margin-top: 2rem;
    padding: 0 2rem;
  }
  @media (max-width: 768px) {
    max-width: 720px;
    margin-top: 1rem;
    padding: 0;
  }
  @media (max-width: 576px) {
    max-width: 540px;
    margin-top: 0.5rem;
    padding: 0;
  }
`;

export default Container;
