import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";

import Container from "../../components/Container";
import FormGroup from "../../components/FormItems/FormGroup";
import Form from "../../components/FormItems/Form";
import Input from "../../components/FormItems/Input";
import Error from "../../components/FormItems/Error";
import H1 from "../../components/H1";
import P from "../../components/P";
import Button from "../../components/Button";
import DivContent from "../../components/DivContent";
import Row from "../../components/Row";
import LandingImg from "../../components/LandingImg";
import DarkOverlay from "../../components/DarkOverlay";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../state/auth/authActions";

const index = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isEmailMissing: false,
    isPasswordMissing: false,
  });

  const { email, password, isEmailMissing, isPasswordMissing } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    let testEmail,
      testPassword,
      isError = false;
    if (email === "") {
      testEmail = true;
      isError = true;
    }
    if (password === "") {
      testPassword = true;
      isError = true;
    }
    if (!isError) {
      login({ email, password });
    }
    setFormData({
      ...formData,
      isEmailMissing: testEmail,
      isPasswordMissing: testPassword,
    });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <LandingImg>
      <DarkOverlay>
        <Container>
          <Row>
            <DivContent>
              <H1 size="L">Sign In</H1>
              <P size="lead">
                <FontAwesomeIcon icon={faUser} /> Sign into Your Account
              </P>
              <Form margin="center">
                <FormGroup>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
                    autoComplete="on"
                    noValidate
                    error={isEmailMissing}
                  />
                  <Error error={isEmailMissing}>*Email field is required</Error>
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    minLength="6"
                    autoComplete="current-password"
                    noValidate
                    error={isPasswordMissing}
                  />
                  <Error error={isPasswordMissing}>
                    *Password field is required
                  </Error>
                </FormGroup>
                <Input
                  type="submit"
                  display="none"
                  onClick={(e) => onSubmit(e)}
                ></Input>
                <Button
                  onClick={(e) => onSubmit(e)}
                  link="/login"
                  color="primary"
                  width="100%"
                  type="button"
                >
                  Submit
                </Button>
              </Form>
              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </DivContent>
          </Row>
        </Container>
      </DarkOverlay>
    </LandingImg>
  );
};

index.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(index);
