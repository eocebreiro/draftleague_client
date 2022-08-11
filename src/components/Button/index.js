import React, { Children, Fragment } from "react";

import PropTypes from "prop-types";

import StyledLink from "./StyledLink";
import StyledButton from "./StyledButton";

export const Button = (props) => {
  // Render an anchor tag (Link)
  let button;
  let link = "";
  if (props.link) {
    link = props.link;
  }

  button = (
    <StyledLink
      to={link}
      onClick={props.onClick}
      color={props.color}
      width={props.width}
    >
      {Children.toArray(props.children)}
    </StyledLink>
  );

  // If the Button has a handleRoute prop, we want to render a button
  if (props.type === "button") {
    button = (
      <StyledButton
        onClick={props.onClick}
        color={props.color}
        width={props.width}
        disabled={props.disabled}
      >
        {Children.toArray(props.children)}
      </StyledButton>
    );
  }

  return <Fragment>{button}</Fragment>;
};

Button.propTypes = {
  handleRoute: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};
