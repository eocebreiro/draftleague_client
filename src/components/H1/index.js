import styled from "styled-components";
import {
  handleColorType,
  handleDesktopSizeType,
  handleMediaSizeType,
} from "../utils/handleType";

const H1 = styled.h1`
  font-size: ${(props) => handleDesktopSizeType(props.size)};
  color: ${(props) => handleColorType(props.color)};
  padding: 0.5rem;
  line-height: 1.2;
  margin-bottom: 1rem;
  @media (max-width: 700px) {
    font-size: ${(props) => handleMediaSizeType(props.size)};
  }
`;

export default H1;
