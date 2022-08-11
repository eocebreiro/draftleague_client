import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createLeague } from "../../state/league/leagueActions";

//Styling Components
import Spinner from "../../components/Spinner";
import { Container, Row, CenterDiv } from "../../components/Div";
import H1 from "../../components/H1";
import Form from "../../components/FormItems/Form";
import FormGroup from "../../components/FormItems/FormGroup";
import Input from "../../components/FormItems/Input";
import Error from "../../components/FormItems/Error";
import { Button } from "../../components/Button";
import P from "../../components/P";

const index = ({ createLeague }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    leaguename: "",
    numOfParticipants: "8",
    numOfPlayers: "11",
  });

  const { leaguename, numOfParticipants, numOfPlayers } = formData;

  const [errorData, setErrorData] = useState({
    checkLength: false,
    checkSelect: false,
  });

  const { checkLength } = errorData;

  let partOptions = [];
  for (let i = 8; i <= 20; i++) {
    if (i % 2 == 0) {
      partOptions.push(<option key={i}>{i}</option>);
    }
  }

  let playerOptions = [];
  for (let i = 11; i <= 20; i++) {
    playerOptions.push(<option key={i}>{i}</option>);
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let check = false;
    if (leaguename.length < 4 || leaguename.length > 30) {
      setErrorData({ ...errorData, checkLength: true });
      check = true;
    }
    if (!check) {
      await createLeague(formData);
      navigate("/dashboard");
    }
  };

  const onCancel = async (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <Container>
      <Row>
        <CenterDiv>
          <H1 size={"L"}>Create a League</H1>
          <Form align="center">
            <FormGroup>
              <Input
                type="text"
                placeholder="League name"
                name="leaguename"
                value={leaguename}
                onChange={(e) => onChange(e)}
                minLength="3"
                maxLength="30"
                autoComplete="off"
                noValidate
                error={checkLength}
              />
              <Error error={checkLength}>
                *League name must be at least 4 and 30 characters
              </Error>
            </FormGroup>
            <FormGroup>
              <P size="lead">
                Number of participants
                {
                  <select
                    name="numOfParticipants"
                    value={numOfParticipants}
                    onChange={(e) => onChange(e)}
                    required
                    style={{ width: "50px", fontSize: "18px", margin: "10px" }}
                  >
                    {partOptions}
                  </select>
                }
              </P>
            </FormGroup>
            <FormGroup>
              <P size="lead">
                Number of players per team
                {
                  <select
                    name="numOfPlayers"
                    value={numOfPlayers}
                    onChange={(e) => onChange(e)}
                    required
                    style={{ width: "50px", fontSize: "18px", margin: "10px" }}
                  >
                    {playerOptions}
                  </select>
                }
              </P>
            </FormGroup>
            <Input
              type="submit"
              display="none"
              onClick={(e) => onSubmit(e)}
            ></Input>
            <Button
              onClick={(e) => onSubmit(e)}
              link="/dashboard"
              color="primary"
              type="button"
            >
              Submit
            </Button>
            <Button
              link="/dashboard"
              color="danger"
              type="button"
              value="delete"
              onClick={(e) => onCancel(e)}
            >
              Cancel
            </Button>
          </Form>
        </CenterDiv>
      </Row>
    </Container>
  );
};

index.propTypes = { createLeague: PropTypes.func.isRequired };

export default connect(null, { createLeague })(index);
