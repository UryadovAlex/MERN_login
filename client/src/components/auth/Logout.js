import React from "react";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";

class Logout extends React.Component {
  static = {
    logout: PropTypes.func.isRequired,
  };
  render() {
    return (
      <>
        <NavLink onClick={this.props.logout} href="#">
          Logout
        </NavLink>
      </>
    );
  }
}

export default connect(null, { logout })(Logout);
