import styled from "styled-components";
import showcase from "../../img/showcase.jpg";

export const Table = styled.div`
  margin: auto;
  width: 100%;
  border: 1px solid black;
`;

export const TableRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  padding-bottom: 10px;
  padding-top: 10px;
`;

export const TableCol = styled.div`
  margin: auto;
`;

export const TableItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-right: 5px;
  padding-left: 5px;
  flex-grow: 1;
  width: ${(props) => props.width};
`;

export const TableHeader = styled(TableItem)`
  color: white;
  font-weight: 700;
`;

export const TableRowHeader = styled(TableRow)`
  background: black;
`;
