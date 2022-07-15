import React, { useState } from "react";
import { Link, Navagate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createLeague } from "../../state/profile/profileActions";

import Container from "../../components/Container";
import Row from "../../components/Row";
import DivContent from "../../components/DivContent";
import H1 from "../../components/H1";
import Form from "../../components/FormItems/Form";
import FormGroup from "../../components/FormItems/FormGroup";
import Input from "../../components/FormItems/Input";
import Error from "../../components/FormItems/Error";
import Button from "../../components/Button";
import P from "../../components/P";

const index = ({ createLeague }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    leaguename: "",
    numOfParticipants: "",
  });

  const { leaguename, numOfParticipants } = formData;

  const [errorData, setErrorData] = useState({
    checkLength: false,
    checkSelect: false,
  });

  const { checkLength, checkSelect } = errorData;

  let options = [];
  for (let i = 4; i <= 16; i++) {
    options.push(<option value={i}>{i}</option>);
  }
  const [dropdownItems, setDropDownItems] = useState(options);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let check = false;
    if (leaguename.length < 3 || leaguename.length > 30) {
      setErrorData({ ...errorData, checkLength: true });
      check = true;
    }
    if (numOfParticipants === "Number of participants") {
      setErrorData({ ...errorData, checkSelect: true });
      check = true;
    }
    if (!check) {
      createLeague(formData);
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
        <DivContent>
          <H1 size={"L"}>Create a League</H1>
          <Form margin="center">
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
              />
            </FormGroup>
            <FormGroup>
              <P>
                Number of participants{" "}
                {
                  <select onChange={(e) => onChange(e)} required>
                    {dropdownItems}
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
        </DivContent>
      </Row>
    </Container>
  );
};

index.propTypes = { createLeague: PropTypes.func.isRequired };

export default connect(null, { createLeague })(index);
