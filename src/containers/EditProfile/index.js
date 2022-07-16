import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  createProfile,
  getCurrentProfile,
} from "../../state/profile/profileActions";

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

const index = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState({
    teamname: "",
    isError: false,
  });

  const { teamname, isError } = formData;

  let navigate = useNavigate();

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      teamname: loading || !profile.teamname ? "" : profile.teamname,
    });
  }, []);

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
      createProfile(formData);
      navigate("/dashboard");
    }
  };

  const onCancel = async (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  // Redirect if no profile is created
  if (!profile) {
    return <Navigate to="/create-profile" />;
  }

  return (
    <Container>
      <Row>
        <DivContent>
          <H1 size={"L"}>Edit your profile</H1>
          <Form margin="center">
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

            <Button
              link="/dashboard"
              onClick={(e) => onCancel(e)}
              color="danger"
              type="button"
              value="delete"
            >
              Cancel
            </Button>
          </Form>
        </DivContent>
      </Row>
    </Container>
  );
};

index.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ profile: state.profile });

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  index
);
