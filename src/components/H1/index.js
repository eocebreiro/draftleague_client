import styled from "styled-components";
import { device } from "../utils/device";
import {
  handleColorType,
  handleDesktopSizeType,
  handleMediaSizeType,
} from "../utils/handleType";

const H1 = styled.h1`
  font-size: 3rem;
  color: ${(props) => handleColorType(props.color)};
  line-height: 1.2;
  padding-bottom: 20px;
  @media ${device.laptop} {
    font-size: 3rem;
  }
  @media ${device.tablet} {
    font-size: 3rem;
  }
  @media ${device.mobileL} {
    font-size: 2.4rem;
  }
  @media ${device.mobile} {
    font-size: 2.4rem;
  }
  @media ${device.mobileS} {
    font-size: 1.6rem;
  }
`;

export default H1;
