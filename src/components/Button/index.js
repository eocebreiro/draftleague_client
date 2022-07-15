import React, { Children, Fragment } from "react";

import PropTypes from "prop-types";

import StyledLink from "./StyledLink";
import StyledButton from "./StyledButton";

function Button(props) {
  // Render an anchor tag (Link)
  let button = (
    <StyledLink
      to={props.link}
      onClick={props.onClick}
      color={props.color}
      width={props.width}
    >
      {Children.toArray(props.children)}
    </StyledLink>
  );

  // If the Button has a handleRoute prop, we want to render a button
  if (props.handleRoute) {
    button = (
      <StyledButton
        onClick={props.handleRoute}
        color={props.color}
        width={props.width}
        type={props.type}
      >
        {Children.toArray(props.children)}
      </StyledButton>
    );
  }

  return <Fragment>{button}</Fragment>;
}

Button.propTypes = {
  handleRoute: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
