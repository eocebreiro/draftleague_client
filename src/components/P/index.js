import styled from "styled-components";
import {
  handleColorType,
  handleDesktopSizeType,
  handleMediaSizeType,
} from "../utils/handleType";

const P = styled.p`
  padding: 0.5rem;
  color: ${(props) => handleColorType(props.color)};
  font-size: ${(props) => handleDesktopSizeType(props.size)};
  margin-bottom: ${(props) => props.spacing};
  @media (max-width: 700px) {
    font-size: ${(props) => handleMediaSizeType(props.size)};
  }
`;

export default P;
