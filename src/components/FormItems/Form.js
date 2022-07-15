import styled from "styled-components";
import { handleMarginType } from "../utils/handleType";

const Form = styled.form`
  display: block;
  margin-top: 0em;
  padding: 0.5rem;
  margin: ${(props) => handleMarginType(props.margin)};
  margin-bottom: 1rem;
  max-width: 500px;
`;

export default Form;
