import styled from "styled-components";
import { handleAlignmentType } from "../utils/handleType";

const Form = styled.form`
  display: block;
  margin-top: 0em;
  padding: 0.5rem;
  margin: ${(props) => handleAlignmentType(props.align)};
  margin-bottom: 1rem;
  max-width: 500px;
`;

export default Form;
