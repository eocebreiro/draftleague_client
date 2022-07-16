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
import { register } from "../../state/auth/authActions";
import PropTypes from "prop-types";

const index = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    isNameMissing: false,
    isPassword2Missing: false,
    isErrLength: false,
    isErrMatch: false,
    isErrEmail: false,
  });

  const {
    name,
    email,
    password,
    password2,
    isNameMissing,
    isPassword2Missing,
    isErrLength,
    isErrMatch,
    isErrEmail,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault(e);
    let testLength,
      testMatch,
      testEmail,
      testName,
      testPassword2,
      isError = false;
    if (name.length < 4 || name.length > 30) {
      testName = true;
      isError = true;
    }
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      testEmail = true;
      isError = true;
    }
    if (password !== password2) {
      testMatch = true;
      isError = true;
    }
    if (password.length < 6 || password.length > 30) {
      testLength = true;
      isError = true;
    }
    if (password2 === "") {
      testPassword2 = true;
      isError = true;
    }
    if (!isError) {
      register({ name, email, password });
    }
    setFormData({
      ...formData,
      isNameMissing: testName,
      isErrEmail: testEmail,
      isErrLength: testLength,
      isErrMatch: testMatch,
      isPassword2Missing: testPassword2,
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
              <H1 size="L">Sign Up</H1>
              <P size="lead">
                <FontAwesomeIcon icon={faUser} /> Create Your Account
              </P>
              <Form margin="center">
                <FormGroup>
                  <Input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => onChange(e)}
                    required
                    autoComplete="on"
                    noValidate
                    error={isNameMissing}
                  />
                  <Error error={isNameMissing}>
                    *Name must be at least 4 and 30 characters
                  </Error>
                </FormGroup>
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
                    error={isErrEmail}
                  />
                  <Error error={isErrEmail}>*Email is invalid</Error>
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    minLength="6"
                    autoComplete="new-password"
                    noValidate
                    error={isErrLength}
                  />
                  <Error error={isErrLength}>
                    *Password must be at least 6 and 30 characters
                  </Error>
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={(e) => onChange(e)}
                    minLength="6"
                    autoComplete="new-password"
                    noValidate
                    error={isErrMatch || isPassword2Missing}
                  />
                  <Error error={isErrMatch}>*Password must match</Error>
                  <Error error={isPassword2Missing}>
                    *Confirm password field is required
                  </Error>
                </FormGroup>
                <Input
                  type="submit"
                  display="none"
                  onClick={(e) => onSubmit(e)}
                ></Input>
                <Button
                  onClick={(e) => onSubmit(e)}
                  type="input"
                  link="/register"
                  color="primary"
                  width="100%"
                >
                  Submit
                </Button>
              </Form>
              <p>
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </DivContent>
          </Row>
        </Container>
      </DarkOverlay>
    </LandingImg>
  );
};

index.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(index);
