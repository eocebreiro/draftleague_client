import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { createLeague } from "../state/league/leagueActions";

// Styles
import { FormWrapper } from "../Styles";

const CreateLeague = ({ createLeague }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    leaguename: "",
    leaguenameFeedback: "",
    numOfParticipants: "8",
    numOfPlayers: "11",
  });

  const {
    leaguename,
    leaguenameFeedback,
    numOfParticipants,
    numOfPlayers,
  } = formData;

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
    let leaguenameFeedback = "";
    let check = false;
    if (leaguename.length < 4 || leaguename.length > 30) {
      setFormData({ ...formData, leaguenameFeedback: "is-invalid" });
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
    <div className="row justify-content-center">
      <FormWrapper>
        <form>
          <input
            className={`form-control mb-3 ${leaguenameFeedback}`}
            type="text"
            placeholder="League Name"
            name="leaguename"
            value={leaguename}
            onChange={(e) => onChange(e)}
            minLength="3"
            maxLength="30"
            autoComplete="off"
            noValidate
          />
          <div className="invalid-feedback">
            *League name must be at least 4 and 30 characters
          </div>
          <p className="lead">
            Number of participants:
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
          </p>
          <p className="lead">
            Number of players per team:
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
          </p>
          <div className="d-flex justify-content-center">
            <button
              className=" btn btn-primary me-2"
              onClick={(e) => onSubmit(e)}
              type="submit"
            >
              Create
            </button>
            <button
              className="btn btn-danger ms-2"
              onClick={(e) => onCancel(e)}
            >
              Cancel
            </button>
          </div>
        </form>
      </FormWrapper>
    </div>
  );
};

CreateLeague.propTypes = { createLeague: PropTypes.func.isRequired };

export default connect(null, { createLeague })(CreateLeague);
