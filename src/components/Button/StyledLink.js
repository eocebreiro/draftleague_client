import styled from "styled-components";
import { Link } from "react-router-dom";

import { buttonStyles } from "./buttonStyles";

const StyledLink = styled(Link)`
  ${buttonStyles};
`;

export default StyledLink;
