import { css } from "styled-components";
import { handleColorType } from "../utils/handleType";

const handleWidth = (width) => {
  if (width) {
    return width;
  } else {
    return "none";
  }
};

const buttonStyles = css`
  display: inline-block;
  border-radius: 0.3rem;
  padding: 0.4rem 1.3rem;
  font-size: 1rem;
  border: none;
  width: ${(props) => handleWidth(props.width)};
  cursor: pointer;
  margin-right: 0.5rem;
  transition: opacity 0.2s ease-in;
  outline: none;
  color: ${(props) => (props.color === "light" ? "#333" : "#fff")};
  background: ${(props) => handleColorType(props.color)};
  &:hover {
    opacity: 0.8;
  }
`;

export default buttonStyles;
