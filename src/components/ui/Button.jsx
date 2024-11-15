import PropTypes from "prop-types";

const Button = ({
  type = "button",
  variant = "primary",
  children,
  className = "",
  href,
  onClick,
  ...rest
}) => {
  const variantClasses = {
    primary:
      "flex gap-2 bg-green-600 text-green-950 hover:bg-green-900 hover:text-green-100",
    secondary:
      "flex gap-2 border-2 border-solid border-green-950 text-green-950 hover:bg-green-950 hover:text-green-100",
  };
  // Shared classes
  const classes = `rounded-full px-5 py-2 font-semibold transition duration-300 ease-in-out ${
    variantClasses[variant]
  } ${className}`;
  // Determine the component type
  const Component = href ? "a" : "button";

  // Common props
  const componentProps = {
    className: classes,
    ...rest,
  };

  if (href) {
    componentProps.href = href;
  } else {
    componentProps.type = type;
    componentProps.onClick = onClick;
  }

  return <Component {...componentProps}>{children}</Component>;
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "inverted"]),
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
