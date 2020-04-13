import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Constants from "../../../shared/constants";

class Header extends Component {
  componentName = "Header";

  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);

    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand h1" href="/">
              Work Management
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <NavLink exact className="nav-item nav-link" to={Constants.route.root} activeClassName="active">
                  Home
                  {/* Home <span className="sr-only">(current)</span> */}
                </NavLink>
                <NavLink exact className="nav-item nav-link" to={Constants.route.workItems} activeClassName="active">
                  Work Items
                </NavLink>
                <NavLink exact className="nav-item nav-link" to={Constants.route.categories} activeClassName="active">
                  Categories
                </NavLink>
                <NavLink exact className="nav-item nav-link" to={Constants.route.tags} activeClassName="active">
                  Tags
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
