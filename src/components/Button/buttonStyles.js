import { css } from "styled-components";
import { handleColorType } from "../utils/handleType";
import { device } from "../utils/device";

const handleWidth = (width) => {
  if (width) {
    return width;
  } else {
    return "none";
  }
};

export const buttonStyles = css`
  display: inline-block;
  padding: 0.4rem 1.3rem;
  font-size: 1.25rem;
  width: ${(props) => (props.width ? props.width : "auto")};
  cursor: pointer;
  transition: opacity 0.2s ease-in;
  outline: none;
  letter-spacing: 1.5px;
  background: ${(props) => handleColorType(props.color)};
  color: ${(props) => (props.color === "light" ? "#333" : "#fff")};
  border: none;
  text-align: center;
  margin: auto;

  &:hover:not([disabled]) {
    opacity: 0.8;
  }

  &:disabled {
    border: 1px solid #999999;
    background-color: transparent;
    color: #666666;
  }
  @media ${device.laptop} {
    font-size: 1.1rem;
  }
  @media ${device.tablet} {
    font-size: 1rem;
    margin: 0;
  }
  @media ${device.mobileL} {
    font-size: 1rem;
    padding: 0.4rem 0.1rem;
    margin: 0;
  }
  @media ${device.mobile} {
    font-size: 1rem;
    padding: 0.4rem 0.1rem;
    margin: 0;
  }
  @media ${device.mobileS} {
    font-size: 0.75rem;
    padding: 0.4rem 0.1rem;
    margin: 0;
  }
`;

export const iconButtonStyles = css`
  display: inline-block;
  border-radius: 0.3rem;
  font-size: 1rem;
  border: none;
  width: ${(props) => handleWidth(props.width)};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  transform: scale(1);
  outline: none;
  color: ${(props) => (props.color === "light" ? "#333" : "#fff")};
  background: ${(props) => handleColorType(props.color)};

  &:hover:not([disabled]) {
    transform: scale(1.1);
  }
  &:disabled {
    border: 1px solid #999999;
    background-color: transparent;
    color: #666666;
  }
  &:hover {
    transform: scale(1.1);
  }
`;
