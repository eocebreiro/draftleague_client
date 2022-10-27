import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { joinLeague } from "../state/league/leagueActions";

// Styles
import { FormWrapper } from "../Styles";

const JoinLeague = ({ joinLeague }) => {
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
    <div className="row justify-content-center">
      <FormWrapper>
        <form>
          <input
            className={`form-control mb-3 ${""}`}
            type="text"
            placeholder="League Code"
            name="leagueId"
            value={leagueId}
            onChange={(e) => onChange(e)}
            minLength="3"
            maxLength="30"
            autoComplete="off"
            noValidate
          />
          <div className="d-flex justify-content-center">
            <button
              className=" btn btn-primary me-2"
              onClick={(e) => onSubmit(e)}
              type="submit"
            >
              Join
            </button>
            <button
              className=" btn btn-danger ms-2"
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

JoinLeague.propTypes = { joinLeague: PropTypes.func.isRequired };

export default connect(null, { joinLeague })(JoinLeague);
