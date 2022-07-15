import styled from "styled-components";

const index = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  padding-top: 150px;

  @media (max-width: 768px) {
    padding-top: 100px;
  }
  @media (max-width: 576px) {
    padding-top: 50px;
  }
`;

export default index;
