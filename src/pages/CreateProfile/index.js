import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../state/profile/profileActions";
import { useNavigate } from "react-router-dom";

//Styling Components
import { Container, Row, CenterDiv } from "../../components/Div";
import H1 from "../../components/H1";
import Form from "../../components/FormItems/Form";
import FormGroup from "../../components/FormItems/FormGroup";
import Input from "../../components/FormItems/Input";
import Error from "../../components/FormItems/Error";
import { Button } from "../../components/Button";
import P from "../../components/P";

const index = ({ createProfile }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    teamname: "",
    isError: false,
  });

  const { teamname, isError } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    let check = false;
    if (teamname.length < 3 || teamname.length > 30) {
      check = true;
    } else {
    }
    setFormData({
      ...formData,
      isError: check,
    });
    if (!check) {
      await createProfile(formData);
      navigate("/dashboard");
    }
  };

  return (
    <Container>
      <Row>
        <CenterDiv>
          <H1 size={"L"}>Create your profile</H1>
          <Form align="center">
            <FormGroup>
              <Input
                type="text"
                placeholder="Please choose a team name"
                name="teamname"
                value={teamname}
                onChange={(e) => onChange(e)}
                minLength="3"
                autoComplete="off"
                noValidate
                error={isError}
              />
              <Error error={isError}>
                *Team name must be at least 4 and 30 characters
              </Error>
              <P size="S">This can be edited later.</P>
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
          </Form>
        </CenterDiv>
      </Row>
    </Container>
  );
};

index.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(index);