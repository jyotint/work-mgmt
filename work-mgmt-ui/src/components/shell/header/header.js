import React, { Component } from "react";
import { NavLink } from "react-router-dom";

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
                <NavLink exact className="nav-item nav-link" to="/" activeClassName="active">
                  Home
                  {/* Home <span className="sr-only">(current)</span> */}
                </NavLink>
                <NavLink exact className="nav-item nav-link" to="/workitem" activeClassName="active">
                  Work Items
                </NavLink>
                <NavLink exact className="nav-item nav-link" to="/categories" activeClassName="active">
                  Categories
                </NavLink>
                <NavLink exact className="nav-item nav-link" to="/tags" activeClassName="active">
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

export default Header;
