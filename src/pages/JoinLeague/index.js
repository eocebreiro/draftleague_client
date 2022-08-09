import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { joinLeague } from "../../state/league/leagueActions";

//Styling Components
import { Container, Row, CenterDiv } from "../../components/Div";
import H1 from "../../components/H1";
import Form from "../../components/FormItems/Form";
import FormGroup from "../../components/FormItems/FormGroup";
import Input from "../../components/FormItems/Input";
import { Button } from "../../components/Button";

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

    await joinLeague(formData);
    navigate("/dashboard");
  };

  const onCancel = async (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <Container>
      <Row>
        <CenterDiv>
          <H1 size={"L"}>Join a League</H1>
          <Form align="center">
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
        </CenterDiv>
      </Row>
    </Container>
  );
};

index.propTypes = { joinLeague: PropTypes.func.isRequired };

export default connect(null, { joinLeague })(index);
