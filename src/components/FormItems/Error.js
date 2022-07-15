import styled from "styled-components";

const Error = styled.p`
  display: ${(props) => (props.error ? "block" : "none")};
  padding: 0;
  background: none;
  text-align: left;
  color: #dc3545;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export default Error;
