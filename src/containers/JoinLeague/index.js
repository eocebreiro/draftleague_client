import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { joinLeague } from "../../state/profile/profileActions";

import Container from "../../components/Container";
import Row from "../../components/Row";
import DivContent from "../../components/DivContent";
import H1 from "../../components/H1";
import Form from "../../components/FormItems/Form";
import FormGroup from "../../components/FormItems/FormGroup";
import Input from "../../components/FormItems/Input";
import Error from "../../components/FormItems/Error";
import Button from "../../components/Button";

const index = ({ joinLeague }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    leagueId: "",
  });

  const { leagueId } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    joinLeague(formData);
    navigate("/dashboard");
  };

  const onCancel = async (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <Container>
      <Row>
        <DivContent>
          <H1 size={"L"}>Join a League</H1>
          <Form margin="center">
            <FormGroup>
              <Input
                type="text"
                placeholder="League code"
                name="leagueId"
                value={leagueId}
                onChange={(e) => onChange(e)}
                minLength="3"
                maxLength="30"
                autoComplete="off"
                noValidate
              />
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

index.propTypes = { joinLeague: PropTypes.func.isRequired };

export default connect(null, { joinLeague })(index);
